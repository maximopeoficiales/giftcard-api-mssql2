import { mssqlConfiguration } from "../../../../config";

export const sqlConfig = {
    user: mssqlConfiguration.user,
    password: mssqlConfiguration.password,
    database: mssqlConfiguration.database,
    server: mssqlConfiguration.host,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true, // for azure
        trustServerCertificate: false // change to true for local dev / self-signed certs
    }
}