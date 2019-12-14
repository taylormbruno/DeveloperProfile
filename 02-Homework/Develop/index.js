// list of questions to ask
const questions = ["What is your GitHub username?", "What is your favorite color?"];

// intialize
const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const generateHTML = require("./generateHTML")

// prompt user
function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            name: "username",
            message: questions[0]
        },
        {
            type: "input",
            name: "color",
            message: questions[1]
        }
    ]);
}

// write to file
function writeToFile(fileName, data) {
    console.log("Wrote to file.");
}

//
async function init() {
    try {
        const answer = promptUser();
        const html = generateHTML(answer);
        await writeToFile("index.html", html);
        console.log("Created HTML");
    } catch(err) {
        console.log(err);
    }
}

init();
