import { pool } from './dbConnection';
import fs from 'fs';
import path from 'path';

export async function fetchProgramData(): Promise<void> {
  const client = await pool.connect();

  try {
    const query = `select name, product_type, duration from product where deleted_on is null`;
    const result = await client.query(query);
    // const filePath = path.join(__dirname, '../resource/uiTestData/dbPrograms.json');
    // fs.writeFileSync(filePath, JSON.stringify(result.rows, null, 2));
    fs.writeFileSync('dbPrograms.json', JSON.stringify(result.rows, null, 2));

    console.log(` DB data saved to dbPrograms.json`);
  } catch (error) {
    console.error(' Error fetching DB data:', error);
  } finally {
    client.release();
  }
}

fetchProgramData();

