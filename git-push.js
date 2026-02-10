#!/usr/bin/env node
import { exec } from 'child_process';
import process, { stderr, stdout } from 'process';
// get commit message
const commitMessage = process.argv[2];
if (!commitMessage) {
    console.error('Error: Please provide a commit message');
    console.error('Usage: node git-auto.js "Your Commit message"');
    process.exit(1);
}
const runCommand = (command) => {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }
            resolve({ stdout, stderr });
        });
    });
};
const main = async () => {
    try {
        console.log('Adding all the changes');
        await runCommand('git add .');
        console.log(`Commiting with message: "${commitMessage}"`);
        await runCommand(`git commit -m "${commitMessage}"`);
        console.log('Pushing to remote...');
        await runCommand('git push');

        console.log('✅ Successfully pushed changes!');
    } catch (error) {
        console.error('Error: ', error.message);
    }
};
main();
