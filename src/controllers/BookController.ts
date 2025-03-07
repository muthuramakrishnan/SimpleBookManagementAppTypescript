import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { Book } from "../models/Book";
import { ValidationException } from "../models/ValidationException";

const FILE_PATH = path.join(__dirname, "../data/books.json"); // Adjust path

export class BookController {
  static addBook(req: Request, res: Response): void {
    try {
      const book: Book = req.body; // Expecting a Book object from request

      // Read existing books
      let books: Book[] = [];
      if (fs.existsSync(FILE_PATH)) {
        const data = fs.readFileSync(FILE_PATH, "utf-8");
        books = JSON.parse(data);
      }

      // Add new book
      books.push(book);

      // Write updated books array to file
      fs.writeFileSync(FILE_PATH, JSON.stringify(books, null, 2), "utf-8");

      res.status(201).json({ message: "Book added successfully", book });
    } catch (error) {
      console.log(error);
      if (error instanceof ValidationException) {
        res
          .status(400)
          .json({ error: error.errorString, details: error.errorObj });
      }
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
