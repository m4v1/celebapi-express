import APIResponse from '../apiRes';

class SuccessResponse extends APIResponse {
  format = (data, message, status) => {
    this.data = [];
    data.results.forEach(element => {
      this.data.push({
        link: element.link,
        title: element.title,
        thumb: element.thumbnails.high.url
      });
    });
    this.message = message;
    this.status = status;

    return this.generate();
  };
}

export default new SuccessResponse();
