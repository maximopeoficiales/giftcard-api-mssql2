import { Router } from "express";

export const router = Router();

import { router as giftcardRouter } from "./giftCard.route";

router.use("/v1/giftcard", giftcardRouter);
// router.use("/v2/giftcard", giftcardRouterV2);

