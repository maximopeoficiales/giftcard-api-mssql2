import mssql, { ConnectionPool } from 'mssql'
import { sqlConfig } from '../config/options.db';

export class GiftcardMssql {
    connectionInstance: ConnectionPool;
    constructor() {
        this.init();
    }
    async init() {
        try {
            this.connectionInstance = await mssql.connect(sqlConfig);
        } catch (error) {
            console.log("Ocurrio un error en la conexion a MSSQL", error);
        }
    }
    getConnection(): ConnectionPool {
        return this.connectionInstance;
    }

}

export const giftcardMssqlIntance = new GiftcardMssql().getConnection();
