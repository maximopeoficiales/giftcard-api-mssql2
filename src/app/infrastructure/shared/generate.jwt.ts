import { jwtConfig } from '../../../config'
import { GenerateJWTDto } from "../../domain/dtos/generateJWT.dto";
import jwt from "jsonwebtoken";
import moment from 'moment-timezone';
import { TokenDataResponse } from "../../domain/responses/TokenData.response";


export const generateJWT = (data: GenerateJWTDto): Promise<TokenDataResponse> => {
  return new Promise((resolve, reject) => {
    const payload = { userId: data.userId, username: data.username, channel: data.channel };
    const { expirationTime, jwtFormat } = expirationFormat();
    jwt.sign(payload, jwtConfig.secret, { expiresIn: jwtFormat }, (err, tokenKey) => {
      if (err) {
        console.log(err);
        reject("No se pudo generar el token");
      } else {
        resolve({ tokenKey, expirationTime });
      }
    }
    );
  });
};


export const expirationFormat = () => {

  let timezone = 'America/Lima'
  let expirationTime = "";
  let jwtFormat = '';

  if (jwtConfig.time == 'days') {

    expirationTime = moment().tz(timezone).add(jwtConfig.token_expiration, jwtConfig.time).format('YYYY-MM-DD HH:mm:ss');
    jwtFormat = `${jwtConfig.token_expiration}d`;

  } else if (jwtConfig.time == 'hours') {

    expirationTime = moment().tz(timezone).add(jwtConfig.token_expiration, jwtConfig.time).format('YYYY-MM-DD HH:mm:ss');
    jwtFormat = `${jwtConfig.token_expiration}h`;

  } else {

    let time: moment.unitOfTime.DurationConstructor = 'minutes';
    expirationTime = moment().tz(timezone).add(jwtConfig.token_expiration, time).format('YYYY-MM-DD HH:mm:ss');
    jwtFormat = `${jwtConfig.token_expiration}m`;

  }

  return {
    expirationTime,
    jwtFormat
  }
}




