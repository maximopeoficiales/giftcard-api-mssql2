import { Request, Response } from "express";
import { generateJWT } from "../../shared/generate.jwt";
import { _validation_findTransaction, _validation_token, _validation_validate } from "../../shared/validations";
import HttpStatusCode from "../../shared/httpStatusCode";
import { UpdateGiftcardService, updateGiftcardService } from "../../../application/use_cases/updateGiftcard.service";


export class GiftcardController {
  async token(req: Request, res: Response) {
    let start = new Date();
    try {
      console.log("");
      console.log("-INIT GENERATE TOKEN-");
      const { username, password, channel } = req.body;

      _validation_token(username, password);

      const channelFound = findChannel(channel);

      if (channelFound.length == 0) {
        throw {
          status: 400,
          errorCode: "invalidChannel",
          message: "Channel Invalid",
        };
      }

      const userFound = findUser(username, password);
      if (userFound.length == 0)
        throw {
          status: 400,
          errorCode: "unAuthorized",
          message: "Username or password is not valid",
        };

      req.body.channel = channel.trim();
      req.body.userId = 1;
      const { tokenKey, expirationTime } = await generateJWT(req.body);

      res.status(200).json({
        tokenKey,
        expirationTime,
      });
    } catch (error) {
      res.status(error.status || 500).send({
        errorCode: error.errorCode || "serviceNotAvailable",
        errorMessage: error.message || "Internal Server Error",
      });
    } finally {
      console.log(`-END GENERATE TOKEN- Request time ${new Date().valueOf() - start.valueOf()}ms`);
    }
  };


  async validateGifcard(req: Request, res: Response) {
    try {
      // console.log(this);
      let { cardNumber } = req.params;
      let response = await updateGiftcardService.searchGiftcard(parseInt(cardNumber));
      return res.json(response);

    } catch (error) {
      console.log(error);

      return res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).send({
        errorCode: error.errorCode || "serviceNotAvailable",
        errorMessage: error.message || "Internal Server Error",
        errors: ""
      });
    }

  }

  async updateGiftcard(req: Request, res: Response) {
    try {
      let { cardNumber, amountOrder } = req.body;
      let response = await updateGiftcardService.updateGiftcard(cardNumber, amountOrder);
      return res.json(response);

    } catch (error) {
      console.log(error);

      return res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).send({
        errorCode: error.errorCode || "serviceNotAvailable",
        errorMessage: error.message || "Internal Server Error",
        errors: ""
      });
    }

  }


}

export const giftcardController = new GiftcardController();



const findGiftcard = (cardNumber: string, cardExpiry: string, cardCVV: string) => {
  const listCard = [
    {
      cardNumber: "2121217890124567",
      cardExpiry: "09/23",
      cardCVV: "567",
      cardBalance: 10.13,
      authorizationCode: "123456",
    },
    {
      cardNumber: "2121217890124517",
      cardExpiry: "01/25",
      cardCVV: "517",
      cardBalance: 2050.4,
      authorizationCode: "234567",
    },
    {
      cardNumber: "2121217890124697",
      cardExpiry: "04/22",
      cardCVV: "697",
      cardBalance: 67.13,
      authorizationCode: "345678",
    },
    {
      cardNumber: "2121217890124877",
      cardExpiry: "01/22",
      cardCVV: "877",
      cardBalance: 95.13,
      authorizationCode: "456789",
    },
    {
      cardNumber: "2121217790123177",
      cardExpiry: "04/23",
      cardCVV: "177",
      cardBalance: 105.13,
      authorizationCode: "554551",
    },
    {
      cardNumber: "2121217894229437",
      cardExpiry: "01/23",
      cardCVV: "437",
      cardBalance: 1950.13,
      authorizationCode: "789126",
    },
    {
      cardNumber: "2121217891122111",
      cardExpiry: "04/23",
      cardCVV: "111",
      cardBalance: 8567.93,
      authorizationCode: "789145",
    },
    {
      cardNumber: "2121217890129445",
      cardExpiry: "09/23",
      cardCVV: "445",
      cardBalance: 2010.13,
      authorizationCode: "984567",
    },
    {
      cardNumber: "2121217890143222",
      cardExpiry: "04/22",
      cardCVV: "222",
      cardBalance: 7751.13,
      authorizationCode: "554879",
    },
    {
      cardNumber: "2121217890123417",
      cardExpiry: "07/23",
      cardCVV: "417",
      cardBalance: 9145.13,
      authorizationCode: "789125",
    },
  ];

  let responseCard = [];

  listCard.find((card) => {
    if (
      card.cardNumber == cardNumber &&
      card.cardCVV == cardCVV &&
      card.cardExpiry == cardExpiry
    )
      return responseCard.push(card);
  });

  return responseCard;
};

const findChannel = (channel: string) => {
  let listChannel = [
    {
      id: 1,
      channel: "web",
    },
    {
      id: 2,
      channel: "app",
    },
    {
      id: 3,
      channel: "desktop",
    },
    {
      id: 4,
      channel: "caja",
    },
  ];

  let responseChannel = [];
  listChannel.find((c) => {
    if (c.channel == channel) return responseChannel.push(c);
  });
  return responseChannel;
};

const findUser = (username: string, password: string) => {
  let listUser = [
    {
      id_user: 1,
      username: "paulo",
      password: "@Paulo",
    },
    {
      id_user: 2,
      username: "niubiz-giftcard",
      password: "_n1uB1Z",
    },
  ];

  let responseUser = [];
  listUser.find((u) => {
    if (u.username == username && u.password == password)
      return responseUser.push(u);
  });
  return responseUser;
};

const findPurchaseOrder = (purchaseOrder: string, authorizationCode: string, type: number) => {
  let listPurchase = [
    {
      authorizationCode: "554551",
      purchaseOrder: "123456789589",
      operation: "SUCCESS",
    },
    {
      authorizationCode: "234567",
      purchaseOrder: "015154050788",
      operation: "FALSE",
    },
    {
      authorizationCode: "345678",
      purchaseOrder: "01501515",
      operation: "FALSE",
    },
    {
      authorizationCode: "456789",
      purchaseOrder: "06708787",
      operation: "SUCCESS",
    },
    {
      authorizationCode: "789125",
      purchaseOrder: "16708787",
      operation: "SUCCESS",
    },
    {
      authorizationCode: "554879",
      purchaseOrder: "56708787",
      operation: "SUCCESS",
    },
    {
      authorizationCode: "984567",
      purchaseOrder: "86708787",
      operation: "SUCCESS",
    },
    {
      authorizationCode: "345678",
      purchaseOrder: "96708787",
      operation: "SUCCESS",
    },
    {
      authorizationCode: "789126",
      purchaseOrder: "45708787",
      operation: "SUCCESS",
    },
    {
      authorizationCode: "789145",
      purchaseOrder: "35708787",
      operation: "SUCCESS",
    },
  ];

  let responsePurchase = [];
  if (type == 1) {
    listPurchase.find((p) => {
      if (
        p.purchaseOrder == purchaseOrder &&
        p.authorizationCode == authorizationCode
      )
        return responsePurchase.push(p);
    });
  } else if (type == 2) {
    listPurchase.find((p) => {
      if (p.authorizationCode == authorizationCode)
        return responsePurchase.push(p);
    });
  } else if (type == 3) {
    listPurchase.find((p) => {
      if (p.purchaseOrder == purchaseOrder) return responsePurchase.push(p);
    });
  }
  return responsePurchase;
};
