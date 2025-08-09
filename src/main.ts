import { fetchTopTenStories } from './api.js'
import { printCountdown, printTopTenStories } from './print.js'
import { promptForStorySelection } from './prompt.js'
import { sleep } from './util.js'
import open from 'open'
import chalk from 'chalk'

export async function main(args: string[]) {
    const url = args.includes('--url') || args.includes('-u')
    const prompt = !(args.includes('--no-prompt') || args.includes('-n'))
    const stories = await fetchTopTenStories()
    printTopTenStories(stories, { url })

    if (prompt) {
        await promptForStorySelection(stories, async (story) => {
            await printCountdown(3, (seconds) => {
                if (seconds > 0) {
                    return chalk.dim(`   Opening in ${seconds}: ${story.url}`)
                } else {
                    return chalk.dim(`   Opened: ${story.url}\n`)
                }
            })

            await open(story.url)
            await sleep(4000)
        })
    }

    console.log(chalk.dim(`   Have a nice day!\n`))
}
