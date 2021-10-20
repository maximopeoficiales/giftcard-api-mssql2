import { Request, Response } from "express";
import HttpStatusCode from "../../shared/httpStatusCode";
import { updateGiftcardService } from "../../../application/use_cases/updateGiftcard.service";


export class GiftcardController {



  async validateGifcard(req: Request, res: Response) {
    try {
      // console.log(this);
      let { cardNumber } = req.params;
      let response = await updateGiftcardService.searchGiftcard(parseInt(cardNumber));
      if (response.statusQuery) {
        return res.status(HttpStatusCode.OK).json(response);
      }
      return res.status(HttpStatusCode.NOT_FOUND).json(response);

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
      if (response.statusQuery) {
        return res.status(HttpStatusCode.OK).json(response);
      }
      return res.status(HttpStatusCode.NOT_FOUND).json(response);

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
