import { Response } from "express";

export class HttpError {
    public message: string;
    public httpStatusCode: number;
    public functionName: string;

    constructor(message, httpStatusCode, functionName) {
        this.message = message;
        this.httpStatusCode = httpStatusCode;
        this.functionName = functionName;
    }

    printMessage() {
        console.error(`Error in ${this.functionName}: ${this.message}`)
    }
    sendResponse(res: Response) {
        res.status(this.httpStatusCode).send({success: false, error: this.message});
    }
}