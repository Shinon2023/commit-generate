#!/usr/bin/env node

import { execSync } from "child_process";
import simpleGit from "simple-git";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// สร้าง instance ของ simple-git
const git = simpleGit();

// ฟังก์ชันดึงข้อมูล git diff (ใช้ทั้ง --cached และ diff)
const getGitDiff = async () => {
  try {
    // เพิ่มไฟล์ทั้งหมดใน working directory ไปที่ staging area
    await git.add(".");

    const diff = await git.diff();
    if (!diff) {
      const diffStaged = await git.diff(["--cached"]);
      return diffStaged;
    }
    return diff;
  } catch (error) {
    console.error("Error getting git diff:", error.message);
    process.exit(1);
  }
};

// ฟังก์ชันเรียก Ollama โดยใช้ไฟล์ชั่วคราว
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

// ฟังก์ชันหลักที่ทำงานทั้งหมด
const generateCommitMessage = async () => {
  console.log("Fetching git diff...");
  const gitDiff = await getGitDiff();

  if (!gitDiff) {
    console.log(
      "No git diff found. Please make sure there are changes to commit."
    );
    process.exit(1);
  }

  // ตรวจสอบ argument สำหรับ model name
  const args = process.argv.slice(2);
  const modelName =
    args[0] && args[0].startsWith("--")
      ? args[0].slice(2) // เอา `--` ออกเพื่อใช้เป็น model name
      : "llama3.1:8b"; // โมเดลเริ่มต้น

  // สร้าง prompt ให้ AI ใช้ในการสร้าง Git commit message
  const prompt = `Write a summary of all code changes
  ***important don't give code to me and generate a concise git commit message based on the following code changes in my project. Focus on summarizing only the essential content, without providing code, comments, analysis, or suggestions. Avoid detailed explanations and return only the commit message.***
  
  this is info about my project changes
  """\n\n${gitDiff}"""`;

  const __filename = fileURLToPath(import.meta.url);
  const libraryFolder = path.dirname(__filename);
  const tempFilePath = path.join(libraryFolder, "temp_prompt.txt");
  fs.writeFileSync(tempFilePath, prompt);

  console.log("Sending git diff to Ollama...");

  // ส่งไฟล์ที่เก็บ git diff ไปให้ Ollama พร้อมกับ model name
  const aiResponse = callOllamaFromFile(tempFilePath, modelName);

  console.log(
    "Generated Git Commit Message:\n------------------------------\n",
    aiResponse
  );

  // ลบไฟล์ชั่วคราวหลังใช้งาน
  fs.unlinkSync(tempFilePath);

  execSync(`ollama stop ${modelName}`);
};

await generateCommitMessage();
