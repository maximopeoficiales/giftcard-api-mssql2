import { check, validationResult } from "express-validator";
import moment from "moment";
import { NextFunction, Request, Response } from "express";
import axios from "axios";

export const validateValidator = async (req: Request, res: Response, next: NextFunction) => {
  await check("amount")
    .notEmpty()
    .isFloat()
    .withMessage({
      message: "Amount Invalid",
      errorCode: "invalidAmount",
      status: "false",
    })
    .isLength({
      max: 8,
    })
    .withMessage({
      message: "Amount Invalid",
      errorCode: "invalidAmount",
      status: "false",
    })
    .run(req);

  // await check("cardExpiry", "cardExpiry is required").notEmpty().run(req);
  // await check("cardCVV", "cardCVV is required").notEmpty().run(req);
  // await check("channel", "channel is required").notEmpty().run(req);
  // await check("amount", "amount is invalid")
  //   .notEmpty()
  //   .isLength({
  //     min: 6,
  //   })
  //   .run(req);

  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }

  const errors = validationResult(req);
  const arrayErr = errors.array();

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "false",
      errorCode: arrayErr[arrayErr.length - 1].msg.errorCode,
      errorMessage: arrayErr[arrayErr.length - 1].msg.message,
      data: "invalid value",
    });
  }

  if (
    moment().year().toString().slice(2, 4) >
    req.body.cardExpiry.toString().slice(3, 5) ||
    Number(req.body.cardExpiry.toString().slice(0, 2)) > 12
  ) {
    return res.status(400).json({
      status: "false",
      message: "cardExpiry Invalid",
      errorCode: "invalidCardExpiry",
    });
  }

  if (
    moment().month() + 1 > Number(req.body.cardExpiry.toString().slice(0, 2)) &&
    moment().year().toString().slice(2, 4) >
    req.body.cardExpiry.toString().slice(3, 5)
  ) {
    return res.status(400).json({
      status: "false",
      message: "cardExpiry Invalid",
      errorCode: "invalidCardExpiry",
    });
  }
  next();
};

export const authorizationValidator = async (req: Request, res: Response, next: NextFunction) => {
  await axios.get(
    `http://nlb-giftcard-dev-439662ac17a7d322.elb.us-east-1.amazonaws.com:82/replacement-order/confirm-order?id=105593`,

  ).then(resp => {
    console.log(resp)
    return res.status(200).json(resp.data);
  })
    .catch(err => {
      console.log(err)
      res.status(400).json(err);
    })



  await check("cardNumber")
    .trim()
    .notEmpty()
    .isLength({
      min: 16,
    })
    .withMessage({
      message: "CardNumber Invalid",
      errorCode: "invalidCardNumber",
      status: "false",
    })
    .run(req);

  await check("amount")
    .notEmpty()
    .isFloat()
    .isLength({
      max: 8,
    })
    .withMessage({
      message: "Amount Invalid",
      errorCode: "invalidAmount",
      status: "false",
    })
    .run(req);

  // await check("cardExpiry", "cardExpiry is required").notEmpty().run(req);
  // await check("cardCVV", "cardCVV is required")
  //   .notEmpty()
  //   .isLength({
  //     max: 4,
  //   })
  //   .run(req);

  await check("email")
    .notEmpty()
    .isEmail()
    .withMessage({
      message: "Email Invalid",
      errorCode: "invalidEmail",
      status: "false"
    })
    .run(req);

  // await check("phone")
  // .notEmpty()
  // .isLength({
  //   min: 7, max: 15
  // })
  // .withMessage({
  //   message: 'Phone Invalid', 
  //   errorCode: 'invalidPhone',
  //   status: "false"
  // })
  // .run(req);

  // await check("identificationDocument")
  // .notEmpty()
  // .isLength({
  //   min: 8, max: 15
  // })
  // .withMessage({
  //   message: 'IdentificationDocument Invalid',
  //   errorCode: 'invalidIdentification',
  //   status: "false"
  // })
  // .run(req);

  await check("channel")
    .notEmpty()
    .withMessage({
      message: "Channel Invalid",
      errorCode: "invalidChannel",
      status: "false",
    })
    .run(req);

  await check("name")
    .notEmpty()
    .isLength({
      min: 5,
      max: 40
    })
    .withMessage({
      message: 'Name Invalid',
      errorCode: 'invalidName',
      status: "false",
    })
    .run(req);

  await check("lastname")
    .notEmpty()
    .isLength({
      min: 5,
      max: 80
    })
    .withMessage({
      message: 'Lastname Invalid',
      errorCode: 'invalidLastname',
      status: "false",
    })
    .run(req);

  // await check("amount", "amount is required")
  //   .isLength({
  //     max: 6,
  //   })
  //   .run(req);

  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }

  await check("purchaseOrder")
    .trim()
    .notEmpty()
    .isLength({
      min: 5,
      max: 12,
    })
    .withMessage({
      message: "PurchaseOrder Invalid",
      errorCode: "invalidPurchaseOrder",
      status: "false",
    })
    .run(req);
  const errors = validationResult(req);
  const arrayErr = errors.array();

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "false",
      errorCode: arrayErr[arrayErr.length - 1].msg.errorCode,
      errorMessage: arrayErr[arrayErr.length - 1].msg.message,
      data: "invalid value",
    });
  }

  if (
    moment().year().toString().slice(2, 4) >
    req.body.cardExpiry.toString().slice(3, 5) ||
    Number(req.body.cardExpiry.toString().slice(0, 2)) > 12
  ) {
    return res.status(400).json({
      status: "false",
      message: "cardExpiry Invalid",
      errorCode: "invalidCardExpiry",
    });
  }

  if (
    moment().month() + 1 > Number(req.body.cardExpiry.toString().slice(0, 2)) &&
    moment().year().toString().slice(2, 4) >
    req.body.cardExpiry.toString().slice(3, 5)
  ) {
    return res.status(400).json({
      status: "false",
      message: "cardExpiry Invalid",
      errorCode: "invalidCardExpiry",
    });
  }
  next();
};

export const findTransactionValidator = async (req: Request, res: Response, next: NextFunction) => {
  await check("purchaseOrder")
    .trim()
    .notEmpty()
    .isLength({
      min: 5,
      max: 12,
    })
    .run(req);

  const errors = validationResult(req);
  const arrayErr = errors.array();

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "false",
      errorCode: "invalidPurchaseOrder",
      errorMessage: "PurchaseOrder is not valid",
      data: arrayErr[0].msg,
    });
  }
  next();
};

export const tokenValidator = async (req: Request, res: Response, next: NextFunction) => {
  await check("username")
    .trim()
    .notEmpty()
    .withMessage("username is required")
    .run(req);
  await check("password")
    .trim()
    .withMessage("password is required")
    .notEmpty()
    .run(req);

  await check("channel").notEmpty().run(req);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
