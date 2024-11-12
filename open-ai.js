import OpenAI from "openai";
import { promptOpenai } from "./prompt.js";
import { getGitDiff } from "./git-func.js";

const openai = new OpenAI();

export const generateOpenAICommitMessage = async (params) => {
  const modelName = params.modelName || "gpt-4o-mini";

  const result = await openai.chat.completions.create({
    model: modelName,
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: `${promptOpenai} """${await getGitDiff()}"""`,
      },
    ],
  });

  console.log(result.choices[0].message.content);
};
