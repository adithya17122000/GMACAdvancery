import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';

// Full target path: utils/resource/testData/generatedUsers.json
const filePath = join(process.cwd(), 'resource', 'testData', 'generatedUsers.json');
const dirPath = dirname(filePath);

function generateRandomString(length = 6) {
  return Math.random().toString(36).substring(2, 2 + length);
}

export function generateTestUser() {
  const timestamp = Date.now();
  const rand = generateRandomString();

  const user = {
    email: `testuser_${rand}_${timestamp}@example.com`,
    localPassword: `Passw0rd!${rand}`,
    firstName: `First_${rand}`,
    lastName: `Last_${rand}`,
  };

  //  Ensure the directory exists before writing
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
  }

  //  Save the user to the JSON file
  const existing = existsSync(filePath) ? JSON.parse(readFileSync(filePath, 'utf-8')) : [];
  existing.push(user);
  writeFileSync(filePath, JSON.stringify(existing, null, 2));

  return user;
}
