import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

const dataDirectoryPath = path.join(process.cwd(), "src", "data");
const dataFilePath = path.join(dataDirectoryPath, "apiKeys.json");

function generateMockKeyValue(prefix) {
  const random = crypto.randomBytes(18).toString("hex");
  return `${prefix}_${random}`;
}

function generateSeedApiKeys() {
  const nowIso = new Date().toISOString();
  return [
    {
      id: crypto.randomUUID(),
      name: "Production Key",
      value: generateMockKeyValue("prod"),
      createdAt: nowIso,
      updatedAt: nowIso,
    },
    {
      id: crypto.randomUUID(),
      name: "Staging Key",
      value: generateMockKeyValue("stg"),
      createdAt: nowIso,
      updatedAt: nowIso,
    },
    {
      id: crypto.randomUUID(),
      name: "Local Dev Key",
      value: generateMockKeyValue("dev"),
      createdAt: nowIso,
      updatedAt: nowIso,
    },
  ];
}

async function ensureDataFileExists() {
  try {
    await fs.mkdir(dataDirectoryPath, { recursive: true });
    await fs.access(dataFilePath);
  } catch {
    const seeds = generateSeedApiKeys();
    await fs.writeFile(dataFilePath, JSON.stringify(seeds, null, 2), "utf-8");
  }
}

async function readAllApiKeys() {
  await ensureDataFileExists();
  const fileContents = await fs.readFile(dataFilePath, "utf-8");
  try {
    const parsed = JSON.parse(fileContents);
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    const seeds = generateSeedApiKeys();
    await writeAllApiKeys(seeds);
    return seeds;
  } catch {
    const seeds = generateSeedApiKeys();
    await writeAllApiKeys(seeds);
    return seeds;
  }
}

async function writeAllApiKeys(apiKeys) {
  await ensureDataFileExists();
  await fs.writeFile(dataFilePath, JSON.stringify(apiKeys, null, 2), "utf-8");
}

export async function getAllApiKeys() {
  return readAllApiKeys();
}

export async function getApiKeyById(apiKeyId) {
  const all = await readAllApiKeys();
  return all.find((k) => k.id === apiKeyId) || null;
}

export async function createApiKey({ name, value }) {
  const all = await readAllApiKeys();
  const nowIso = new Date().toISOString();
  const newKey = {
    id: crypto.randomUUID(),
    name,
    value,
    createdAt: nowIso,
    updatedAt: nowIso,
  };
  all.push(newKey);
  await writeAllApiKeys(all);
  return newKey;
}

export async function updateApiKey(apiKeyId, { name, value }) {
  const all = await readAllApiKeys();
  const index = all.findIndex((k) => k.id === apiKeyId);
  if (index === -1) return null;
  const existing = all[index];
  const updated = {
    ...existing,
    name: typeof name === "string" ? name : existing.name,
    value: typeof value === "string" ? value : existing.value,
    updatedAt: new Date().toISOString(),
  };
  all[index] = updated;
  await writeAllApiKeys(all);
  return updated;
}

export async function deleteApiKey(apiKeyId) {
  const all = await readAllApiKeys();
  const next = all.filter((k) => k.id !== apiKeyId);
  if (next.length === all.length) return false;
  await writeAllApiKeys(next);
  return true;
}


