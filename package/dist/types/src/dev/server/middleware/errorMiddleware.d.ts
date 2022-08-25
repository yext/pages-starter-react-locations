import { ViteDevServer } from "vite";
import { ErrorRequestHandler } from "express";
export declare const errorMiddleware: (vite: ViteDevServer) => ErrorRequestHandler;
