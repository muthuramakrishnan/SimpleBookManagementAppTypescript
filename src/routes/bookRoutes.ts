import express from "express";
import { BookController } from "../controllers/BookController";

const router = express.Router();

router.post("/", BookController.addBook);
router.get("/", BookController.getBooks);
router.get("/:id", BookController.getBook);

export default router;
