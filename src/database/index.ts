import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();

    //se for ambiente de test, vai pegar database de test se não, usa o normal
    return createConnection(
        Object.assign(defaultOptions, {
            database:
                process.env.NODE_ENV === "test"
                    ? "./src/database.test.sqlite"
                    : defaultOptions.database,
        })
    );
};