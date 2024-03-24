import chokidar from 'chokidar';
interface IConfig {
    express_server: {
        HOST: string;
        PORT: string;
    };
    mysql_connection: {
        DB_HOST: string;
        DB_PORT: string;
        DB_NAME: string;
        DB_USER_NAME: string;
        DB_USER_PASSWORD: string;
    };
    allowed_types: string[];
}
declare const config: IConfig;
export declare const reLoadConfig: () => IConfig;
export declare const watcher: chokidar.FSWatcher;
export default config;
