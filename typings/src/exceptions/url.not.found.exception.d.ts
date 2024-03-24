import HttpException from "./http.exception.js";
export default class UrlNotFoundException extends HttpException {
    constructor(path: string);
}
