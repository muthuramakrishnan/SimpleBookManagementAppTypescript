export class FieldError {
  private _field: string;
  private _message: string;

  constructor(field: string, message: string) {
    this._field = field;
    this._message = message;
  }

  /**
   * Getter field
   * @return {string}
   */
  public get field(): string {
    return this._field;
  }

  /**
   * Getter message
   * @return {string}
   */
  public get message(): string {
    return this._message;
  }
}
