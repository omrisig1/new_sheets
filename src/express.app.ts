import log from '@ajar/marker';
import express from 'express';
import cors from 'cors';
import config, {reLoadConfig} from "./config.js";
import sheets_router from "./modules/sheets/sheets.router.js";
import {not_found, responseWithError, urlNotFoundHandler} from "./middleware/errors.handler.js";
import { connect as connect_sqlDb } from './db/db.connection.js';
import { watcher as config_watcher } from './config.js';

const { PORT, HOST } = config.express_server;

class ExpressApp {
  app = express();

  private setMiddlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private setRoutings() {
    this.app.use("/api/sheets", sheets_router);

  }

  private setErrorHandlers() {
    this.app.use(urlNotFoundHandler);
    this.app.use(responseWithError);
  }

  private setDefault() {
    this.app.use("*", not_found);
  }

  async start() {
    this.setMiddlewares();
    this.setRoutings();
    this.setErrorHandlers();
    this.setDefault();

    // connect to mySql
    await connect_sqlDb();

    // connect to server
    this.app.listen(Number(PORT), HOST);
    log.magenta('Sheets API is live on', ` ✨ ⚡  http://${HOST}:${PORT} ✨ ⚡`);

    // sign config watcher to change events in config.json
    config_watcher.on('change',()=>{
      log.blue("Reloading config.json...");
      reLoadConfig();
      log.magenta("config.json loaded");
    });
  }
}

const instance = new ExpressApp();
export default instance;
