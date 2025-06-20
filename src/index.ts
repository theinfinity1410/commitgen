#!/usr/bin/env node
import { Command } from "commander";
import readline from "readline";
import { getStagedDiff, commitWithMessage } from "./git.js";
import { askOllama } from "./ollama.js";
import { buildPrompt } from "./prompt.js";
import { truncateDiff } from "./truncateDiff.js";

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const promptInput = (q: string) => new Promise<string>((res) => rl.question(q, res));

const program = new Command();
program.option("--tone <tone>", "Tone of the commit message", "pro").parse(process.argv);

(async () => {
  const tone = program.opts().tone;
  const rawDiff = await getStagedDiff();

  if (!rawDiff.trim()) {
    console.log("⚠️ No staged changes found. Please stage files with `git add` first.");
    process.exit(1);
  }

  const diff = truncateDiff(rawDiff, 6000);
  console.log(`📦 Diff trimmed to ${diff.length} characters, ${diff.split("\n").length} lines`);
  if (rawDiff.length > diff.length) {
    console.log("✂️ Diff was too large. Truncated for performance.");
  }

  const prompt = buildPrompt(diff, tone);

  console.log("🧠 Talking to Ollama...");
  try {
    const message = await askOllama(prompt);
    console.log(`\n💬 Suggested Commit Message:\n"${message}"\n`);

    const useIt = await promptInput("👉 Use this message for commit? (Y/n): ");
    if (useIt.toLowerCase() === "y" || useIt.trim() === "") {
      await commitWithMessage(message);
    } else {
      console.log("🛑 Commit canceled.");
    }
  } catch (err) {
    console.error("❌ Error:", err instanceof Error ? err.message : err);
  } finally {
    rl.close();
  }
})();
