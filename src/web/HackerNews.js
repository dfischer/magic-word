import * as pup from "puppeteer";

export default {
  async frontPage() {
    const browser = await pup.launch();
    const page = await browser.newPage();
    await page.goto("https://news.ycombinator.com");
    let links = await page.evaluate(() => {
      return Array
        .from(document.querySelectorAll(".storylink"))
        .map(x => x.href);
    });
    await browser.close();
    return links;
  }
};
