// // import { encode } from "gpt-tokenizer";

// // // constants
// // const TOKEN_LIMIT = 5900; // stay below Groq's 6000

// // function trimDiffToTokenLimit(diff: string): string {
// //   const lines = diff.split('\n');
// //   let trimmed = "";
// //   let tokenCount = 0;

// //   for (let line of lines) {
// //     const lineTokens = encode(line).length;
// //     if (tokenCount + lineTokens >= TOKEN_LIMIT) break;
// //     trimmed += line + '\n';
// //     tokenCount += lineTokens;
// //   }
  
// //   return trimmed;
// // }

// // export function buildPrompt(diff: string, tone: string): string {
// //     const cleanedDiff = diff
// //   .split('\n')
// //   .filter(line => line.startsWith('+') || line.startsWith('-'))
// //   .join('\n');
// //     const trimmedDiff = trimDiffToTokenLimit(cleanedDiff).trim();
// //     return `You are a commit wizard. Respond only with a commit message. Tone: ${tone}. Diff:\n${trimmedDiff}`;
// // }

// export function promptForChunk(diff: string, tone: string): string {
//   return `Generate a short ${tone} commit message for this code diff:\n\n${diff}`;
// }

// export function promptToMerge(messages: string[], tone: string): string {
//   return `These are partial commit messages from different chunks of a large git diff:\n\n${messages
//     .map((m, i) => `${i + 1}. ${m}`)
//     .join("\n")}\n\nMerge them into a single, high-quality ${tone} commit message.`;
// }

// export function promptToSummarize(diff: string): string {
//   return `Summarize the following git diff in a few bullet points:\n\n${diff}`;
// }

export function buildPrompt(diff: string, tone: string): string {
  return `
You are a helpful assistant that writes high-quality git commit messages.

The following is a code diff from 'git diff --staged'. Based on this, generate a one-line commit message in a ${tone} tone.

DO NOT explain anything. Just return the commit message. Don't use backticks, quotes, or markdown.

Here is the diff:
${diff}
`;
}
