import {fetchTopTenStories} from "./api/Fetch.ts";
import {printCountdown, printTopTenStories} from "./output/Print.ts";
import {promptForStorySelection} from "./input/Prompt.ts";
import open from "open";
import chalk from "chalk";
import {sleep} from "bun";

export function main() {
    fetchTopTenStories((stories) => {
        printTopTenStories(stories)
        promptForStorySelection(stories, async (story) => {
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
    })
}