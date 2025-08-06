import chalk from "chalk";

export async function promptForStorySelection(stories: any[], cb: (story: any) => Promise<void>) {
    while (true) {
        const userInput = (await prompt( `\n    If you'd like to read more, make a selection ${chalk.green('(0-9)')}: `))?.trim() || 'exit'
        const index = parseInt(userInput)

        if (index in stories) {
            cb(stories[index]).then(() => promptForStorySelection(stories, cb))
            return
        } else if (userInput === 'exit') {
            console.log(chalk.dim(`    Have a nice day!\n`))
            return
        } else {
            console.log(chalk.red(`    Invalid input: ${userInput}`))
        }
    }
}

async function prompt(message: string) {
    process.stdout.write(message)
    return new Promise<string>((resolve) => {
        process.stdin.once('data', (data) => {
            resolve(data.toString().trim())
        })
    })
}