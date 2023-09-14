import chalk from "chalk";

const message = `\n    If you'd like to read more, make a selection ${chalk.green('(0-9)')}: `
export function promptForStorySelection(stories: any[], cb: (story: any) => Promise<void>) {
    while (true) {
        const userInput = prompt(message)?.trim() || 'exit'
        const index = parseInt(userInput)

        if (index in stories) {
            cb(stories[index]).then(() => promptForStorySelection(stories, cb))
            return
        } else if (userInput === 'exit') {
            console.log(chalk.dim(`    Have a nice day!`))
            return
        } else {
            console.log(chalk.red(`    Invalid input: ${userInput}`))
        }
    }
}