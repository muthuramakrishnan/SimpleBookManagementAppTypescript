import { FieldError } from "./FieldError";

export class ValidationException extends Error {
  errorObj: FieldError[] | FieldError;
  errorString: string;

  constructor(errorObj: FieldError[] | FieldError) {
    let errorMessage = "";

    let errorArray = Array.isArray(errorObj) ? errorObj : [errorObj];
    errorArray.forEach((error) => {
      errorMessage += `${error.field}: ${error.message}\n`;
    });
    super("Validation Failed");
    this.name = "ValidationException";
    this.errorString = errorMessage;
    this.errorObj = errorObj;
  }
}
