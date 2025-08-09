import chalk from "chalk";

export async function promptForStorySelection(stories: any[], cb: (story: any) => Promise<void>) {
    while (true) {
        const userInput = (await prompt( `   If you'd like to read more, make a selection ${chalk.green('(0-9)')}: `))?.trim() || 'exit'
        const index = parseInt(userInput)

        if (index in stories) {
            await cb(stories[index])
        } else if (userInput === 'exit') {
            return
        } else {
            console.log(chalk.red(`   Invalid input: ${userInput}\n`))
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