

import * as fs from 'fs';

// Define the type for the data entries
interface Item {
  id: string;
  name: string;
  [key: string]: any; // Allows additional properties without TypeScript complaining
}

// Read and parse the two JSON files
const devFile = fs.readFileSync('occupations_response_dev.json', 'utf-8');
const uatFile = fs.readFileSync('occupations_response_uat.json', 'utf-8');

const devJson = JSON.parse(devFile) as { result: { data: Item[] } };
const uatJson = JSON.parse(uatFile) as { result: { data: Item[] } };

const devData = devJson.result.data;
const uatData = uatJson.result.data;

const devMap = new Map<string, Item>(devData.map((item) => [item.id, item]));
const uatMap = new Map<string, Item>(uatData.map((item) => [item.id, item]));

const added: Item[] = [];
const removed: Item[] = [];
const changed: { id: string; devName: string; uatName: string }[] = [];

// Find added and changed
for (const [id, uatItem] of uatMap) {
  const devItem = devMap.get(id);
  if (!devItem) {
    added.push(uatItem);
  } else if (devItem.name !== uatItem.name) {
    changed.push({ id, devName: devItem.name, uatName: uatItem.name });
  }
}

// Find removed
for (const [id, devItem] of devMap) {
  if (!uatMap.has(id)) {
    removed.push(devItem);
  }
}

// Print results
console.log("Comparison complete:\n");

console.log("In UAT but not in DEV:");
console.log(added.length ? added.map(({ id, name }) => ({ id, name })) : "None");

console.log("In DEV but not in UAT:");
console.log(removed.length ? removed.map(({ id, name }) => ({ id, name })) : "None");

// console.log("\nChanged entries (same ID, different name):");
// console.log(changed.length ? changed : "None");