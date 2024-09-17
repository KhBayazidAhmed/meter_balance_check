"use server";
import { revalidatePath } from "next/cache";
import puppeteer from "puppeteer";

export async function checkBalance() {
  try {
    let meterIds = [
      { meterId: "661120153801", name: "1 - East" },
      { meterId: "661120153802", name: "1 - West" },
      { meterId: "661120153803", name: "3 - East" },
      { meterId: "661120153804", name: "4 - East" },
      { meterId: "661120153805", name: "5 - West" },
      { meterId: "661120153806", name: "6 - West" },
      { meterId: "661120153807", name: "7 - West" },
      { meterId: "661120153808", name: "1 - East" },
    ];

    console.log("checkBalance running start");
    const browser = await puppeteer.launch();

    // Create a page
    const page = await browser.newPage();
    // Go to your site
    await page.goto("https://prepaid.desco.org.bd/customer/#/customer-login");

    // Type in the Account/Meter No
    await page.type(
      'input[placeholder="Account/Meter No"]',
      meterIds[0].meterId
    );
    await page.waitForNetworkIdle();
    // Click the login button
    await page.click('button[class="btn px-4 btn-primary"]');
    await page.waitForNetworkIdle();
    let allMeterData = [];
    function getMeterName(id) {
      let name = meterIds.find((meter) => meter.meterId === id).name;
      return name;
    }
    // Extract data within the page context
    async function extractMeterData(id) {
      await page.waitForNetworkIdle();
      const jsonData = await page.evaluate(() => {
        // Extract additional info: last recharge and recharge time
        let additionalInfo = document.evaluate(
          "/html/body/div[2]/div[2]/div/main/div/div/div[5]/div/div[1]/div/footer/p",
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        ).singleNodeValue;
        let lastRecharge = additionalInfo.querySelector("span").innerText;
        let rechargeTime = additionalInfo.querySelectorAll("span")[1].innerText;
        // Extract remaining balance and reading time
        let remainingInfo = document.evaluate(
          "/html/body/div[2]/div[2]/div/main/div/div/div[5]/div/div[2]",
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        ).singleNodeValue;
        let remainingBalance = remainingInfo.querySelector("span").innerText;
        let readingTime = remainingInfo.querySelectorAll("span")[1].innerText;
        let meterDetails = document.evaluate(
          "/html/body/div[2]/div[2]/div/main/div/div/div[6]/div[2]",
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        ).singleNodeValue;
        let details = {};
        meterDetails.querySelectorAll("dl.row dt").forEach((dt, index) => {
          let key = dt.innerText
            .trim()
            .replace(":", "")
            .replace(/\s+/g, "_")
            .toLowerCase();
          let value = meterDetails
            .querySelectorAll("dl.row dd")
            [index].innerText.trim();
          details[key] = value;
        });
        return {
          lastRecharge,
          rechargeTime,
          remainingBalance,
          readingTime,
          details,
        };
      });

      allMeterData.push({
        name: getMeterName(id),
        meterId: id,
        ...jsonData,
      });
    }
    for (let meterId of meterIds) {
      meterId = meterId.meterId;
      console.log(meterId);
      await page.type('input[placeholder="Account/Meter No"]', meterId);
      await page.waitForNetworkIdle();
      const element = await page.waitForSelector(
        "::-p-xpath(/html/body/div[2]/div[2]/div/main/div/div/div[2]/div/div/div/div/div/div/button)"
      );
      element.click();
      await page.waitForNetworkIdle();
      await extractMeterData(meterId);
    }
    await browser.close();
    console.log("checkBalance running end");
    return allMeterData;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function revalidate() {
  console.log("revalidate running");
  revalidatePath("/");
  return {
    success: true,
  };
}
