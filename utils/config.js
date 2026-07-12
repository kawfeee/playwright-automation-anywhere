export const apiConfig = {
  // Base URLs and endpoints for Use Case 2
  baseURL: 'https://community.cloud.automationanywhere.digital',

  authenticationEndpoint: '/v2/authentication',
  learningInstanceEndpoint: '/cognitive/v3/learninginstances',

  username: process.env.PLAYWRIGHT_LOGIN_USERNAME ?? '',
  password: process.env.AA_PASSWORD_ENCRYPTED ?? '',
};
