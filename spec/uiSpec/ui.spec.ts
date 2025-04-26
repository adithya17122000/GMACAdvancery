import { test, expect } from "@playwright/test";
import { uiCommonUtils } from "../../utils/uiCommonMethodModule";
import * as testData from "../../resource/uiTestData/uiTestData.json";
import fs from 'fs';
import path from 'path';
import { writeFileSync } from 'fs';
const testSpec = uiCommonUtils.uiBase.gmacApps;
const resource: string = "/";

test.beforeEach('HTTP Authentication URL', async ({ page, baseURL }) => {
    const url = baseURL + resource
    await page.goto(url)
})


test('Validate the landing page', async ({ page, baseURL }) => {
    await testSpec.validateTheLoadingofLandingPage({ page, baseURL });
});

// test('Validate signup with email', async ({ page, baseURL }) => {
//     await testSpec.validateTheLoadingofLandingPage({ page, baseURL });
//     await testSpec.createAccountWithEmail({ page });
// })

// test('User Already exist',async({page,baseURL})=>{
//     await testSpec.validateTheLoadingofLandingPage({ page, baseURL });
//     await testSpec.userAlreadyexists({page})
// })

// test('Validate signup with google',async({page,baseURL})=>{
//     await testSpec.validateTheLoadingofLandingPage({ page, baseURL });
//     await testSpec.createAccountWithGoogle({page});
// })

test.only('Login and Logout with local credentials', async ({ page, baseURL }) => {
    await testSpec.validateTheLoadingofLandingPage({ page, baseURL });
    await testSpec.emailLogin({ page });

})

test('Invalide login credentials', async ({ page, baseURL }) => {
    await testSpec.inValideLoginCredentials({ page, baseURL });
})

test('User not found social login', async ({ page, baseURL }) => {
    await testSpec.validateTheLoadingofLandingPage({ page, baseURL });
    await testSpec.socialLoginUserNotFound({ page })
})


// test('Program details', async ({ baseURL, page }) => {
//     await testSpec.emailLogin({ page });
//     await page.getByRole('link', { name: 'Explore' }).click();
//     await page.getByLabel('Search').click();
//     await page.getByPlaceholder('Search all programs by name').fill('University of Texas at Dallas Professional MBA Flex');
//     await page.waitForTimeout(2000);
//     const programNameRaw = await page.locator("(//div[@data-align='start'])[6]").allInnerTexts();
//     const programName = programNameRaw.map(test => test.split('\n')[0]);
//     console.log(programName);
//     const programTypeRaw = await page.locator("(//div[@data-align='start'])[7]").allInnerTexts();
//     const programType = programTypeRaw.map(text => text.split('\n')[0]);
//     console.log('Program Type', programType);
//     const durationRaw = await page.locator("(//div[@data-align='start'])[8]").allInnerTexts();
//     const duration = durationRaw.map(text => text.split('\n')[0]);
//     console.log('Duration', duration);
//     const tuitionRaw = await page.locator("(//div[@data-align='start'])[10]").allInnerTexts();
//     const tuition = tuitionRaw.map(text => text.split('\n')[0]);
//     console.log('Tuition', tuition);
//     const modalityRaw = await page.locator("(//div[@data-align='start'])[11]").allInnerTexts();
//     const modality = modalityRaw.map(text => text.split('\n')[0]);
//     console.log('Modality', modality);
//     const locationRaw = await page.locator("(//div[@data-align='start'])[12]").allInnerTexts();
//     const location = locationRaw.map(text => text.split('\n')[0]);
//     console.log('Location', location);
//     const timeCommitmentRaw = await page.locator("(//div[@data-align='start'])[13]").allInnerTexts();
//     const timeCommitment = timeCommitmentRaw.map(text => text.split('\n')[0]);
//     console.log('Time Commitment', timeCommitment);

//     const programDetails = programName.map((_, index) => ({
//         name: programName[index],
//         product_type: programType[index],
//         duration: duration[index],
//         tuition: tuition[index],
//         modality: modality[index],
//         location: location[index],
//         timeCommitment: timeCommitment[index],
//     }));

//     fs.writeFileSync('programDetails.json', JSON.stringify(programDetails, null, 2));
//     console.log('✅ Program details saved to programDetails.json');
// });


// tests/program-details.spec.ts

