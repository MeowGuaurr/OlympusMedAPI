import HttpException from "./HttpExceptions";

class EmailAlreadyExistsException extends HttpException {
  constructor(email: String) {
    super(400,  `${email} already exists`);
  }
}

export default EmailAlreadyExistsException;
