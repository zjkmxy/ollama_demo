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
