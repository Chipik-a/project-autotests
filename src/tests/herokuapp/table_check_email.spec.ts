/* Создать функцию getTableRow(page, email), которая возвращает строку в таблице по емейлу.
Например getTableRow(page, 'jsmith@gmail.com') => { "Last Name": "Smith", "First Name": "John", Email: "jsmith@gmail.com", Due: "$50.00", "Web Site": "http://www.jsmith.com" }

Создайте тест, проверяющий данную функцию, используя все емейлы из таблицы Example 2

Сайт: https://the-internet.herokuapp.com/tables */

import { expect, test, type Page } from "@playwright/test";

async function getTableRow(page: Page, email: string): Promise<Record<string, string>> {
  const table2 = page.locator("#table2");
  const headersLocators = await table2.locator("thead th").all();
  const headers = await Promise.all(headersLocators.map((el) => el.innerText()));
  const rowsLocators = await table2.locator("tbody tr").all();

  for (const row of rowsLocators) {
    const cellsLocators = row.locator("td");
    const cells = await cellsLocators.allInnerTexts();

    const rowData = headers.reduce<Record<string, string>>((res, header, i) => {
      if (header) res[header] = cells[i] ?? "";
      return res;
    }, {});

    if (rowData["Email"] === email) {
      return rowData;
    }
  }
  throw new Error(`Email "${email}" not found`);
}

test.describe("[Heroku App] Table_2", () => {
  const baseUrl = "https://the-internet.herokuapp.com/tables";

  test("Check all emails in table2", async ({ page }) => {
    await page.goto(baseUrl);

    const emailLocators = page.locator("#table2 tbody tr td:nth-child(3)");
    const emailCount = await emailLocators.count();

    for (let i = 0; i < emailCount; i++) {
      const email = await emailLocators.nth(i).innerText();
      console.log("Checking email:", email);
      const row = await getTableRow(page, email);

      expect(row["Email"]).toBe(email);
    }
  });
});
