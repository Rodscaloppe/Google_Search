const { I } = inject();
module.exports = {
  async main() {
    I.wait(10);
    I.amOnPage('/');
    I.fillField('~Search','Test');
    I.click('Google Search');
    I.wait(10);
  },
};