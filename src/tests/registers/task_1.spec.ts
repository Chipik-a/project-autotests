import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";

enum MESSAGES {
  REGISTRATION_SUCCESS = "Successfully registered! Please, click Back to return on login page",
  REGISTRATION_ERROR = "Username is in use",
}

interface ICredentials {
  username: string;
  password: string;
}

const valCredentials: ICredentials = {
  username: "TestName",
  password: "TestPass1",
};

const baseUrl = "https://anatoly-karpovich.github.io/demo-login-form/";

test.describe("Register Smoke Suit", () => {
  async function register(page: Page) {
    const buttonRegisterLoginForm = page.locator('//input[@id="registerOnLogin"]');
    const usernameInput = page.locator('//input[@id="userNameOnRegister"]');
    const passwordInput = page.locator('//input[@id="passwordOnRegister"]');
    const buttonRegisterRegistrationForm = page.locator('//input[@id="register"]');

    await buttonRegisterLoginForm.click();
    await usernameInput.fill(valCredentials.username);
    await passwordInput.fill(valCredentials.password);
    await buttonRegisterRegistrationForm.click();
  }

  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
    await expect(page.locator("#loginForm")).toBeVisible();
  });

  test("Registration form opens successfully", async ({ page }) => {
    await expect(page.locator("#userName")).toBeVisible();
    await expect(page.locator("#password")).toBeVisible();
    await expect(page.locator("#submit")).toBeVisible();
    const buttonRegisterLoginForm = page.locator("#registerOnLogin");
    await expect(buttonRegisterLoginForm).toBeVisible();

    await buttonRegisterLoginForm.click();
    await expect(page.locator("#userNameOnRegister")).toBeVisible();
    await expect(page.locator("#passwordOnRegister")).toBeVisible();
    await expect(page.locator("#register")).toBeVisible();
    await expect(page.locator("#backOnRegister")).toBeVisible();
  });

  test("Register with valid data - smoke test", async ({ page }) => {
    const successMessage = page.locator('//h4[@id="errorMessageOnRegister"]');

    await register(page);
    await expect(successMessage).toHaveText(MESSAGES.REGISTRATION_SUCCESS);
  });

  test("User can go back to login page - smoke test", async ({ page }) => {
    const successMessage = page.locator('//h4[@id="errorMessageOnRegister"]');
    const buttonBackToLogin = page.locator('//input[@id="backOnRegister"]');
    const titleLoginForm = page.locator('//h2[@id="loginForm"]');

    await register(page);
    await expect(successMessage).toBeVisible();
    await buttonBackToLogin.click();
    await expect(titleLoginForm).toBeVisible();
    await expect(titleLoginForm).toHaveText("Login");
  });

  test("Login after register", async ({ page }) => {
    const usernameInput = page.locator('//input[@id="userName"]');
    const passwordInput = page.locator('//input[@id="password"]');
    const successMessage = page.locator('//h4[@id="errorMessageOnRegister"]');
    const buttonBackToLogin = page.locator('//input[@id="backOnRegister"]');
    const titleLoginForm = page.locator('//h2[@id="loginForm"]');
    const buttonSubmitLogin = page.locator('//input[@id="submit"]');
    const successMessageLogin = page.locator('//h4[@id="successMessage"]');

    await register(page);
    await expect(successMessage).toHaveText(MESSAGES.REGISTRATION_SUCCESS);
    await buttonBackToLogin.click();
    await expect(titleLoginForm).toBeVisible();
    await usernameInput.fill(valCredentials.username);
    await passwordInput.fill(valCredentials.password);
    await buttonSubmitLogin.click();

    await expect(successMessageLogin).toBeVisible();
    await expect(successMessageLogin).toHaveText("Hello, TestName!");
  });

  test("Cannot register with existing username", async ({ page }) => {
    const errorMessageOnRegister = page.locator('//h4[@id="errorMessageOnRegister"]');
    const successMessage = page.locator('//h4[@id="errorMessageOnRegister"]');
    const titleLoginForm = page.locator('//h2[@id="loginForm"]');
    const buttonBackToLogin = page.locator('//input[@id="backOnRegister"]');

    await register(page);
    await expect(successMessage).toHaveText(MESSAGES.REGISTRATION_SUCCESS);
    await buttonBackToLogin.click();
    await expect(titleLoginForm).toBeVisible();
    await register(page);
    await expect(errorMessageOnRegister).toHaveText(MESSAGES.REGISTRATION_ERROR);
  });
});
