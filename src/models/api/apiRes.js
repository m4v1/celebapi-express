/* eslint-disable lines-between-class-members */
class APIResponse {
  data = {};
  message = '';
  status = 0;

  generate() {
    return {
      data: this.data,
      message: this.message,
      status: this.status,
    };
  }
}

export default APIResponse;
