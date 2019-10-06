import APIResponse from './apiRes';

class ErrorResponse extends APIResponse {
  format = (data, message, status) => {
    this.data = data;
    this.message = message;
    this.status = status;

    return this.generate();
  }
}

export default new ErrorResponse();
