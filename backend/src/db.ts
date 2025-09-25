import Database from 'better-sqlite3';

const db = new Database('addresses.db');

db.exec(`CREATE TABLE IF NOT EXISTS addresses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  country TEXT NOT NULL,
  data TEXT NOT NULL
)`);

export type Address = {
  country: string;
  data: Record<string, string>;
};

export function saveAddress(address: Address) {
  const stmt = db.prepare('INSERT INTO addresses (country, data) VALUES (?, ?)');
  stmt.run(address.country, JSON.stringify(address.data));
}

export function getAddresses(): Address[] {
  const rows = db.prepare('SELECT country, data FROM addresses').all();
  return rows.map((row: any) => ({
    country: row.country,
    data: JSON.parse(row.data)
  }));
}