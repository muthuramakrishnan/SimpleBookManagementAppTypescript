import { nanoid } from "nanoid";
import { Genre } from "./GenreEnum";
import { Validator } from "./Validator";

declare const bookIdBrand: unique symbol;
type BookId = string & {
  [bookIdBrand]: true;
};

export class Book {
  private _id: BookId;
  private _title: string;
  private _author?: string;
  private _genre: Genre[];
  private _publishedYear: number;

  constructor(
    title: string,
    author?: string,
    genre?: Genre[],
    publishedYear?: number
  ) {
    this._id = nanoid<BookId>();
    this._title = title;
    this._author = author;
    this._genre = genre ? genre : [];
    this._publishedYear = publishedYear ? publishedYear : Number.MIN_VALUE;
    Validator.validateBook(this);
  }

  /**
   * Getter id
   * @return {BookId}
   */
  public get id(): BookId {
    return this._id;
  }

  /**
   * Getter title
   * @return {string}
   */
  public get title(): string {
    return this._title;
  }

  /**
   * Getter genre
   * @return {Genre[]}
   */
  public get genre(): Genre[] {
    return this._genre;
  }

  /**
   * Getter publishedYear
   * @return {number}
   */
  public get publishedYear(): number {
    return this._publishedYear;
  }

  /**
   * Setter title
   * @param {string} value
   */
  public set title(value: string) {
    Validator.validateTitle(value);
    this._title = value;
  }

  /**
   * Setter genre
   * @param {Genre[]} value
   */
  public set genre(value: Genre[]) {
    Validator.validateGenre(value);
    this._genre = value;
  }

  /**
   * Setter publishedYear
   * @param {number} value
   */
  public set publishedYear(value: number) {
    Validator.validatePublishedYear(value);
    this._publishedYear = value;
  }
}
