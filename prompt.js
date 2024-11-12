export const promptOllama = `Write a summary of all code changes 

***important don't give code snippets or any other example details to me and generate a concise git commit message based on the following code changes in my project.
Focus on summarizing only the essential content, without providing code, comments, analysis, or suggestions.
Avoid detailed explanations and return only the commit message.***

this is info about my project changes`;

export const promptOpenai = `Write a summary of all code changes 

***important generate a concise git commit message based on the following code changes in my project.
Focus on summarize the content in detail.
Avoid detailed explanations and return only the commit message.***

this is info about my project changes`;