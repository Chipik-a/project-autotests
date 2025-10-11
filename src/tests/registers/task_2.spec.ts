/* Создайте ОДИН смоук тест со следующими шагами:

1. Переход на страницу https://anatoly-karpovich.github.io/demo-registration-form/
2. Заполните форму регистрации
3. Проверьте, что пользователь успешно зарегистрирован */

import { test, expect } from "@playwright/test";

type gender = "Male" | "Female";
enum HOBBIES {
  TRAVELLING = "Travelling",
  MOVIES = "Movies",
  SPORTS = "Sports",
  GAMING = "Gaming",
  DANCING = "Dancing",
}
enum SKILLS {
  JAVASCRIPT = "JavaScript",
  PYTHON = "Python",
  JAVA = "Java",
  CPP = "C++",
  RUBY = "Ruby",
}
enum COUNTRY {
  USA = "USA",
  CANADA = "Canada",
  UK = "UK",
}

enum MESSAGES {
  SUCCESSREG = "Registration Details",
}

interface IUserData {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phone: string;
  country: COUNTRY[];
  gender: gender;
  language: string;
  dayOfBirth: string;
  monthOfBirth: string;
  yearOfBirth: string;
  password: string;
  hobbies: HOBBIES[];
  skills: SKILLS[];
  //confirmPassword: string;
}

test.describe("Demo registration form", () => {
  const baseUrl = "https://anatoly-karpovich.github.io/demo-registration-form/";

  const userData: IUserData = {
    firstName: "John",
    lastName: "Doe",
    address: "123 Main St",
    email: "john.doe@example.com",
    phone: "358401234567",
    country: [COUNTRY.UK, COUNTRY.CANADA],
    gender: "Male",
    language: "English",
    skills: [SKILLS.JAVASCRIPT, SKILLS.PYTHON],
    dayOfBirth: "19",
    monthOfBirth: "June",
    yearOfBirth: "1990",
    password: "123456789qW",
    hobbies: [HOBBIES.GAMING, HOBBIES.MOVIES, HOBBIES.SPORTS, HOBBIES.TRAVELLING],
  };

  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
  });

  test("Full refistration form", async ({ page }) => {
    const inputFirstName = page.locator('//input[@id="firstName"]');
    const inputLastName = page.locator('//input[@id="lastName"]');
    const inputAddress = page.locator('//textarea[@id="address"]');
    const inputEmail = page.locator('//input[@id="email"]');
    const inputPhone = page.locator('//input[@id="phone"]');
    const selectCountry = page.locator('//select[@id="country"]');
    const genderType = page.locator(`//input[@name="gender" and @value='${userData.gender.toLowerCase()}']`);
    const inputLanguage = page.locator('//input[@id="language"]');
    const selectSkills = page.locator('//select[@id="skills"]');
    const selectYearOfBirth = page.locator('//select[@id="year"]');
    const selectMonthOfBirth = page.locator('//select[@id="month"]');
    const selectDayOfBirth = page.locator('//select[@id="day"]');
    const inputPassword = page.locator('//input[@id="password"]');
    const inputConfirmPassword = page.locator('//input[@id="password-confirm"]');
    const buttonSubmit = page.locator('//button[@type="submit"]');
    const titleRegistrationDetails = page.locator('//h2[@class="text-center"]');

    await inputFirstName.fill(userData.firstName);
    await inputLastName.fill(userData.lastName);
    await inputAddress.fill(userData.address);
    await inputEmail.fill(userData.email);
    await inputPhone.fill(userData.phone);
    await selectCountry.selectOption(userData.country[1]!.toString());
    await genderType.check();

    for (const hobby of userData.hobbies) {
      const hobbyCheckbox = page.locator(`//input[@type="checkbox" and @value="${hobby}"]`);
      await hobbyCheckbox.check();
    }

    await inputLanguage.fill(userData.language);

    for (const skill of userData.skills) {
      await selectSkills.selectOption(skill);
    }

    await selectYearOfBirth.selectOption(userData.yearOfBirth);
    await selectMonthOfBirth.selectOption(userData.monthOfBirth);
    await selectDayOfBirth.selectOption(userData.dayOfBirth);

    await inputPassword.fill(userData.password);
    await inputConfirmPassword.fill(userData.password);

    await buttonSubmit.click();
    await expect(titleRegistrationDetails).toBeVisible();
    await expect(titleRegistrationDetails).toHaveText(MESSAGES.SUCCESSREG);
  });
});
