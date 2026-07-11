export default class FormsPage {
  constructor(page) {
    this.page = page;
  }

  async getFrame() {
    const frame = await this.page.locator('iframe').first().contentFrame();

    if (!frame) {
      throw new Error('Form builder iframe was not available.');
    }

    return frame;
  }

  async dragSingleTextboxToCanvas() {
    const frame = await this.getFrame();
    await frame.getByRole('button', { name: ' Text Box' }).dragTo(frame.locator('.formcanvas__leftpane'));
  }

  async dragTextboxToCanvas() {
    await this.dragSingleTextboxToCanvas();
    await this.dragSingleTextboxToCanvas();
  }

  async addTwoTextboxes() {
    await this.dragTextboxToCanvas();
  }

  async selectTextbox(textboxIndex) {
    const frame = await this.getFrame();

    if (textboxIndex === 0) {
      await frame.locator('#textbox_editable-field_TextBox0').getByRole('textbox', { name: 'TextBox' }).click();
      return;
    }

    if (textboxIndex === 1) {
      await frame.locator('#textbox_editable-field_TextBox1').getByRole('textbox', { name: 'TextBox' }).click();
      return;
    }

    throw new Error(`Unsupported textbox index: ${textboxIndex}`);
  }

  async configureTextbox(properties, textboxIndex = 0) {
    const frame = await this.getFrame();

    await this.selectTextbox(textboxIndex);

    // Fill the textbox properties after selecting the textbox in the canvas.
    await this.fillTextboxProperty(frame.getByRole('textbox', { name: 'Element label' }), properties.label);
    await this.fillTextboxProperty(frame.getByRole('textbox', { name: 'Hint below field' }), properties.hint);
    await this.fillTextboxProperty(frame.locator('textarea[name="toolTip"]'), properties.tooltip);
    await this.fillTextboxProperty(frame.getByRole('textbox', { name: 'Default value' }), properties.defaultValue);
    await this.fillTextboxProperty(frame.getByRole('textbox', { name: 'Min' }), properties.minLength);
    await this.fillTextboxProperty(frame.getByRole('textbox', { name: 'Max' }), properties.maxLength);
  }

  async fillTextboxProperty(locator, value) {
    if (value === undefined || value === null) {
      return;
    }

    await locator.fill(String(value));
  }

//   async dragSecondTextbox() {
//     const frame = await this.getFrame();
//     await frame.getByRole('button', { name: ' Text Box' }).dragTo(frame.locator('.formcanvas__leftpane'), {
//       targetPosition: { x: 160, y: 260 },
//     });
//   }

  async saveForm() {
    const frame = await this.getFrame();
    await frame.getByRole('button', { name: 'save' }).click();
  }
}