import { expect } from '@playwright/test';
import { elementFactoryUtils } from "../utils/uiElementFactoryModule";
import testData from "../resource/testData/testData"
import socialLogin from '../elementFactory/socialLogin';
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
  },

  async createAccountWithEmail({ page }) {
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    await page.setViewportSize({ width: viewportWidth, height: 5000 });
    await page.locator(LandingPage.createAccount).click();
    await page.setViewportSize({ width: 1280, height: 720 });
    // await page.waitForSelector(LandingPage.createAdvanceryAccount)
    // await expect(page.locator(LandingPage.createAdvanceryAccount)).toBeVisible();
    await expect(page.locator(CreateAccountPage.signUpWithEmail)).toBeVisible();
    await page.locator(CreateAccountPage.signUpWithEmail).click();
    await expect(page.locator(CreateAccountPage.signUpWithEmailHeading)).toBeVisible();
    await page.locator(CreateAccountPage.email).fill(testData.createAccount.email);
    await page.locator(CreateAccountPage.newpassword).fill(testData.createAccount.localPassword);
    await page.locator(CreateAccountPage.reenterPassword).fill(testData.createAccount.localPassword);
    await page.locator(CreateAccountPage.firstName).fill(testData.createAccount.firstName);
    await page.locator(CreateAccountPage.lastName).fill(testData.createAccount.lastName);
    await page.locator(CreateAccountPage.create).click();
    await expect(page.locator(HomePage.heading)).toBeVisible();
  },

  async userAlreadyexists({ page }) {
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    await page.setViewportSize({ width: viewportWidth, height: 5000 });
    await page.locator(LandingPage.createAccount).click();
    await page.setViewportSize({ width: 1280, height: 720 });
    // await page.waitForSelector(LandingPage.createAdvanceryAccount)
    // await expect(page.locator(LandingPage.createAdvanceryAccount)).toBeVisible();
    await expect(page.locator(CreateAccountPage.signUpWithEmail)).toBeVisible();
    await page.locator(CreateAccountPage.signUpWithEmail).click();
    await expect(page.locator(CreateAccountPage.signUpWithEmailHeading)).toBeVisible();
    await page.locator(CreateAccountPage.email).fill(testData.createAccount.email);
    await page.locator(CreateAccountPage.newpassword).fill(testData.createAccount.localPassword);
    await page.locator(CreateAccountPage.reenterPassword).fill(testData.createAccount.localPassword);
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
    await page.locator(LoginPage.password).fill(testData.createAccount.localPassword);
    await page.locator(LoginPage.signIn).click();
    await expect(page.locator(HomePage.navbar)).toBeVisible();
    await expect(page.locator(HomePage.heading)).toBeVisible();
    // await page.waitForTimeout(2000);
    // await page.getByLabel('Open Menu').click();
    // // await page.getByRole('button', { name: 'Logout' }).click();
    // // await page.locator(HomePage.logout).click();
  },

  async logout({ page }) {
    await page.getByLabel('Open Menu').click();
    await page.locator(HomePage.logout).click();
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

  // async forgotPassword({ page}) {
  //   await page.locator(LandingPage.login).click();
  //   await page.locator(ForgotPassword.forgotyourpassword).click();
  //   await expect(page.locator(ForgotPassword.heading)).toBeVisible();
  //   await expect(page.locator(ForgotPassword.intro)).toBeVisible();
  //   await expect(page.locator(ForgotPassword.emaillabel)).toBeVisible();
  //   await expect(page.locator(ForgotPassword.emial)).toBeVisible();
  //   await expect(page.locator(ForgotPassword.emailwhatisthis)).toBeVisible();
  //   await expect(page.locator(ForgotPassword.verificationcode)).toBeVisible();
  //   await expect(page.locator(ForgotPassword.codewhatisthis)).toBeVisible();
  //   await expect(page.locator(ForgotPassword.continue)).toBeDisabled();
  //   await expect(page.locator(ForgotPassword.cancel)).toBeVisible();
  //   await page.locator(ForgotPassword.emial).fill(testData.createAccount.email);
  //   await page.locator(ForgotPassword.verificationcode).click();
  //   await page.goto('https://accounts.google.com/v3/signin/identifier?ifkv=AeZLP9-lG3EDHIX_OaY7u_CWjvuSXP8RpK4lLQLnpOrYno1lGJqaVwKZiTiSlX0_karyq04ipPB6RA&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S-266825815%3A1733924399433620&ddm=1');
  //   await page.getByLabel('Email or phone').fill('testadvancery@gmail.com');
  //   await page.getByRole('button', { name: 'Next' }).click();
  //   // await page.getByLabel('Enter your password').press('CapsLock');
  //   await page.getByLabel('Enter your password').fill('Advancery');
  //   await page.getByRole('button', { name: 'Next' }).click();
  //   const page1Promise = page.waitForEvent('popup');
  //   await page.locator('iframe[name="app"]').contentFrame().getByLabel('Gmail, row 2 of 6 and column').click();
  //   const page1 = await page1Promise;
  //   await page1.goto('https://mail.google.com/mail/u/0/#inbox');
  //   await page1.getByRole('row', { name: 'Microsoft on behalf.'}).first().click();
  //   // await page1.getByText('Your code is: 566245', { exact: true }).click();
  //   const last =  await page1.locator('.adn').last().textContent();
  //   console.log(last);
  //   const code =  await page1.locator("div span[id$='m_5216351638695505633BodyPlaceholder_UserVerificationEmailBodySentence2']").textContent();
  //   console.log(code);
  //   // await expect(page.locator(ForgotPassword.codesentmessage)).toBeVisible();
  //   // await expect(page.locator(ForgotPassword.verifycodelabel)).toBeVisible();
  //   // await expect(page.locator(ForgotPassword.entercode)).toBeVisible();
  //   // await expect(page.locator(ForgotPassword.verifycodebutton)).toBeVisible();
  //   // await expect(page.locator(ForgotPassword.sendnewcodebutton)).toBeVisible();
  //   // await expect(page.locator(ForgotPassword.cancel)).toBeVisible();

  // },



// async forgotPasswordInitiate({ page }) {
//   // Navigate to Forgot Password page
//   await page.locator(LandingPage.login).click();
//   await page.locator(ForgotPassword.forgotyourpassword).click();

//   // Verify UI elements
//   await expect(page.locator(ForgotPassword.heading)).toBeVisible();
//   await expect(page.locator(ForgotPassword.intro)).toBeVisible();
//   await expect(page.locator(ForgotPassword.emaillabel)).toBeVisible();
//   await expect(page.locator(ForgotPassword.emial)).toBeVisible();
//   await expect(page.locator(ForgotPassword.emailwhatisthis)).toBeVisible();
//   await expect(page.locator(ForgotPassword.verificationcode)).toBeVisible();
//   await expect(page.locator(ForgotPassword.codewhatisthis)).toBeVisible();
//   await expect(page.locator(ForgotPassword.continue)).toBeDisabled();
//   await expect(page.locator(ForgotPassword.cancel)).toBeVisible();

//   // Fill in email and click to request verification code
//   await page.locator(ForgotPassword.emial).fill(testData.createAccount.email);
//   await page.locator(ForgotPassword.verificationcode).click();

//   console.log("Verification code requested. Proceed to retrieve the code.");
// },

// async getVerificationCode({ page }) {
//   // Navigate to Gmail
//   await page.goto('https://accounts.google.com/v3/signin/identifier?ifkv=AeZLP9-lG3EDHIX_OaY7u_CWjvuSXP8RpK4lLQLnpOrYno1lGJqaVwKZiTiSlX0_karyq04ipPB6RA&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S-266825815%3A1733924399433620&ddm=1');
//   await page.getByLabel('Email or phone').fill('testadvancery@gmail.com');
//   await page.getByRole('button', { name: 'Next' }).click();
//   await page.getByLabel('Enter your password').fill('Advancery');
//   await page.getByRole('button', { name: 'Next' }).click();

//   // Open Gmail inbox
//   const page1Promise = page.waitForEvent('popup');
//   await page.locator('iframe[name="app"]').contentFrame().getByLabel('Gmail, row 2 of 6 and column').click();
//   const page1 = await page1Promise;
//   await page1.goto('https://mail.google.com/mail/u/0/#inbox');
//   await page1.getByRole('row', { name: 'Microsoft on behalf.' }).first().click();

//   // Extract the email content
//   const emailContent = await page1.locator('.adn').last().textContent();
//   console.log(emailContent);

//   // Extract the verification code
//   const codeMatch = emailContent?.match(/Your code is: (\d{6})/);
//   if (codeMatch) {
//       const verificationCode = codeMatch[1];
//       console.log(`Extracted Code: ${verificationCode}`);
//       return verificationCode;
//   } else {
//       console.error('Verification code not found in the email.');
//       throw new Error('Verification code not found in the email.');
//   }
// },

// async forgotPasswordComplete({ page }) {
//   await this.forgotPasswordInitiate({ page });

//   // Retrieve the verification code
//   const verificationCode = await this.getVerificationCode({ page });

//   // Fill in the verification code and continue
//   await page.locator(ForgotPassword.entercode).fill(verificationCode);
//   await page.locator(ForgotPassword.continue).click();

//   console.log("Forgot Password process completed successfully.");
// }

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

  console.log("Verification code requested. Proceed to retrieve the code.");
  },

