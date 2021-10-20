import mssql, { ConnectionPool } from 'mssql'
import { sqlConfig } from '../config/options.db';


export const getConnectionPool = async () => {
    try {
        const connection = await mssql.connect(sqlConfig);
        return connection;

    } catch (error) {
        console.log("Ocurrio un error en la conexion a MSSQL", error);
    }
}
