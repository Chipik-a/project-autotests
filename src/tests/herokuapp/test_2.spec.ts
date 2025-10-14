/* Разработать тест со следующими шагами:
  - открыть https://anatoly-karpovich.github.io/demo-login-form/
  - Засунуть в localStorage браузера данные test@gmail.com / SecretPw123!@# для логина на сайт
  - Залогиниться с данными что вы вставили в localStorage
  - Завалидировать успешный логин

  Рекоммендации:
  - Для доступа к localStorage используйте https://playwright.dev/docs/evaluating */

import { expect, test, type Page } from "@playwright/test";

enum MESSAGES {
  REGISTRATION_SUCCESS = "Successfully registered! Please, click Back to return on login page",
  REGISTRATION_ERROR = "Username is in use",
}

interface ICredentials {
  email: string;
  name: string;
  password: string;
}

const data: ICredentials = {
  email: "test@gmail.com",
  name: "test@gmail.com",
  password: "SecretPw123!@#",
};

const baseUrl = "https://anatoly-karpovich.github.io/demo-login-form/";

async function register(page: Page, credentials: ICredentials) {
  await page.goto(baseUrl);
  await page.locator("#registerOnLogin").click();
  await page.locator("#userNameOnRegister").fill(credentials.email);
  await page.locator("#passwordOnRegister").fill(credentials.password);
  await page.locator("#register").click();
  await expect(page.locator("#errorMessageOnRegister")).toHaveText(MESSAGES.REGISTRATION_SUCCESS);
  await page.locator("#backOnRegister").click();
}

test.describe("[Demo Login Form] Login and LocalStore", () => {
  test("Register user", async ({ page }) => {
    await register(page, data);
  });

  test("Login using credentials in localStorage", async ({ page }) => {
    await page.goto(baseUrl);
    await page.evaluate((credentials: ICredentials) => {
      localStorage.setItem(credentials.name, JSON.stringify(credentials));
    }, data);

    await page.locator("#userName").fill(data.name);
    await page.locator("#password").fill(data.password);
    await page.locator("#submit").click();

    const successMessage = page.locator("#successMessage");
    await expect(successMessage).toBeVisible();
    await expect(successMessage).toHaveText(`Hello, ${data.name}!`);
  });
});
