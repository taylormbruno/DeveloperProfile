// list of questions to ask
const questions = ["What is your GitHub username?", "What is your favorite color?"];

// intialize
const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");
const markdown = require("markdown");


// try combining all functions to avoid prompt error. markdown in seperate function
async function init() {
    try {
        // prompt user for information
        inquirer.prompt([
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
        ]).then( (username, color) => {
            const queryUrl = `https://api.github.com/users/${ username }`;
            axios.get(queryUrl).then((data) => {
                markdown = generateMD(data, color);
                fs.writeFile(`${data.login}.md`, markdown, (err) => {
                    if (err) {
                        return reject(err);
                    }
                    console.log("Created Markdown");
                });
            });
        });
    } catch(err) {
        console.log(err);
    }
}

init();

function generateMD(data, color) {
    return `<span color="${color}">${user.name}</span>
                <img src="${data.avatar_url}" height:"100px">
                Bio: ${data.bio}
                Company: ${data.company}
                Repo URL: ${data.repos_url}
                Public Repos: ${data.public_repos}
                Followers: ${data.followers}
                Following: ${data.following}
                Location: ${data.location}`
}