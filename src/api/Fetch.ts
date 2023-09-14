export function fetchTopTenStories(cb: (topTenStories: any[]) => void) {
    fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
        .then(response => response.json())
        .then(topStories => {
            const topTenStories = topStories.slice(0, 10)
            return Promise.all(topTenStories.map(async (storyId: string) => {
                const url = `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`
                return fetch(url)
                    .then(response => response.json())
                    .catch(error => console.error('Error fetching story:', error));
            }));
        })
        .then(cb)
        .catch(error => console.error('Error fetching top stories:', error));
}
