# Phason

> Create meaningful, hilarious, poetic, or professional git commits... from your diffs.

Phason is a local LLM-powered CLI tool that turns your staged git diffs into beautiful commit messages in seconds.

Powered by [Ollama](https://ollama.com/) running LLaMA 3, works fully offline.  
Supports tones like `funny`, `pro`, `casual`, even `poetic`.  
Truncates huge diffs automatically to avoid melting your CPU.

---

## Installation

### 1. Install [Ollama](https://ollama.com/)
> Works on macOS, Windows, Linux. No GPU required (but it's faster with one).

```bash
# Download and install Ollama
https://ollama.com/download
```

### 2. Pull the model
We recommend [llama3:8b] for best balance of speed and quality:

```bash
ollama run llama3:8b
```

You only need to run this once — it will download and cache the model.

### 3. Install Phason

```bash
npm install -g phason
```

Or for local dev:

```bash
git clone https://github.com/your-username/phason
cd phason
npm install
npm link
```

---

## Usage

Generate a commit message from staged changes:

```bash
git add .
phason --tone pro
```

It will:
- Read your git diff
- Talk to LLaMA 3 running on your machine
- Suggest a commit message
- Ask you if you want to use it

---

## Tone Options

| Tone    | Description                        |
|---------|------------------------------------|
| pro     | Clean, concise, professional       |
| funny   | Sarcastic or witty                 |
| casual  | Like you're texting your teammate  |
| poetic  | Shakespeare meets GitHub           |

```bash
phason --tone funny
```

---


## Large Diff Support

By default, we:
- Truncate diffs to ~6000 characters (safe for most models)
- Remove blank lines and comments
- Only keep meaningful context

Use `--full` to disable truncation (may break on weaker machines):

```bash
phason --full --tone casual
```

---


## Built With

- Ollama + LLaMA 3 (`llama3:8b`)
- Node.js CLI
- Simple-git (for git magic)
- Humor (because devs deserve joy)

---

## Shoutout

This is for devs who are tired of writing:

```
fix: fixed stuff
```

Let the AI do it — with style.

---

## License

MIT — do whatever you want, just don't make it cringe.

---

## Contribute

Pull requests welcome. Or just yell at me on Twitter.
