import express from "express";
import * as core from "express-serve-static-core";
import jwt from "jsonwebtoken";

export interface Query extends core.Query {}

export interface Params extends core.ParamsDictionary {}

export interface Request<
  ReqBody = any,
  ReqQuery = Query,
  URLParams extends Params = core.ParamsDictionary
> extends express.Request<URLParams, any, ReqBody, ReqQuery> {
  userId: string;
}

export interface TokenPayload{
    id:string;
}

export const verifyToken= <T extends Object>(token: string, secret: string): T => {
  return jwt.verify(token, secret) as T;
};
