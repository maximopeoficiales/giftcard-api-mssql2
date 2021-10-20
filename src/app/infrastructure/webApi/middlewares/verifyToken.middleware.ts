import { NextFunction, Request, Response } from "express";
import { Session } from "express-session";

import * as JWT from "jsonwebtoken";
import { jwtConfig } from "../../../../config";

type RequestSession = Request & {
  session: Session;
  sessionID: string;
}

export const tokenValidation = (req: RequestSession, res: Response, next: NextFunction) => {
  const token = req.headers["token"] as string;

  if (!token)
    return res
      .status(401)
      .send({ errorCode: "unAuthorized", errorMessage: "Error token" });

  JWT.verify(token, jwtConfig.secret, (err, payload) => {


    if (err) {
      if (err.message == "TokenExpiredError: jwt expired") {

        return res
          .status(401)
          .send({ errorCode: "unAuthorized", errorMessage: "Token expired" });
      }
      return res
        .status(401)
        .send({ errorCode: "unAuthorized", errorMessage: "Error token" });

    }
    if (!payload.username)
      return res
        .status(401)
        .send({ errorCode: "unAuthorized", errorMessage: "Error token" });
    if (!payload.channel)
      return res
        .status(401)
        .send({ errorCode: "unAuthorized", errorMessage: "Error token" });
    req.body.username = payload.username;
    req.body.password = payload.password;
    req.body.token = token;
    req.session = payload as any;

    next();

  });
};

export const tokenRefresh = (req: Request) => {
  let token = req.query.token as string;
  try {
    JWT.verify(token, jwtConfig.secret, (err) => {
      if (err) {
        if (err.message == "TokenExpiredError: jwt expired") {
          const payload: any = JWT.verify(token, jwtConfig.secret, {
            ignoreExpiration: true,
          });
          //Refrescamos el token
          token = JWT.sign(
            {
              exp:
                Math.floor(Date.now() / 1000) +
                60 * 60 * parseFloat(jwtConfig.token_expiration),
              user_id: payload.user_id,
            },
            jwtConfig.secret
          );
        } else {
          throw { message: err };
        }
      }
    });

    return token;
  } catch (err) {
    throw { message: "Token invalid" };
  }
};

