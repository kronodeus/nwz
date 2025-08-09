# NWZ
Browse the top stories from Hacker News right in your terminal.

<img width="823" height="384" alt="Screenshot 2025-08-09 at 2 42 17 AM" src="https://github.com/user-attachments/assets/ee964fbc-0d47-445a-ae44-e7bf7c9def01" />

## Installation
Install the package globally with NPM: `npm install -g @kronodeus/nwz`

> **Tip:** You can also use `pnpm`, `yarn`, or your package manager of choice.

## Usage
Invoke the CLI, passing any desired options: `nwz <options>`

> **Tip:** Try adding it to your shell profile to be greeted with your daily dose of tech news as soon as you open your terminal.

### CLI Options
- `--url` / `-u` : Display each story's URL, which are clickable in most modern terminals.
- `--no-prompt` / `-n` : The program will immediately exit after displaying stories, without prompting for a selection.

### Prompt Behavior
- To make a selection: enter the numeric index of any of the displayed stories. The URL will be displayed briefly before being automatically opened in your default browser.
- To exit: type "exit" or simply hit the enter key without typing anything. You can also kill the program with `Ctrl + C` on unix-like systems.
