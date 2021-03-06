const { setHeadlessWhen } = require('@codeceptjs/configure');
const path = require('path')
// turn on headless mode when running with HEADLESS=true environment variable
// HEADLESS=true npx codecept run
setHeadlessWhen(process.env.HEADLESS);
// global.
downloadDir = path.join(__dirname, 'downloads'); //use global.varName if you want to use it globally
OUTPUT_DIR = path.join(__dirname,'allure-report');
exports.config = {
  tests: './test/*_test.js',
  output: './output',
  helpers: {
    FileSystem:{},
    WebDriver: {
      windowSize: "maximize",
      url: 'https://www.google.com/',
      browser: 'chrome',
      desiredCapabilities: {
        chromeOptions: {
          args: [ "--headless", "--disable-gpu", "--no-sandbox" ],
          prefs: {
            profile: {
              content_settings: {
                exceptions: {
                  automatic_downloads:{
                    "*": {
                      setting:1,
                    },
                  }
                },
              },
            },
            download: {
              default_directory: downloadDir,
            }
          }
        },
      },
    }
  },
  include: {
    I: './steps_file.js',
    loginpage: './pages/login.js',
  },
  bootstrap: null,
  mocha: {},
  name: 'demo',
  plugins: {
    wdio: {
      enabled: true,
      services: ['selenium-standalone']
    },
    allure: {
      enabled: true,
    },
    retryFailedStep: {
      enabled: true
    },
    screenshotOnFail: {
      enabled: true
    }
  }
}
