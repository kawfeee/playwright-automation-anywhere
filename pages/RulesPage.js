export default class RulesPage {
  constructor(page) {
    this.page = page;
  }

  async getFrame() {
    const frame = await this.page.locator('iframe').first().contentFrame();

    if (!frame) {
      throw new Error('Rules builder iframe was not available.');
    }

    return frame;
  }

  async clickRulesTab() {
    const frame = await this.getFrame();
    await frame.getByRole('tab', { name: '[object Object]' }).click();
  }

  async clickAddRule() {
    const frame = await this.getFrame();
    await frame.getByRole('button', { name: 'Add rule' }).click();
  }

  async createRule() {
    await this.clickRulesTab();
    await this.clickAddRule();

    const frame = await this.getFrame();

    await this.selectIfElement(frame, 'Primary Customer Name - TextBox0');
    await this.selectIfCondition(frame, 'Is not empty');

    await this.selectThenElement(frame, 'Secondary Contact Name - TextBox1');
    await this.selectThenAction(frame, 'Set value');
    await this.fillThenValue(frame, 'Jane Doe');
  }

  async selectIfElement(frame, elementText) {
    await frame.locator('.rio-focus.rio-focus--inset_1px.rio-focus--border-radius_2px.rio-select-input-query').first().click();

    if (elementText === 'Primary Customer Name - TextBox0') {
      await frame.locator('div').filter({ hasText: /^Primary Customer Name - TextBox0$/ }).nth(1).click();
      return;
    }

    if (elementText === 'Secondary Contact Name - TextBox1') {
      await frame.locator('div').filter({ hasText: /^Secondary Contact Name - TextBox1$/ }).nth(1).click();
      return;
    }

    throw new Error(`Unsupported IF element: ${elementText}`);
  }

  async selectIfCondition(frame, conditionText) {
    if (conditionText === 'Is not empty') {
      await frame.locator('.gridlayout-content > .gridlayout > .gridlayout-row > .gridlayout-column > .gridlayout-content > .rio-select-input > div > .rio-focus.rio-focus--inset_1px').first().click();
      await frame.locator('div').filter({ hasText: /^Is not empty$/ }).nth(1).click();
      return;
    }

    throw new Error(`Unsupported IF condition: ${conditionText}`);
  }

  async selectThenElement(frame, elementText) {
    await frame.locator('.rio-select-input.g-box-sizing_border-box.rio-select-input--mode_multi > div > .rio-focus.rio-focus--inset_1px').click();

    if (elementText === 'Secondary Contact Name - TextBox1') {
      await frame.locator('label').filter({ hasText: 'Secondary Contact Name -' }).click();
      await frame.locator('.rio-focus.rio-focus--inset_0.rio-focus--border-radius_4px.rio-focus--has_element-focus-visible.rio-bare-button.g-reset-element.rio-bare-button--is_interactive.rio-bare-button--rio_interactive-softest.rio-bare-button--is_parent.rio-bare-button--is_clickable.rio-bare-button--is_selected').click();
      return;
    }


    throw new Error(`Unsupported THEN element: ${elementText}`);
  }

  async selectThenAction(frame, actionName) {
    await frame.locator('div:nth-child(2) > .gridlayout-column > .gridlayout-content > .rio-select-input > div > .rio-focus.rio-focus--inset_1px').click();

    if (actionName === 'Set value') {
      await frame.locator('div').filter({ hasText: /^Set value$/ }).nth(1).click();
      return;
    }

    throw new Error(`Unsupported THEN action: ${actionName}`);
  }

  async fillThenValue(frame, value) {
    await frame.getByRole('textbox', { name: 'Enter value' }).fill(String(value));
    await frame.getByRole('button', { name: 'save' }).click();
  }
}