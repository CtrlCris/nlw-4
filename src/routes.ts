import { Router } from "express";
import { SendMailController } from "./controllers/SendMailController";
import { SurveysController } from "./controllers/SurveyController";
import { UserController } from "./controllers/UserController";

const router = Router();

const userController = new UserController();
const surveysController = new SurveysController();
const sendMailController = new SendMailController();

router.post("/users", userController.create);
router.post("/survey", surveysController.create);
router.get("/survey", surveysController.show);
router.post("/sendMail", sendMailController.execute);



export { router };