/* Разработать тест со следующими шагами:
  - открыть https://the-internet.herokuapp.com/
  - перейти на страницу Dynamic Controls
  - Дождаться появления кнопки Remove
  - Завалидировать текста в заголовке страницы
  - Чекнуть чекбокс
  - Кликнуть по кнопке Remove
  - Дождаться исчезновения чекбокса
  - Проверить наличие кнопки Add
  - Завалидировать текст It's gone!
  - Кликнуть на кнопку Add
  - Дождаться появления чекбокса
  - Завалидировать текст It's back! */

import { expect, test } from "@playwright/test";
// import type { Page } from "@playwright/test";

test.describe("[Heroku App] [Dynamic_Controls]", () => {
  test("HomeWork_1", async ({ page }) => {
    const baseUrl = "https://the-internet.herokuapp.com/";
    const linkDinamicControls = page.getByRole("link", { name: "Dynamic Controls" });
    const removeButton = page.getByRole("button", { name: "Remove" });
    const title = page.getByRole("heading", { level: 4, name: "Dynamic Controls" });
    const checkbox = page.locator('//input[@type="checkbox"]');
    const buttonAdd = page.getByRole("button", { name: "Add" });
    const textMessage = page.locator('//p[@id="message"]');

    await page.goto(baseUrl);
    await linkDinamicControls.click();
    await expect(removeButton).toBeVisible({ timeout: 20000 });
    await expect(title).toHaveText("Dynamic Controls");
    await checkbox.check();
    await removeButton.click();
    await expect(checkbox).toBeHidden({ timeout: 20000 });
    await expect(buttonAdd).toBeVisible();
    await expect(textMessage).toHaveText("It's gone!");
    await buttonAdd.click();
    await expect(checkbox).toBeVisible({ timeout: 20000 });
    await expect(textMessage).toHaveText("It's back!");
  });
});

//   import test from "playwright/test";

// test.describe("[https://the-internet.herokuapp.com] [Dynamic Controls]", () => {
//   test("Dynamic controls page validation", async ({ page }) => {
//     const url = "https://the-internet.herokuapp.com/";
//     const dynamicControlsLink = page.locator("//a[@href='/dynamic_controls']");
//     const removeButton = page.locator("#checkbox-example > button");

//     await page.goto(url);
//     await dynamicControlsLink.click();
//     await removeButton.waitFor({ state: "visible" });
//   });
// });
