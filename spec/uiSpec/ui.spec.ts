import { test, expect } from "@playwright/test";
import { uiCommonUtils } from "../../utils/uiCommonMethodModule";
import { generateTestUser } from '../../utils/generateTestUser';
import * as testData from "../../resource/uiTestData/uiTestData.json";
import fs from 'fs';
import path from 'path';
import { writeFileSync } from 'fs';
const testSpec = uiCommonUtils.uiBase.gmacApps;
const resource: string = "/";

// test.beforeEach('HTTP Authentication URL', async ({ page, baseURL }) => {
//     const url = baseURL + resource
//     await page.goto(url)
// })


test('Validate the landing page', async ({ page, baseURL }) => {
    await testSpec.validateTheLoadingofLandingPage({ page, baseURL });
});

test('Validate signup with email', async ({ page, baseURL }) => {
    const user = generateTestUser()
    await testSpec.validateTheLoadingofLandingPage({ page, baseURL });
    await testSpec.createAccountWithEmail({ page, user });
})

// test('User Already exist',async({page,baseURL})=>{
//     await testSpec.validateTheLoadingofLandingPage({ page, baseURL });
//     await testSpec.userAlreadyexists({page})
// })

// test('Validate signup with google',async({page,baseURL})=>{
//     await testSpec.validateTheLoadingofLandingPage({ page, baseURL });
//     await testSpec.createAccountWithGoogle({page});
// })

test('Login and Logout', async ({ page, baseURL }) => {
    await testSpec.validateTheLoadingofLandingPage({ page, baseURL });
    await testSpec.emailLogin({ page });
    await testSpec.logout({ page });
})

test('Invalide login credentials', async ({ page, baseURL }) => {
    await testSpec.inValideLoginCredentials({ page, baseURL });
})

test('User not found social login', async ({ page, baseURL }) => {
    await testSpec.validateTheLoadingofLandingPage({ page, baseURL });
    await testSpec.socialLoginUserNotFound({ page })
})

test('Forgot password flow - email code auto-fill', async ({ page,baseURL }) => {
    // await page.goto(baseURL + resource);
    // await page.locator(LandingPage.login).click();
    await testSpec.forgotPasswordInitiate({page})
  });

// test('Login and Logout',async({page})=>{
//     await page.goto("https://gmac:skills@advancery.preview.gmac.com")
//     await expect(page.locator("svg[aria-label='GMAC Advancery']")).toBeVisible();
//     await page.waitForSelector("//span[normalize-space()='Cookie Consent']");
//     await page.locator("//button[2]").click();
//     await page.locator("//span[normalize-space()='Login']").click();
//     await page.locator("#email").fill("adithya.anjanappa@triconinfotech.com");
//     await page.locator("#password").fill("Secure@238$6$");
//     await page.locator("#next").click();
//     await expect(page.locator(".Navbar_desktopNav__QwxQJ")).toBeVisible();
//     await expect(page.locator("svg[aria-label='GMAC Advancery']")).toBeVisible();
//     await page.waitForSelector('//div[@role="presentation"]');
//     await page.locator('//div[@role="presentation"]').click();
//     await page.locator("a[href$='/internal-api/auth/logout']").click();
//     // await expect(page.url()).toBe("https://advancery.dev.gmac.com/");
//     await page.waitForURL("https://advancery.preview.gmac.com/");
//     await expect(page).toHaveURL("https://advancery.preview.gmac.com/");
//     await expect(page.locator("svg[aria-label='GMAC Advancery']")).toBeVisible();
//     await page.screenshot({ path: 'logout_screenshot.png', fullPage: true });

// });

test('Validate the Explore page and search a product', async ({ page, baseURL }) => {
    await testSpec.validateTheLoadingofLandingPage({ page, baseURL });
    await testSpec.emailLogin({ page });
    await page.getByRole('link', { name: 'Explore' }).click();
    await page.getByLabel('Search').click();
    await page.getByPlaceholder('Search all programs by name').fill('ESMT Berlin Full-time MBA');
    await page.waitForTimeout(2000);
    const programNameRaw = await page.locator("(//div[@data-align='start'])[6]").allInnerTexts();
    expect(programNameRaw).toBeTruthy();
    await testSpec.logout({ page });
})

