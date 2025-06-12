import { test, expect, request } from '@playwright/test';
import { writeFileSync } from 'fs';
import { join } from 'path';

// Helper function to save response to JSON file
async function saveResponseToFile(response: any, filename = 'occupations_response.json') {
    const filePath = join(process.cwd(), filename); // Root level of project
    const responseBody = await response.json(); // Parse JSON
    writeFileSync(filePath, JSON.stringify(responseBody, null, 2)); // Pretty print
    console.log(`Response saved to ${filePath}`);
}

test.only('Occupations API - fetch filtered results', async () => {
    const apiContext = await request.newContext({
        baseURL: 'https://advancery.uat.gmac.com',
        extraHTTPHeaders: {
            'accept': 'application/json',
        }
    });

    const response = await apiContext.get('/api/dataset/occupations', {
        params: {
            q: 'name:con',
            // filter: 'level:3,match_count:0',
            limit: '160'
        },
        
    });

    await saveResponseToFile(response, 'occupations_response_uat.json');

    // console.log(await response.text()); // Debug output
    expect(response.ok()).toBeTruthy();
});
