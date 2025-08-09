import chalk from "chalk"
import {sleep} from "./util.js";
import type {Story} from "./api.js";

type PrintOptions = {
    url?: boolean
}

export function printTopTenStories(topTenStories: Story[], {url = false}: PrintOptions = {}) {
    console.log(`\n   ${chalk.yellow(`${chalk.underline('HACKER NEWS')} ${chalk.dim('|')} Top 10 ${chalk.dim('|')} ${new Date().toLocaleDateString()}`)}\n\n${topTenStories.map((story, index) =>
        `    ${chalk.green(`${index}`)}${chalk.dim('.')} ${chalk.bold(story.title)}  ${chalk.dim(chalk.italic(`▲ ${story.score}`))}${url ? `\n       ${chalk.dim(`➤ ${chalk.italic(story.url)}`)}` : ''}`
    ).join('\n')}\n`)
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