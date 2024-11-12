#!/usr/bin/env node

import { program } from 'commander';
import { generateOllamaCommitMessage } from "./ollama-ai.js";
import { generateOpenAICommitMessage } from "./open-ai.js";

program
  .name('commit-generator')
  .description('Generate commit messages using AI models')
  .option('-d, --debug', 'output extra debugging')
  .option('-p, --provider <provider>', 'set AI provider (ollama or openai)', 'ollama')
  .option('-m, --model <model>', 'set model name')
  .parse(process.argv); // ประมวลผลคำสั่งที่ได้รับ

const options = program.opts();

// การแสดงผล debug หากตัวเลือก debug ถูกเปิดใช้งาน
if (options.debug) {
  console.log(options);
}

// กำหนด AI provider
const aiProvider = options.provider;

// กำหนด model ตามที่ผู้ใช้ป้อน
let modelName = options.model;

// เลือกคำสั่งที่ใช้งานตาม AI provider
if (aiProvider === 'ollama' || aiProvider === null) {
  await generateOllamaCommitMessage({ modelName: modelName });
} else {
  await generateOpenAICommitMessage({ modelName: modelName });
}
