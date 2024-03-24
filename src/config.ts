import fs from 'fs';
import path from "path";
import chokidar from 'chokidar';

interface IConfig {
    express_server: {
        HOST: string,
        PORT: string
    };
    mysql_connection: {
        DB_HOST: string,
        DB_PORT: string,
        DB_NAME: string,
        DB_USER_NAME: string,
        DB_USER_PASSWORD: string
    },
    allowed_types : string[]
}

const config : IConfig = JSON.parse(fs.readFileSync(path.join(process.cwd(),"config.json"),"utf-8"));

export const reLoadConfig = (): IConfig=> {
    let updated_config: IConfig = JSON.parse(fs.readFileSync(path.join(process.cwd(),"config.json"),"utf-8"));
    return config;
}


export const watcher = chokidar.watch("config.json",{
    persistent: true
})

export default config;