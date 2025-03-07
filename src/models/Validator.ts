import { Book } from "./Book";
import { FieldError } from "./FieldError";
import { Genre } from "./GenreEnum";
import { ValidationException } from "./ValidationException";

export class Validator {
  static validateBook(book: Book): void {}

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
    if (title.length < 3) {
      return new FieldError(
        "title",
        "Should be at least 3 characters in length"
      );
    }
    return null;
  }

  private static _getAuthorFieldError(author?: string): FieldError | null {
    if (typeof author !== "string") {
      // do nothing as author can be null
    } else {
      if (author.length < 3) {
        return new FieldError(
          "author",
          "Should be at least 3 characters in length"
        );
      }
    }
    return null;
  }

  private static _getGenreFieldError(genere: Genre[]): FieldError | null {
    return null;
  }

  private static _getPublishedYearError(
    publishedYear: number
  ): FieldError | null {
    let currentYear = new Date().getFullYear();
    if (publishedYear > currentYear) {
      return new FieldError(
        "publishedYear",
        "publishedYear cannot be greater than currentYear"
      );
    }
    return null;
  }
}
