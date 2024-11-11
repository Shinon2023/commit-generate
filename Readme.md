# Git Commit Message Generator with Ollama

## Overview
This is a Node.js script to automatically generate concise and meaningful commit messages using an AI model from
Ollama.

## Features

* **Automatic Git Staging**: Adds files in the working directory to the staging area before generating the diff.
* **AI-Powered Commit Message Generation**: Uses Ollama AI models to create concise commit messages based on
detected changes.
* **Customizable Model Selection**: Supports specifying different AI models as a command-line argument.

## Prerequisites

* Node.js and npm installed
* Git installed and initialized in your project
* Ollama CLI with access to required models (e.g., `llama3.1:8b`, `llama3.2-vision:90b`)

## Installation

Download the Ollama library first: https://ollama.com/
Run `npm install -g commit-generate-ollama` to install dependencies.

## Usage

To execute the script, use the following command:
```bash
commit-generate-ollama [--model_name]
```
* `--model_name`: Optional argument to specify the AI model from Ollama (e.g., `--llama3.1:8b` or
`--llama3.2-vision:90b`). If not provided, the default model `llama3.1:8b` will be used.

## Examples

### 1. Using the Default Model ( llama3.1:8b )
```bash
commit-generate-ollama
```

### 2. Using a Specific Model ( You can find more model in this https://ollama.com/library?sort=popular)
```bash
commit-generate-ollama --llama3.2-vision:90b
```

## How It Works

The script works as follows:

1. Fetches Git diff by staging all changes in the working directory and retrieving the diff from the Git
repository.
2. Prompts the AI model to generate a commit message, avoiding code or comments and focusing only on a summary.
3. Processes the AI output by calling the specified model from Ollama using a temporary file for input and outputs
the generated commit message to the console.
4. Stops the Ollama model after obtaining the response.

## Key Functions

* `getGitDiff`: Adds changes to staging and retrieves the Git diff.
* `callOllamaFromFile`: Uses `execSync` to call the Ollama model with a temporary file containing the prompt.
* `generateCommitMessage`: Main function to handle fetching the diff, generating the prompt, and outputting the AI
response.

## Troubleshooting

If you encounter errors with the Ollama model or Git, ensure that:

* The specified model name is valid and available in Ollama.
* You have made changes in the repository before running the script.