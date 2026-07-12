export class ApiHelper {
  constructor(request, config) {
    this.request = request;
    this.config = config;
  }

  getUrl(path) {
    if (!this.config?.baseURL) throw new Error('Missing apiConfig.baseURL');
    return `${this.config.baseURL}${path}`;
  }

  buildHeaders(token) {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (token) {
      // IMPORTANT: Use x-authorization, not Authorization: Bearer
      headers['x-authorization'] = token;
    }

    return headers;
  }

  async parseJson(response) {
    try {
      return await response.json();
    } catch {
      return {};
    }
  }

  async login() {
    const url = this.getUrl(this.config.authenticationEndpoint);

    const response = await this.request.post(url, {
      headers: this.buildHeaders(),
      data: {
        username: this.config.username,
        password: this.config.password,
        captcha: {},
      },
    });

    const responseBody = await this.parseJson(response);
    const token = responseBody?.token ?? responseBody?.access_token ?? responseBody?.data?.token ?? '';

    return {
      response,
      responseBody,
      token,
    };
  }

  async createLearningInstance(payload, token) {
    const url = this.getUrl(this.config.learningInstanceEndpoint);

    const response = await this.request.post(url, {
      headers: this.buildHeaders(token),
      data: payload,
    });

    const responseBody = await this.parseJson(response);

    return {
      response,
      responseBody,
    };
  }

  // TODO: Validate created Learning Instance using GET API after endpoint is identified.
}
