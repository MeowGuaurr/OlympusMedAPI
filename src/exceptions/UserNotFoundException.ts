import HttpException from "./HttpExceptions";

class UserNotFoundException extends HttpException {
  constructor(id: string){
    super(404, `USer ${id} not found`);
  }
}

export default UserNotFoundException;
