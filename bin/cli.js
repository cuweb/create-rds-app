#!/usr/bin/env node
const { execSync } = require('child_process')

const runCommand = (command) => {
    try {
        execSync(`${command}`, { stdio: 'inherit' })
    } catch (e) {
        console.error('Failed to execute ${command}', e)
        return false
    }
    return true
}

const repoName = process.argv[2]
const gitCheckoutCommand = `git clone --depth 1 https://github.com/cuweb/create-rds-app.git ${repoName}`
const cleaningCommand = `cd ${repoName} && npm install && rm yarn.lock && rm package-lock.json &&  rm -rf bin && rm -rf .git && rm -rf .github`

console.log(`Cloning the repository with name ${repoName}`)
const checkedOut = runCommand(gitCheckoutCommand)
if (!checkedOut) process.exit(-1)

console.log(`Cleaning ${repoName}`)
const installedDeps = runCommand(cleaningCommand)
if (!installedDeps) process.exit(-1)

console.log(
    'Congratulations! You are ready. Follow the following commands to start'
)
console.log(`cd ${repoName} && npm run dev`)
