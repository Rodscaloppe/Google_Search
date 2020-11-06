const { setHeadlessWhen } = require('@codeceptjs/configure');
const path = require('path')
// turn on headless mode when running with HEADLESS=true environment variable
// HEADLESS=true npx codecept run
setHeadlessWhen(process.env.HEADLESS);
// global.
downloadDir = path.join(__dirname, 'downloads'); //use global.varName if you want to use it globally
exports.config = {
  tests: './test/*_test.js',
  output: './output',
  helpers: {
    FileSystem:{},
    WebDriver: {
      windowSize: "maximize",
      url: 'https://www.google.com/',
      browser: 'firefox',
      desiredCapabilities: {
        chromeOptions: {
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
      enabled: true
    },
    retryFailedStep: {
      enabled: true
    },
    screenshotOnFail: {
      enabled: true
    }
  }
}