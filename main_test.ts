import { assertArrayIncludes, assertEquals } from '@std/assert';
import { listFiles, readFiles } from './main.ts';

Deno.test(async function listFilesTest() {
  assertArrayIncludes(await listFiles(), ['README.md']);
});

Deno.test(async function readFilesTest() {
  const content = await readFiles('README.md');
  assertEquals(content.split('\n', 2)[0], '# Ollama Demo');
});
