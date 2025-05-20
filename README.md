# Ollama Demo

## Installation

First install [Ollama](https://ollama.com/download/linux). Ollama will be installed as a systemd
service. Make sure it runs.

## Pull the model

It is very large (64GB).

```bash
ollama pull llama4
```

## Test the model

```bash
ollama run llama4
```

Then type to chat with it. Use `/bye` to quit.

## Run the program

Make sure you have installed Deno.

```bash
deno task run
```

Example interaction:

```text
Press Ctrl+D (EOF) to exit.
Q: Hello.
>> Hello! It's nice to meet you. Is there something I can help you with, or would you like to chat?
Q: Can you list all files?
>> The list of files is:

* main.ts
* deno.jsonc
* main_test.ts
* README.md
* deno.lock
* .gitignore
Q: Summary README.md in one sentence.
>> The README.md file provides instructions on how to install and run the Ollama demo, including pulling a large model, testing it, and running the program using Deno.
```
