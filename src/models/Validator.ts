import { Book } from "./Book";
import { FieldError } from "./FieldError";
import { Genre } from "./GenreEnum";
import { ValidationException } from "./ValidationException";

export class Validator {
  static validateBook(book: Book): void {
    let errors = [
      Validator._getTitleFieldError(book.title),
      Validator._getAuthorFieldError(book.author),
      Validator._getGenreFieldError(book.genre),
      Validator._getPublishedYearError(book.publishedYear),
    ].filter((error): error is FieldError => error !== null);
    if (errors.length > 0) {
      throw new ValidationException(errors);
    }
  }

  static validateTitle(title: string): void {
    let error = Validator._getTitleFieldError(title);
    if (error) {
      throw new ValidationException(error);
    }
  }

  static validateAuthor(author?: string): void {
    let error = Validator._getAuthorFieldError(author);
    if (error) {
      throw new ValidationException(error);
    }
  }

  static validateGenre(genere: Genre[]): void {
    let error = Validator._getGenreFieldError(genere);
    if (error) {
      throw new ValidationException(error);
    }
  }

  static validatePublishedYear(publishedYear: number): void {
    let error = Validator._getPublishedYearError(publishedYear);
    if (error) {
      throw new ValidationException(error);
    }
  }

  private static _getTitleFieldError(title: string): FieldError | null {
    let errorMsg = "";
    if (typeof title !== "string") {
      errorMsg = "Should be of string type";
    } else if (title.length < 3) {
      errorMsg = "Should be at least 3 characters in length";
    }

    if (errorMsg) {
      return new FieldError("title", errorMsg);
    }
    return null;
  }

  private static _getAuthorFieldError(author?: string): FieldError | null {
    let errorMsg = "";
    if (typeof author === undefined) {
      // do nothing
    } else if (typeof author !== "string") {
      errorMsg = "Should be of string type";
    } else {
      if (author.length < 3) {
        errorMsg = "Should be at least 3 characters in length";
      }
    }
    if (errorMsg) {
      return new FieldError("author", errorMsg);
    }
    return null;
  }

  private static _getGenreFieldError(genre: Genre[]): FieldError | null {
    let errorMsg = "";
    if (typeof genre === "undefined") {
      //do nothing
    } else if (!Array.isArray(genre)) {
      errorMsg = "Should be of array type";
    } else {
      for (const genreItem of genre) {
        if (!Object.values(Genre).includes(genreItem)) {
          errorMsg += `${genreItem} is not a valid genre \n`;
        }
      }
    }

    if (errorMsg) {
      return new FieldError("genre", errorMsg);
    }
    return null;
  }

  private static _getPublishedYearError(
    publishedYear: number | undefined
  ): FieldError | null {
    let currentYear = new Date().getFullYear();
    let errorMsg = "";
    if (typeof publishedYear === "undefined") {
      //do nothing
    } else if (typeof publishedYear !== "number") {
      errorMsg = "Should be of type number";
    } else if (publishedYear > currentYear) {
      errorMsg = "publishedYear cannot be greater than currentYear";
    }

    if (errorMsg) {
      return new FieldError("publishedYear", errorMsg);
    }
    return null;
  }
}
