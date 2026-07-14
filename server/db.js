import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = path.join(__dirname, 'data.json');
const adapter = new JSONFile(file);

const defaultData = { products: [], categories: [], inquiries: [], bookings: [] , work:[] };

export const db = new Low(adapter, defaultData);

export async function initDb() {
  await db.read();
  if (!db.data) {
    db.data = defaultData;
    await db.write();
    return;
  }
  let changed = false;
  for (const key of Object.keys(defaultData)) {
    if (!db.data[key]) {
      db.data[key] = defaultData[key];
      changed = true;
    }
  }
  if (changed) await db.write();
}

