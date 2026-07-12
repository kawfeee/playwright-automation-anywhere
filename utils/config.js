import 'dotenv/config';

export const apiConfig = {
  baseURL: 'https://community.cloud.automationanywhere.digital',

  authenticationEndpoint: '/v2/authentication',
  learningInstanceEndpoint: '/cognitive/v3/learninginstances',

  username: process.env.PLAYWRIGHT_LOGIN_USERNAME,
  password: process.env.AA_PASSWORD_ENCRYPTED,
};