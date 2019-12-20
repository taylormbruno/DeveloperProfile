// intialize
const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");
// const markdown = require("markdown");
const generateHTML = require("./generateHTML");
const HTML5ToPDF = require("../lib");
const path = require("path");


// try combining all functions to avoid prompt error. markdown in seperate function
async function init() {
    try {
        // prompt user for information
       const data = await inquirer.prompt([
            {
                type: "input",
                name: "username",
                message: "What is your GitHub username?"
            },
            {
                type: "list",
                name: "color",
                message: "What is your favorite color?",
                choices: [
                    "red",
                    "green",
                    "pink",
                    "blue"
                ]
            }
        ]);
        const { username, color } = data;
        console.log(data.color);
        const queryUrl = `https://api.github.com/users/${username}`;
        const queryUrl2 = `https://api.github.com/users/${username}/starred`;
        const response = await axios.get(queryUrl);
        const userInfo = response.data;
        // console.log(userInfo);
        const filename = `${userInfo.login}.html`;
        const gitStars = await axios.get(queryUrl2);
        const stars = gitStars.data[0].stargazers_count;
        const html = generateHTML(data, userInfo, stars);
        // const markdown = generateMD(userInfo, userColor);
        fs.writeFile(filename, html, (err) => {
            if (err) {
                return console.log(err);
            }
            console.log("HTML Complete!");
        });

    } catch (err) {
        console.log(err);
    }
}

init();

// function generateMD(userInfo, userColor) {
//     console.log(userColor);
//     return `# <span style="color:${userColor}">${userInfo.name}</span>   
// <img src="${userInfo.avatar_url}" height="100px" alt="GitHubImg"> <br>  
// Bio: ${userInfo.bio}   
// Company: ${userInfo.company}   
// Repo URL: ${userInfo.repos_url}   
// Public Repos: ${userInfo.public_repos}   
// Followers: ${userInfo.followers}   
// Following: ${userInfo.following}   
// Location: ${userInfo.location}`;
// }