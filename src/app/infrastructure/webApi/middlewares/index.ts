import { NextFunction, Request, Response } from "express";
import { body, check, validationResult } from "express-validator";

export const cardValidate = async (req: Request, res: Response, next: NextFunction) => {
    await check("cardNumber")
        .isNumeric()
        .trim()
        .notEmpty()
        .isLength({
            min: 16,
            max: 16
        })
        .withMessage({
            message: "CardNumber Invalid",
            errorCode: "invalidCardNumber",
            status: "false",
        }).run(req);

    const errors = validationResult(req);
    const arrayErr = errors.array();
    if (!errors.isEmpty()) {
        // console.log(arrayErr);
        return res.status(400).json({
            status: "false",
            errorCode: arrayErr[arrayErr.length - 1].msg.errorCode,
            errorMessage: arrayErr[arrayErr.length - 1].msg.message,
            data: "invalid value",
        });
    }
    next();
};

export const cardUpdateValidate = async (req: Request, res: Response, next: NextFunction) => {
    await body("cardNumber")
        .isNumeric()
        .trim()
        .notEmpty()
        .isLength({
            min: 16,
            max: 16,
        })
        .withMessage({
            message: "CardNumber Invalid",
            errorCode: "invalidCardNumber",
            status: "false",
        }).run(req);

    await body("amountOrder")
        .isNumeric()
        .trim()
        .notEmpty()
        .withMessage({
            message: "amountOrder Invalid",
            errorCode: "amountOrder",
            status: "false",
        }).run(req);

    const errors = validationResult(req);
    const arrayErr = errors.array();
    if (!errors.isEmpty()) {
        // console.log(arrayErr);
        return res.status(400).json({
            status: "false",
            errorCode: arrayErr[arrayErr.length - 1].msg.errorCode,
            errorMessage: arrayErr[arrayErr.length - 1].msg.message,
            data: "invalid value",
        });
    }
    next();
};