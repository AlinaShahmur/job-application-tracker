import { Response } from "express";

export const responseWrapper = (res: Response, status, data: any) => {
    return res
            .status(status)
            .send({success: true, data });
}