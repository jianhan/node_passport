import { RequestHandler } from "express";

export interface Route {
    path: string;
    method: string;
    handler: RequestHandler | RequestHandler[];
}
