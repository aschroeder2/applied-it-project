# Applied It Project

## Overview
This is a sample API testing project created for an Applied IT Project for Northern Arizona University. The tests are written in Typescript using the Mocha test framework, SuperTest designed for testing HTTP, and Playwright designed for testing user interfaces.

## Language and Tools

This project requires installation of Node.js and yarn as the recommended package manager. Yarn can then be used to install the remaining dependencies.

#### Typescript
Describe what Typescript is.

#### Mocha
Overall test framework used to organize and run the test scripts.

#### Chai
Assertion library used to validate test results.

#### SuperTest
API test automation framework.

#### Playwright
UI test automation framework

## Set up
Complete the following steps in order to set up your local environment to be able to run the tests within this repository.
  
  1. Download and install Git
      * Git is a source control tool that will allow you to clone the responsitory on your local machine.
      * Download Git here: https://git-scm.com/downloads.
      * Once downloaded, open the installation wizard and follow the prompts.
  2. Download and install Node.js
      * Node.js is a JavaScript runtime that executes programs written in JavaScript or TypeScript.
      * Download Node.js here: https://nodejs.org/en/.
        * Download version 14, the LTS version, as the latest version 15 has not been tested with this project.
      * Once downloaded, open the installation wizard and follow the prompts.
  3. Install Yarn
      * Yarn is the dependency management tool used to install the remaining tools needed for the tests, such as Playwright and SuperTest.
      * Execute the following command to install yarn
        ```
        npm install -g yarn
        ```
  4. Clone the repository
      * Using Git Bash (which was installed with Git) or another terminal of your choice, cd to the directory where you want to store this repository
      * Execute the following command:
        ```
        git clone https://github.com/aschroeder2/applied-it-project.git
        ```
  5. Install the remaining tools required for the project
      * Still in the terminal, navigate to the applied-it-project directory created in the previous step
      * Use the yarn to install all of the repository's remaining dependencies
        ```
        yarn install
        ```
      
Your local environment should now be ready to execute the automated tests.
      

## Running the tests

#### How to run tests
Tests are executed via the command line using Node.js and npm. In order to execute tests, run the following command in the applied-it-project directory:
```
npm run test
```

#### How to run different sets of test cases
If you want to run all of the automated tests in the repository, you only need to follow the above instructions. If you would like to run a subset of tests, this is accomplished by using Mocha's exclusivity feature. Here is the documentation about this feature: https://mochajs.org/#exclusive-tests.
  * In order to run a suite of tests, add ".only" after the "describe" Mocha key word that contains the tests of interest.
  * In order to run a single test or a custom set of tests, add ".only" after the "it" Mocha keyword for the test(s) of interest.

## Test reports
This repository uses the mochawesome tool to create polished HTML reports that show the results of a test run. See the mochawesome tool details here: https://github.com/adamgruber/mochawesome. 

After you run the tests for the first time, you will see a "mochawesome-report" director appear under the applied-it-project directory. Review the test report by opening the mochawesome.html file contained within this directory in your browser.

The mochawesome.html file is updated each time the tests are run. To preserve a specific report, rename the file before executing the tests again. For example, you can append a date time to the end ofthe report name, such as mochawesome_202101041708.html.

