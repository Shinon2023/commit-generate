#!/usr/bin/env node

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getGitDiff } from "./git-func.js";
import { promptOllama } from "./prompt.js";

const callOllamaFromFile = (filePath, modelName) => {
  try {
    const result = execSync(`ollama run ${modelName} < ${filePath}`, {
      encoding: "utf-8",
    });
    return result.trim();
  } catch (error) {
    console.error("Error calling Ollama:", error.message);
    process.exit(1);
  }
};

export const generateOllamaCommitMessage = async (params) => {
  const modelName = params.modelName || "llama3.2";
  console.log("Fetching git diff...");
  const gitDiff = await getGitDiff();

  if (!gitDiff) {
    console.log(
      "No git diff found. Please make sure there are changes to commit."
    );
    process.exit(1);
  }

  const PromptToOllama = ` ${promptOllama} """${gitDiff}"""`;

  const __filename = fileURLToPath(import.meta.url);
  const libraryFolder = path.dirname(__filename);
  const tempFilePath = path.join(libraryFolder, "temp_prompt.txt");
  fs.writeFileSync(tempFilePath, PromptToOllama);

  console.log("Sending git diff to Ollama...");

  const aiResponse = callOllamaFromFile(tempFilePath, modelName);

  console.log(
    "Generated Git Commit Message:\n------------------------------\n",
    aiResponse
  );

  fs.unlinkSync(tempFilePath);

  execSync(`ollama stop ${modelName}`);
};
