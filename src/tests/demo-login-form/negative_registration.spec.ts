/* Создать тест сьют используя DDT подход с негативными тест-кейсами по регистрации на сайте
https://anatoly-karpovich.github.io/demo-login-form/

Требования:
Страница регистрации:
  Username: обязательное, от 3 до 40 символов включительно, запрещены префиксные/постфиксные пробелы, как и имя состоящее из одних пробелов
  Password: обязательное, от 8 до 20 символов включительно, необходима хотя бы одна буква в верхнем и нижнем регистрах, пароль из одних пробелов запрещен

Страница логина:
  Username: обязательное
  Password: обязательное */

import { test, expect } from "@playwright/test";
import userData from "../demo-login-form/userdata_negative.json" with { type: "json" };

test.describe("Registration - negative DDT", () => {
  const baseURL = "https://anatoly-karpovich.github.io/demo-login-form/";

  for (const data of userData) {
    test(data.title, async ({ page }) => {
      const buttonRegisterLogin = page.locator('.loginForm input[value="Register"]');
      const formRegister = page.locator(".registerForm");
      const titleOfRegisterForm = formRegister.locator("#registerForm");
      const inputUsername = formRegister.locator("#userNameOnRegister");
      const inputPassword = formRegister.locator("#passwordOnRegister");
      const buttonRegisterForm = page.locator('.registerForm input[value="Register"]');
      const messageNegative = page.locator("//h4[@id='errorMessageOnRegister']");

      await page.goto(baseURL);
      await expect(buttonRegisterLogin).toBeVisible();
      await buttonRegisterLogin.click();
      await expect(titleOfRegisterForm).toBeVisible();
      await inputUsername.fill(data.credentials.username);
      await inputPassword.fill(data.credentials.password);
      await buttonRegisterForm.click();
      await expect(messageNegative).toHaveText(data.expectedMessage);
    });
  }
});
