import APIResponse from './apiRes';

class SuccessResponse extends APIResponse {
  format = (data, message, status) => {
    this.data = {
      name: data.name,
      bday: data.bday,
      bplace: data.bplace,
      bio: data.bio,
    };
    this.message = message;
    this.status = status;

    return this.generate();
  }
}

export default new SuccessResponse();
