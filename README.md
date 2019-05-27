# testcafe-amazon-exercise

## Set up

1. clone repo
2. run the command `yarn install` or `yarn`
3. you can start running the tests

## Test Project structure

Project files are organized in following structure:

reports - json results from test runs
/screenshots - screenshots saved whenever a test fails
tests
/assets - test data
/pageObjects - representation of application objects as used by tests
/specs - test scripts

## Running tests

To execute the tests run the commands: `yarn test`

## Supported browsers

TestCafe can automatically detect popular browsers installed on the local computer. Tests are set to run on Chrome, if you would like to change browser you can do it in package.json, instead of:
`testcafe chrome tests/specs/*.ts`

add:
`testcafe firefox tests/specs/*.ts`

Supported browsers by TestCafe:
Google Chrome
Internet Explorer (11+)
Microsoft Edge
Mozilla Firefox
Safari

NOTE: You need to have browser installed on your pc!

## Reports & Screenshots

Each test takes a screenshot whenever a test fails. Screenshots are saved to the directory specified in the -s (--screenshots) option. Reports are saved in `reports` folder.

## More about TestCafe

A Node.js tool to automate end-to-end web testing. Documentation can be found here: `https://devexpress.github.io/testcafe/documentation/getting-started/`
