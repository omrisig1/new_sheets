export default class validationException extends Error {
    status: number;
    message: string;
    constructor(status: number, message: string);
}
