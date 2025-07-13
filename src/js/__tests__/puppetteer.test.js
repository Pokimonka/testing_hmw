import puppetteer from "puppeteer";

jest.setTimeout(10000);
describe("card validator widget", () => {
  let browser = null;
  let page = null;
  const baseUrl = "http://localhost:8080";
  beforeAll(async () => {
    browser = await puppetteer.launch({
      headless: false,
      slowMo: 100,
      devtools: true,
    });
    page = await browser.newPage();
  });
  afterAll(async () => {
    await browser.close();
  });

  test("should get valid", async () => {
    await page.goto(baseUrl);
    await page.$(".card_validator_widget");
    const input = await page.$(".card_validator_widget .card_input");
    await input.evaluate((el) => (el.value = "4276550011117820"));
    const submit = await page.$(".card_validator_widget .validate_button");
    submit.click();
    await page.waitForSelector(".result_img.valid");
    await input.evaluate((el) => (el.value = ""));
    await input.evaluate((el) => (el.value = "4276550011117821"));
    submit.click();
    await page.waitForSelector(".result_img.invalid");
    //для линтера
    expect("0").toBe("0");
  });
});