test('Program details', async ({ baseURL, page }) => {
    await testSpec.emailLogin({ page });
    await page.getByRole('link', { name: 'Explore' }).click();
    await page.getByLabel('Search').click();
    await page.getByPlaceholder('Search all programs by name').fill('ESMT Berlin Full-time MBA');
    await page.waitForTimeout(2000);
    const programNameRaw = await page.locator("(//div[@data-align='start'])[6]").allInnerTexts();
    const programTypeRaw = await page.locator("(//div[@data-align='start'])[7]").allInnerTexts();
    const durationRaw = await page.locator("(//div[@data-align='start'])[8]").allInnerTexts();
    // const tuitionRaw = await page.locator("(//div[@data-align='start'])[10]").allInnerTexts();
    const tuitionRaw = await page.locator("(//div[@data-align='start'])[10]").allInnerTexts(); // string[]
    const modalityRaw = await page.locator("(//div[@data-align='start'])[11]").allInnerTexts();
    const locationRaw = await page.locator("(//div[@data-align='start'])[12]").allInnerTexts();
    const timeCommitmentRaw = await page.locator("(//div[@data-align='start'])[13]").allInnerTexts();
    
    const tuitionValue = tuitionRaw.map(t => t.split('\n')[0])[0]?.trim() || ''; // string
    const allowedCurrencyPattern = /^((\$|USD|€|EUR|£|GBP)\s?\d{1,3}(,\d{3})*(\.\d{2})?)(\s*-\s*(\$|USD|€|EUR|£|GBP)?\s?\d{1,3}(,\d{3})*(\.\d{2})?)?$/
    // Check if it matches the allowed pattern
    if (!allowedCurrencyPattern.test(tuitionValue)) {
  throw new Error(` Invalid tuition currency detected: "${tuitionValue}". Only USD, EUR, GBP are allowed.`);
}
  
const programName = programNameRaw[0]?.trim() || '';
const timeCommitment = timeCommitmentRaw[0]?.trim() || '';

const programNameLower = programName.toLowerCase();
const timeCommitmentLower = timeCommitment.toLowerCase();

const keywords = ['Full time', 'Part time', 'Online', 'Inperson', 'Live online'];

for (const keyword of keywords) {
  const keywordLower = keyword.toLowerCase();

  if (programNameLower.includes(keywordLower)) {
    if (!timeCommitmentLower.includes(keywordLower)) {
      console.warn(`❗ Mismatch found:
  Program Name: "${programName}"
  Expected Time Commitment to include: "${keyword}"
  But got: "${timeCommitment}"
      `);
    }
  }
}
    const programDetails = {
      name: programNameRaw.map(t => t.split('\n')[0])[0] || '',
      product_type: programTypeRaw.map(t => t.split('\n')[0])[0] || '',
      duration: durationRaw.map(t => t.split('\n')[0])[0] || '',
      tuition: tuitionRaw.map(t => t.split('\n')[0])[0] || '',
      modality: modalityRaw.map(t => t.split('\n')[0])[0] || '',
      location: locationRaw.map(t => t.split('\n')[0])[0] || '',
      timeCommitment: timeCommitmentRaw.map(t => t.split('\n')[0])[0] || ''
    };
  
    console.log('Program Details JSON:', JSON.stringify(programDetails, null, 2));
    writeFileSync('program-details.json', JSON.stringify([programDetails], null, 2));
  });
  
// test('compare dbPrograms.json and programDetails.json', async () => {
//     const dbPrograms = JSON.parse(fs.readFileSync('./dbPrograms.json', 'utf-8'));
//     const uiPrograms = JSON.parse(fs.readFileSync('./programDetails.json', 'utf-8'));
  
//     expect(dbPrograms).toEqual(uiPrograms); // fails if they’re not exactly the same
//   });


test('compare dbPrograms.json and programDetails.json', async () => {
    const dbPrograms = JSON.parse(fs.readFileSync('./dbPrograms.json', 'utf-8'));
    const uiPrograms = JSON.parse(fs.readFileSync('./program-details.json', 'utf-8'));
  
    // Updated keys to match DB structure
    const fieldsToCompare = ['name', 'product_type', 'duration'];
  
    for (const uiProgram of uiPrograms) {
      const match = dbPrograms.find(dbProgram =>
        fieldsToCompare.every(field => dbProgram[field] === uiProgram[field])
      );
  
      expect(match, `UI program not found in DB: ${JSON.stringify(uiProgram)}`).toBeTruthy();
    }
  
    console.log('All UI programs are present in DB with matching fields.');
  });
  