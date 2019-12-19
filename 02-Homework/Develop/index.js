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
        await inquirer.prompt([
            {
                type: "input",
                name: "username",
                message: "What is your GitHub username?"
            },
            {
                type: "input",
                name: "color",
                message: "What is your favorite color?"
            }
        ]).then( function(username, color) {
            console.log(color);
            console.log(username);
            const queryUrl = `https://api.github.com/users/${username}`;
            axios.get(queryUrl).then(function (data, color) {
                console.log(data);
                console.log(color);
                const filename = `${data.login}.md`;
                markdown = `<span style="color:${color}">${user.name}</span>
                <img src="${data.avatar_url}" height="100px" alt="GitHubImg"/>
                Bio: ${data.bio}
                Company: ${data.company}
                Repo URL: ${data.repos_url}
                Public Repos: ${data.public_repos}
                Followers: ${data.followers}
                Following: ${data.following}
                Location: ${data.location}`;
                fs.writeFile(filename, markdown, (err) => {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("Complete!");
                });
            });
        });
    } catch (err) {
        console.log(err);
    }
}

init();


// axios.get(queryUrl).then((data) => {
//     markdown = generateMD(data, color);
//     fs.writeFile(`${data.login}.md`, markdown, (err) => {
//         if (err) {
//             return reject(err);
//         }
//         console.log("Created Markdown");
//     });
// });

function generateMD(data, color) {
    markdown = `<span style="color:${color}">${user.name}</span>
    <img src="${data.avatar_url}" height="100px" alt="GitHubImg"/>
    Bio: ${data.bio}
    Company: ${data.company}
    Repo URL: ${data.repos_url}
    Public Repos: ${data.public_repos}
    Followers: ${data.followers}
    Following: ${data.following}
    Location: ${data.location}`;
}