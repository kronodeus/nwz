import chalk from "chalk"
import {sleep} from "./util.js";
import type {Story} from "./api.js";

type PrintOptions = {
    url?: boolean
}

export function printTopTenStories(topTenStories: Story[], {url = false}: PrintOptions = {}) {
    console.log(chalk.yellow(`    ${chalk.underline('HACKER NEWS')} ${chalk.dim('|')} Top 10 ${chalk.dim('|')} ${new Date().toLocaleDateString()}\n`))
    topTenStories.forEach((story, index) => {
        console.log(`    ${chalk.green(`${index}`)}${chalk.dim('.')} ${chalk.bold(story.title)}  ${chalk.dim(chalk.italic(`▲ ${story.score}`))}${url ? `\n       ${chalk.dim(`➤ ${chalk.italic(story.url)}`)}` : ''}`)
    })
}

export async function printCountdown(seconds: number, getMessage: (remaining: number) => string) {
    while (seconds > 0) {
        process.stdout.write(getMessage(seconds--))
        await sleep(1000)
        process.stdout.clearLine(0)
        process.stdout.cursorTo(0)
    }

    console.log(getMessage(seconds--))
}