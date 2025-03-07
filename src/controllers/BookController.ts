import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { Book } from "../models/Book";
import { ValidationException } from "../models/ValidationException";
import { Genre } from "../models/GenreEnum";
import { HTTP_STATUSES } from "../constants";
import logger from "../utilities/logger";

const FILE_PATH = path.join(__dirname, "../data/books.json"); // Adjust path

export class BookController {
  static addBook(req: Request, res: Response): void {
    const book = new Book({ ...req.body });

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

    res
      .status(HTTP_STATUSES.CREATED.code)
      .json({ message: HTTP_STATUSES.CREATED.message, data: book });
  }

  static getBooks(req: Request, res: Response): void {
    const data = JSON.parse(fs.readFileSync(FILE_PATH, "utf-8"));
    if (!Array.isArray(data)) {
      logger.error("Invalid data format in data.json");
    }
    let result = data
      .map((item: any) => {
        try {
          return new Book(item);
        } catch (error) {
          if (error instanceof ValidationException) {
            logger.error(error.name, error.errorObj);
          } else {
            throw error;
          }
          return null;
        }
      })
      .filter((item: Book | null) => item !== null) as Book[];

    res.status(HTTP_STATUSES.OK.code).json({
      message: HTTP_STATUSES.OK.message,
      data: result,
    });
  }

  static getBook(req: Request, res: Response): void {
    const id: string = req.params.id;

    const fileData = JSON.parse(fs.readFileSync(FILE_PATH, "utf-8"));
    if (!Array.isArray(fileData)) {
      logger.error("Invalid data format in data.json");
    }

    let foundBook: Book | null = null;
    for (const dataItem of fileData) {
      try {
        const book = new Book(dataItem);
        if (book.id === id) {
          foundBook = book;
          break;
        }
      } catch (error) {
        if (error instanceof ValidationException) {
          logger.error(error.name, error.errorObj);
        } else {
          throw error;
        }
      }
    }

    res.status(HTTP_STATUSES.OK.code).json({
      message: HTTP_STATUSES.OK.message,
      data: foundBook,
    });
  }
}
