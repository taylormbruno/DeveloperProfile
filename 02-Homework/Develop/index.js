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
       const userData = await inquirer.prompt([
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
        ]);
        const { username, color } = userData;
            console.log(color);
            console.log(username);
            const userColor = color;
            const queryUrl = `https://api.github.com/users/${username}`;
            await axios.get(queryUrl).then(function (response) {
                console.log(userColor);
                const userInfo = response.data;
                const filename = `${userInfo.login}.md`;
                const markdown = generateMD(userInfo, userColor);
                fs.writeFile(filename, markdown, (err) => {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("Complete!");
                });
            });
    } catch (err) {
        console.log(err);
    }
}

init();

function generateMD(userInfo, userColor) {
    console.log(userColor);
    return `# <span style="color:${userColor}">${userInfo.name}</span>   
<img src="${userInfo.avatar_url}" height="100px" alt="GitHubImg"> <br>  
Bio: ${userInfo.bio}   
Company: ${userInfo.company}   
Repo URL: ${userInfo.repos_url}   
Public Repos: ${userInfo.public_repos}   
Followers: ${userInfo.followers}   
Following: ${userInfo.following}   
Location: ${userInfo.location}`;
}