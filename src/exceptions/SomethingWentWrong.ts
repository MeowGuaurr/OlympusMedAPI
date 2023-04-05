import HttpException from './HttpExceptions';

class SomethingWentWrong extends HttpException {
  constructor() {
    super(401, 'Something went wrong, please check your data');
  }
}

export default SomethingWentWrong;
