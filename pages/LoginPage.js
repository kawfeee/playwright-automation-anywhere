export default class LoginPage {
  constructor(page) {
    this.page = page;
    this.url = 'https://community.cloud.automationanywhere.digital/#/login';
  }

  async open() {
    await this.page.goto(this.url, {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });
  }

  async fillEmail(email) {
    await this.page.getByRole('textbox', { name: 'Username' }).fill(email);
  }

  async fillPassword(password) {
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
  }

  async clickLogin() {
    await this.page.getByRole('button', { name: 'Log in' }).click();
  }

  async login(email, password) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLogin();
  }
}