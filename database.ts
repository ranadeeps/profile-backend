import { DataSource } from "typeorm";
import { Log } from "./analytics/log.model";

const db_username = process.env.db_username;
const db_password = process.env.db_password;
const db_name = process.env.db_name;
const db_port = process.env.db_port;
const db_host = process.env.db_host;
export const typeorm = new DataSource({
  type: "postgres",
  host: db_host,
  port: Number(db_port),
  username: db_username,
  password: db_password,
  database: db_name,
  synchronize: true,
  logging: true,
  entities: [Log],
  subscribers: [],
  migrations: [],
  metadataTableName: "metadata",
});

export async function connect_database() {
  try {
    await typeorm.initialize();
    console.log("Connect to database");
  } catch (error) {
    console.log(error);
  }
}
