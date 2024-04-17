import sqlite3 from 'sqlite3';
import { open, type Database } from 'sqlite';
import { createEmptyTables } from './createEmptyTables';

class DbManager {
  private dbConnection: Database | undefined = undefined;

  async initDB() {
    try {
      const dbPath = process.env.NODE_ENV === 'test' ? ':memory:' : process.env.DB_PATH || '/tmp/fleet-db.db';
      await this.initDBConnection(dbPath);
    } catch (error) {
      console.error('Error connecting to the database', error);
      process.exit(1);
    }
  }

  async clearDBForTesting() {
    if (process.env.NODE_ENV !== 'test') {
      throw new Error('This function is only available in test environment');
    }
    await this.initDBConnection(':memory:');
  }

  async initDBConnection(filename: string) {
    this.dbConnection = await open({
      filename: filename,
      mode: sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
      driver: sqlite3.Database,
    });
    await createEmptyTables(this.dbConnection);
  }

  getConnection() {
    if (!this.dbConnection) {
      throw new Error('Database connection is not available');
    }
    return this.dbConnection;
  }
}

export default new DbManager();
