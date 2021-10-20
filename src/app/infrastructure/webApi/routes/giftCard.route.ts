import { Router } from "express";
import { giftcardController } from "../controllers/giftCard.controller";
// import { authorization, findTransaction, token, validate } from "../controllers/giftCard.controller";
import { cardUpdateValidate, cardValidate } from "../middlewares";
export const router = Router();

// router.post("/token", giftcardController.token);
router.get("/validate/:cardNumber", cardValidate, giftcardController.validateGifcard);
router.put("/updateGiftcard", cardUpdateValidate, giftcardController.updateGiftcard);

