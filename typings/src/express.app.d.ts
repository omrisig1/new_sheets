declare class ExpressApp {
    app: import("express-serve-static-core").Express;
    private setMiddlewares;
    private setRoutings;
    private setErrorHandlers;
    private setDefault;
    start(): Promise<void>;
}
declare const instance: ExpressApp;
export default instance;
