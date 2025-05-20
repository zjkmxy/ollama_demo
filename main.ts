import { createOllama } from 'ollama-ai-provider';
import { generateText, jsonSchema, tool, type ToolSet } from 'ai';

export async function listFiles(): Promise<string[]> {
  return (await Array.fromAsync(Deno.readDir('.')))
    .filter((entry) => entry.isFile)
    .map((entry) => entry.name);
}

export async function readFiles(filePath: string): Promise<string> {
  try {
    return await Deno.readTextFile(filePath);
  } catch {
    return '';
  }
}

const tools: ToolSet = {
  listFiles: tool({
    description: 'List file paths from the knowledge base.',
    parameters: jsonSchema({
      type: 'object',
    }),
    execute: (): Promise<string[]> => listFiles(),
  }),
  readFiles: tool({
    description: 'Read a file from the knowledge base.',
    parameters: jsonSchema<{ filePath: string }>({
      type: 'object',
      properties: {
        filePath: {
          type: 'string',
          description: 'The path of the file to read',
        },
      },
      required: ['filePath'],
    }),
    execute: ({ filePath }): Promise<string> => readFiles(filePath),
  }),
};

async function main() {
  const ollama = createOllama({
    baseURL: 'http://localhost:11434/api', // Default URL
  });
  const model = ollama('llama4');

  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  console.log('Press Ctrl+D (EOF) to exit.');
  await Deno.stdout.write(encoder.encode('Q: '));
  for await (const chunk of Deno.stdin.readable) {
    const prompt = decoder.decode(chunk);
    try {
      // streamText seems not working with tools
      const result = await generateText({
        model,
        prompt,
        tools,
        maxSteps: 10,
      });
      console.log('>> ' + result.text);
    } catch (e) {
      console.log(e);
    }
    await Deno.stdout.write(encoder.encode('Q: '));
  }
}

if (import.meta.main) {
  await main();
}