async getVerificationCode({ page }) {
  // Navigate to Gmail
  await page.goto('https://accounts.google.com/v3/signin/identifier?ifkv=AeZLP9-lG3EDHIX_OaY7u_CWjvuSXP8RpK4lLQLnpOrYno1lGJqaVwKZiTiSlX0_karyq04ipPB6RA&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S-266825815%3A1733924399433620&ddm=1');
  await page.getByLabel('Email or phone').fill('testadvancery@gmail.com');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByLabel('Enter your password').fill('Advancery');
  await page.getByRole('button', { name: 'Next' }).click();

  // Open Gmail inbox
  await page.goto('https://mail.google.com/mail/u/0/#inbox');
  await page.getByRole('row', { name: 'Microsoft on behalf.' }).first().click();

  // Extract the email content
  const emailContent = await page.locator('.adn').last().textContent();
  console.log(emailContent);

  // Extract the verification code
  const codeMatch = emailContent?.match(/Your code is: (\d{6})/);
  if (codeMatch) {
      const verificationCode = codeMatch[1];
      console.log(`Extracted Code: ${verificationCode}`);
      return verificationCode;
  } else {
      console.error('Verification code not found in the email.');
      throw new Error('Verification code not found in the email.');
  }
  },

}



export default { gmacApps }