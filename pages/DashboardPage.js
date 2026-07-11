export default class DashboardPage {
  constructor(page) {
    this.page = page;
  }

  async clickAutomation() {
    await this.page.getByRole('link', { name: 'Automation', exact: true }).click();
  }

  async clickCreate() {
    await this.page.getByRole('button', { name: 'Create', description: 'Create' }).click();
  }

  async clickForms() {
    await this.page.getByRole('button', { name: ' Form…' }).click();
  }

  async clickCreateForm() {
    await this.page.getByRole('button', { name: 'Create & edit' }).click();
  }
}