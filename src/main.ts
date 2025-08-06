import {fetchTopTenStories} from "./api.js";
import {printCountdown, printTopTenStories} from "./print.js";
import {promptForStorySelection} from "./prompt.js";
import {sleep} from "./util.js";
import open from "open";
import chalk from "chalk";

export async function main() {
    const stories = await fetchTopTenStories()
    printTopTenStories(stories)
    await promptForStorySelection(stories, async (story) => {
        await printCountdown(3, (seconds) => {
            if (seconds > 0) {
                return chalk.dim(`    Opening in ${seconds}: ${story.url}`)
            } else {
                return chalk.dim(`    Opened: ${story.url}`)
            }
        })

        await open(story.url)
        await sleep(4000)
    })
}