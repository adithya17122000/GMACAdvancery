import { expect } from '@playwright/test';
import { elementFactoryUtils } from "../utils/uiElementFactoryModule";
import testData from "../resource/testData/testData"
import socialLogin from '../elementFactory/socialLogin';
import { getVerificationCode } from '../utils/mailosour';
import { beforeEach } from 'node:test';
import homePage from '../elementFactory/homePage';
const LandingPage = elementFactoryUtils.landingPage;
const LoginPage = elementFactoryUtils.loginPage;
const HomePage = elementFactoryUtils.homePage;
const CreateAccountPage = elementFactoryUtils.createAccountPage;
const ForgotPassword = elementFactoryUtils.forgotPassword
const resource: string = "/";





const gmacApps = {

  async validateTheLoadingofLandingPage({ page, baseURL }) {
    const url = baseURL + resource;
    await page.goto(url);
    await expect(page.locator(LandingPage.industryHeading)).toBeVisible();
    await page.waitForSelector("//span[normalize-space()='Cookie Consent']");
    await page.locator("//button[2]").click();
  },

  async createAccountWithEmail({ page, user }) {
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    await page.setViewportSize({ width: viewportWidth, height: 5000 });
    await page.locator(LandingPage.createAccount).click();
    await page.setViewportSize({ width: 1280, height: 720 });
    await expect(page.locator(CreateAccountPage.signUpWithEmail)).toBeVisible();
    await page.locator(CreateAccountPage.signUpWithEmail).click();
    await expect(page.locator(CreateAccountPage.signUpWithEmailHeading)).toBeVisible();
    await page.locator(CreateAccountPage.email).fill(user.email);
    await page.locator(CreateAccountPage.newpassword).fill(user.localPassword);
    await page.locator(CreateAccountPage.reenterPassword).fill(user.localPassword);
    await page.locator(CreateAccountPage.firstName).fill(user.firstName);
    await page.locator(CreateAccountPage.lastName).fill(user.lastName);
    await page.locator(CreateAccountPage.create).click();
    await expect(page.locator(HomePage.heading)).toBeVisible();
  },

  async userAlreadyexists({ page }) {
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    await page.setViewportSize({ width: viewportWidth, height: 5000 });
    await page.locator(LandingPage.createAccount).click();
    await page.setViewportSize({ width: 1280, height: 720 });
    await expect(page.locator(CreateAccountPage.signUpWithEmail)).toBeVisible();
    await page.locator(CreateAccountPage.signUpWithEmail).click();
    await expect(page.locator(CreateAccountPage.signUpWithEmailHeading)).toBeVisible();
    await page.locator(CreateAccountPage.email).fill(testData.createAccount.email);
    await page.locator(CreateAccountPage.newpassword).fill(testData.createAccount.emailPassword);
    await page.locator(CreateAccountPage.reenterPassword).fill(testData.createAccount.emailPassword);
    await page.locator(CreateAccountPage.firstName).fill(testData.createAccount.firstName);
    await page.locator(CreateAccountPage.lastName).fill(testData.createAccount.lastName);
    await page.locator(CreateAccountPage.create).click();
    await page.waitForSelector("#claimVerificationServerError");
    await expect(page.locator("#claimVerificationServerError")).toBeVisible();

  },

  async createAccountWithGoogle({ page }) {
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    await page.setViewportSize({ width: viewportWidth, height: 5000 });
    await page.locator(LandingPage.createAccount).click();
    await page.setViewportSize({ width: 1280, height: 720 });
    // await page.waitForSelector(LandingPage.createAdvanceryAccount);
    // await expect(page.locator(LandingPage.createAdvanceryAccount)).toBeVisible();
    await expect(page.locator(CreateAccountPage.signUpWithEmail)).toBeVisible();
    await expect(page.locator(CreateAccountPage.signUpWithGoogle)).toBeVisible();
    await page.locator(CreateAccountPage.signUpWithGoogle).click();
    await page.locator(CreateAccountPage.googleemail).fill("advancerytest@gmail.com");
    await page.locator(CreateAccountPage.next).click();
    await page.locator(CreateAccountPage.googlepassword).fill("test@advancery2");
    await page.locator(CreateAccountPage.next).click();
    // await page.locator(CreateAccountPage.continue).click();
    await page.waitForSelector(CreateAccountPage.heading);
    await expect(page.locator(CreateAccountPage.heading)).toBeVisible();
    // await page.locator(CreateAccountPage.firstName).fill("Adv");
    // await page.locator(CreateAccountPage.lastName).fill("Test");
    // Clear and fill the first name field
    await page.locator(CreateAccountPage.firstName).click();
    await page.locator(CreateAccountPage.firstName).press('Control+A');
    await page.locator(CreateAccountPage.firstName).press('Backspace');
    await page.locator(CreateAccountPage.firstName).fill("Adv");
    await page.locator(CreateAccountPage.lastName).click();
    await page.locator(CreateAccountPage.lastName).press('Control+A');
    await page.locator(CreateAccountPage.lastName).press('Backspace');
    await page.locator(CreateAccountPage.lastName).fill("Test");
    await page.locator(CreateAccountPage.SubscribedToNewsletter).check();
    await page.locator(CreateAccountPage.lastpagecontinue).click();
  },

  async emailLogin({ page }) {
    await page.locator(LandingPage.login).click();
    await expect(page.locator(LoginPage.loginHeading)).toBeVisible();
    await expect(page.locator(LoginPage.localIntro)).toBeVisible();
    await expect(page.locator(LoginPage.emailLabel)).toBeVisible();
    await expect(page.locator(LoginPage.email)).toBeVisible();
    await expect(page.locator(LoginPage.forgetPassword)).toBeVisible();
    await expect(page.locator(LoginPage.passwordLabel)).toBeVisible();
    await expect(page.locator(LoginPage.password)).toBeVisible();
    await expect(page.locator(LoginPage.signIn)).toBeVisible();
    await expect(page.locator(LoginPage.socilIntro)).toBeVisible();
    await expect(page.locator(LoginPage.googleLogin)).toBeVisible();
    await page.locator(LoginPage.email).fill(testData.createAccount.email);
    await page.locator(LoginPage.password).fill(testData.createAccount.emailPassword);
    await page.locator(LoginPage.signIn).click();
    await expect(page.locator(HomePage.navbar)).toBeVisible();
    await expect(page.locator(HomePage.heading)).toBeVisible();
  },

  async logout({ page }) {
    // await page.getByLabel('Open Menu').click();
    // await page.locator("div[role='presentation']").click();
    // await page.locator("a[href$='/internal-api/auth/logout']").click();
    await page.getByLabel('Open Menu').click();
    await page.getByRole('link', { name: 'Logout' }).click();
    await expect(page.locator(LandingPage.createAccount)).toBeVisible();
    await expect(page.locator(LandingPage.login)).toBeVisible();
  },

  async inValideLoginCredentials({ page, baseURL }) {
    const scenarios = [
      {
        email: "testadvancery@gmail.com",
        password: "wrongpassword",
        expectedMessage: "Your password is incorrect",
      },
      {
        email: "testadvancery@gmail.com",
        password: "true",
        expectedMessage: "Your password is incorrect",
      },
      {
        email: "testadvancery@gmail.com",
        password: "   ",
        expectedMessage: "Invalid username or password.",
      },
      {
        email: "unregistered@example.com",
        password: "password123",
        expectedMessage: "We can't seem to find your account",
      },
    ];

    const url = baseURL + resource;
    await page.goto(url);
    await page.locator(LandingPage.login).click();
    for (const scenario of scenarios) {
      //   console.log(`Testing with email: ${scenario.email}, password: "${scenario.password}"`);
      await page.locator(LoginPage.email).fill(scenario.email);
      await page.locator(LoginPage.password).fill(scenario.password);
      await page.locator(LoginPage.signIn).click();
      await expect(page.locator("div[class='error pageLevel'] p")).toBeVisible();

    }
  },

  async socialLoginUserNotFound({ page }) {
    await page.locator(LandingPage.login).click();
    await page.locator(LoginPage.googleLogin).click();
    await page.locator(socialLogin.emial).fill(testData.createAccount.email);
    // await page.locator(socialLogin.next).click();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.locator(socialLogin.password).fill(testData.createAccount.googlePassword);
    await page.locator(socialLogin.next).click();
    await page.waitForSelector(socialLogin.userNotFound);
    await expect(page.locator(socialLogin.userNotFound)).toBeVisible();
    await expect(page.locator(socialLogin.message)).toBeVisible();
    await expect(page.locator(socialLogin.joinBeta)).toBeVisible();
    await expect(page.locator(socialLogin.loginNow)).toBeVisible();
    await expect(page.locator(socialLogin.alreadyHaveaccount)).toBeVisible();


  },

  async forgotPasswordInitiate({ page }) {
    // Navigate to Forgot Password page
    await page.locator(LandingPage.login).click();
    await page.locator(ForgotPassword.forgotyourpassword).click();
    // Verify UI elements
    await expect(page.locator(ForgotPassword.heading)).toBeVisible();
    await expect(page.locator(ForgotPassword.intro)).toBeVisible();
    await expect(page.locator(ForgotPassword.emaillabel)).toBeVisible();
    await expect(page.locator(ForgotPassword.emial)).toBeVisible();
    await expect(page.locator(ForgotPassword.emailwhatisthis)).toBeVisible();
    await expect(page.locator(ForgotPassword.verificationcode)).toBeVisible();
    await expect(page.locator(ForgotPassword.codewhatisthis)).toBeVisible();
    await expect(page.locator(ForgotPassword.continue)).toBeDisabled();
    await expect(page.locator(ForgotPassword.cancel)).toBeVisible();
    // Fill in email and click to request verification code
    await page.locator(ForgotPassword.emial).fill(testData.createAccount.email);
    await page.locator(ForgotPassword.verificationcode).click();
    await getVerificationCode(testData.createAccount.email);
    // console.log("Verification code requested. Proceed to retrieve the code.");
  }


}



export default { gmacApps }

function waitForlocator(page: any, logout: string) {
  throw new Error('Function not implemented.');
}
