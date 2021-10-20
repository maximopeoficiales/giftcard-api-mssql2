import { Express } from "express";
import { expressLoader } from "./express";


export const init = async (app: Express) => {
  await expressLoader(app);
  console.log("Express load")
};

