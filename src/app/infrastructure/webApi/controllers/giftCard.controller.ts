import { Request, Response } from "express";
import HttpStatusCode from "../../shared/httpStatusCode";
import { updateGiftcardService } from "../../../application/use_cases/updateGiftcard.service";


export class GiftcardController {



  async validateGifcard(req: Request, res: Response) {
    try {
      // console.log(this);
      let { cardNumber } = req.params;
      let response = await updateGiftcardService.searchGiftcard(parseInt(cardNumber));

      return res.status(200).json(response);

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
