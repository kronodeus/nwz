export type Story = {
    url: string
    title: string
    score: number
}

export async function fetchTopTenStories(): Promise<Story[]> {
    const storyIds = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json').then((response) =>
        response.json()
    )
    if (!Array.isArray(storyIds)) {
        throw new Error(`Unexpected response from news source. Expected array, but received: ${display(storyIds)}`)
    }

    const stories: Story[] = []
    for (const storyId of storyIds.slice(0, 10) as unknown[]) {
        if (typeof storyId !== 'number') {
            throw new Error(`Invalid story ID from news source. Expected number, but received: ${display(storyId)}`)
        }

        const story = await fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`).then((response) =>
            response.json()
        )
        stories.push(validateStory(story))
    }

    return stories
}

function validateStory(story: unknown): Story {
    if (!story || typeof story !== 'object' || Array.isArray(story)) {
        throw new Error(`Invalid story from news source. Expected object, but received: ${display(story)}`)
    }

    const url = story['url'] ?? buildFallbackUrl(story['id'])
    if (typeof url !== 'string') {
        throw new Error(`Invalid story URL from news source. Expected string, but received: ${display(url)}`)
    }

    const title = story['title']
    if (typeof title !== 'string') {
        throw new Error(`Invalid story title from news source. Expected string, but received: ${display(title)}`)
    }

    const score = story['score']
    if (typeof score !== 'number') {
        throw new Error(`Invalid story score from news source. Expected number, but received: ${display(score)}`)
    }

    return { url, title, score }
}

function display(value: unknown) {
    return `${value} (${typeof value})`
}

/**
 * Some stories, like the "Ask HN" ones, are just discussions and therefore do not have any
 * external URL. In these cases, we can just build a link to the story on HN using the ID.
 */
function buildFallbackUrl(storyId: unknown) {
    if (typeof storyId !== 'number') {
        throw new Error(
            `Failed to build URL. Invalid story ID from news source. Expected number, but received: ${display(storyId)}`
        )
    }

    return `https://news.ycombinator.com/item?id=${storyId}`
}
