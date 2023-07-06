import { Client, ClientConfig } from "pg";
import { getDatabaseURI } from "./config";

let db: Client;

if (process.env.NODE_ENV === 'production') {
    const dbConfig: ClientConfig = {
        connectionString: getDatabaseURI(),
        ssl: {
            rejectUnauthorized: false
        }
    };
    
    db = new Client(dbConfig);
} else {
    const dbConfig: ClientConfig = {
        connectionString: getDatabaseURI()
    };

    db = new Client(dbConfig)
}

db.connect();

export default db;