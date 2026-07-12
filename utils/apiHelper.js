export class ApiHelper {
  constructor(request, config) {
    this.request = request;
    this.config = config;
  }

  async login() {
    const response = await this.request.post(
      `${this.config.baseURL}${this.config.authenticationEndpoint}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: {
          username: this.config.username,
          password: this.config.password,
          captcha: {},
        },
      }
    );

    const body = await response.json();

    console.log('Login Status:', response.status());
    console.log('Login Response:', body);

    return {
      token: body.token,
      response,
    };
  }

  async createLearningInstance(payload, token) {
    const response = await this.request.post(
      `${this.config.baseURL}${this.config.learningInstanceEndpoint}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-authorization': token,
        },
        data: payload,
      }
    );

    return response;
  }
}