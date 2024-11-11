# Git Commit Message Generator with Ollama

## Overview
This is a Node.js script to automatically generate concise and meaningful commit messages using an AI model from
Ollama.

## Features

- **Automatic Git Staging**: Automatically adds files in the working directory to the staging area before
generating the diff.
- **AI-Powered Commit Message Generation**: Uses Ollama AI models to create concise commit messages based on the
detected changes.
- **Customizable Model Selection**: Supports specifying different AI models as a command-line argument.

## Prerequisites

- **Node.js** and **npm** installed
- **Git** installed and initialized in your project
- **Ollama** CLI with access to the required models (e.g., `llama3.1:8b`, `llama3.2-vision:90b`, etc.)

## Installation

1. Clone or download this repository.
2. Navigate to the project folder.
3. Run `npm install` to install the dependencies.

## Usage

### Run the Script

To execute the script, use the following command:

```bash
commit-generate-ollama [--model_name]
```

* `--model_name`: Optional argument to specify the AI model from Ollama (e.g., `--llama3.1:8b` or
`--llama3.2-vision:90b`). If not provided, the default model `llama3.1:8b` will be used.

### Examples

#### 1. Using the Default Model

```bash
commit-generate-ollama
```

#### 2. Using a Specific Model

```bash
commit-generate-ollama --llama3.2-vision:90b
```

## How It Works

The script works as follows:

1. **Fetches Git Diff**: The script first runs `git add .` to stage all changes in the working directory and then
retrieves the diff from the Git repository.
2. **Prompts the AI Model**: It prepares a prompt to instruct the AI model to generate a commit message, avoiding
code or comments and focusing only on a summary.
3. **Processes the AI Output**: The script calls the specified model from Ollama using a temporary file for input
and outputs the generated commit message to the console.
4. **Stops the Ollama Model**: After obtaining the response, the script stops the specified Ollama model.

## Key Functions

* `getGitDiff`: Adds changes to staging and retrieves the Git diff.
* `callOllamaFromFile`: Uses `execSync` to call the Ollama model with a temporary file containing the prompt.
* `generateCommitMessage`: Main function to handle fetching the diff, generating the prompt, and outputting the AI
response.

## Troubleshooting

If you encounter errors with the Ollama model or Git, ensure that:

* The specified model name is valid and available in Ollama.
* You have made changes in the repository before running the script.

## License
This project is licensed under the MIT License.
```