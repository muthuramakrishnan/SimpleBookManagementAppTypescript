import express from "express";
import { BookController } from "../controllers/BookController";

const router = express.Router();

router.post("/", BookController.addBook);

export default router;
