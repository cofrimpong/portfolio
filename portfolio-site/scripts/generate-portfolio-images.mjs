import fs from "fs";
import path from "path";
import process from "process";
import { fileURLToPath } from "url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(scriptDir, "..");
const outputDir = path.resolve(projectDir, "public", "generated");

function findEnvPath(startDir) {
  let currentDir = startDir;

  while (true) {
    const candidate = path.join(currentDir, ".env");
    if (fs.existsSync(candidate)) {
      return candidate;
    }

    const parentDir = path.dirname(currentDir);
    if (parentDir === currentDir) {
      return null;
    }

    currentDir = parentDir;
  }
}

function readApiKey() {
  if (process.env.OPENAI_API_KEY) {
    return process.env.OPENAI_API_KEY.trim();
  }

  const envPath = findEnvPath(projectDir);
  if (!envPath) {
    throw new Error("No .env file was found above the portfolio project.");
  }

  const envText = fs.readFileSync(envPath, "utf8");
  const apiLine = envText
    .split(/\r?\n/)
    .map((line) => line.replace(/^\uFEFF/, "").trim())
    .find((line) => line.startsWith("OPENAI_API_KEY="));

  if (!apiLine) {
    throw new Error("OPENAI_API_KEY is missing from the root .env file.");
  }

  const apiKey = apiLine.slice("OPENAI_API_KEY=".length).trim();
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is empty.");
  }

  return apiKey;
}

async function generateImage({ apiKey, prompt, fileName, size = "1024x1024" }) {
  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-image-1",
      prompt,
      size,
      quality: "high",
      background: "opaque",
      output_format: "png",
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Image generation failed for ${fileName}: ${response.status} ${errorText}`);
  }

  const payload = await response.json();
  const image = payload?.data?.[0]?.b64_json;
  if (!image) {
    throw new Error(`No image data returned for ${fileName}.`);
  }

  const outputPath = path.join(outputDir, fileName);
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(outputPath, Buffer.from(image, "base64"));
  return outputPath;
}

const prompts = [
  {
    fileName: "hero-portrait-board.png",
    prompt: [
      "Editorial portrait board for a personal portfolio homepage.",
      "Subject: a young dark-skinned woman of Ghanaian heritage with long braids, confident expression, black turtleneck, arms crossed.",
      "Layout: central portrait surrounded by smaller pinned photos, sketch cards, and pinned visual notes on an editorial board.",
      "Aesthetic: premium student portfolio, cinematic portrait photography, deep navy background, warm amber and parchment tones, design-school campaign board, realistic human face, high detail.",
      "Composition: clean border, portrait fills most of the frame, polished and believable, not cartoon, not illustration.",
      "Photo direction: one of the smaller portraits should show her smiling with a visible front tooth gap.",
      "Another separate portrait should clearly show her wearing a distinct Ghanaian necklace or chain, such as a gold pendant, Adinkra-inspired charm, or Ghana-map necklace that is visibly readable in the frame.",
      "Keep the subject consistent across all photos and preserve realistic facial features, natural skin texture, elegant editorial styling, and accessory visibility.",
      "Do not render any words, labels, letters, numbers, poster text, or typographic fragments anywhere in the image.",
    ].join(" "),
  },
  {
    fileName: "journey-newark-street.png",
    prompt: [
      "Cinematic realistic editorial photograph for a personal scrollytelling portfolio slide about being born in Newark.",
      "Show a Newark neighborhood street scene at golden hour with brick row houses, corner stores, sidewalks, traffic lights, buses or parked cars, and a grounded urban community feel.",
      "Keep the traffic light visible as a subtle compositional detail.",
      "Lighting: brighter golden-hour light, lifted exposure, clearer midtones, more visible street detail, still realistic and cinematic rather than washed out.",
      "Aesthetic: premium documentary photography, emotionally warm, serious, believable, not nostalgic fantasy, not illustration.",
      "No text, no logos, no watermarks, no signage with readable words.",
    ].join(" "),
  },
  {
    fileName: "journey-african-household.png",
    prompt: [
      "Realistic editorial lifestyle photograph for a portfolio slide about growing up in an African household.",
      "Show a warm family home interior with West African visual cues, a young Black girl at a dining table or in a living room, family presence suggested through hands, figures, or shared space, atmosphere of discipline, care, and expectation.",
      "Keep the little girl as a clear focal point in the composition.",
      "Lighting: brighter natural indoor light, more open shadows, warmer highlights, clearer facial visibility, realistic exposure, premium magazine photography.",
      "Aesthetic: cinematic, emotionally rich, realistic skin and fabric textures, premium magazine photography.",
      "No text, no logos, no watermarks, no readable letters anywhere.",
    ].join(" "),
  },
  {
    fileName: "journey-curiosity-service.png",
    prompt: [
      "Realistic editorial photograph for a portfolio slide about curiosity and the desire to give back.",
      "Show a young dark-skinned woman student in a library, classroom, or community setting, studying, sketching ideas, helping someone, or looking thoughtfully at a computer screen and notebook.",
      "The image should communicate curiosity, care, learning, and service rather than corporate tech branding.",
      "Aesthetic: cinematic student portraiture, natural light, realistic photography, believable environment, not illustration.",
      "No text, no logos, no watermarks, no readable interface words.",
    ].join(" "),
  },
  {
    fileName: "journey-ai-builder-studio.png",
    prompt: [
      "Realistic editorial photograph for a portfolio slide about becoming an AI builder.",
      "Show a young Black woman with long braids working in a focused studio or desk setup with a laptop, notes, design sketches, and multiple screens or materials that suggest AI product building, UX thinking, and system design.",
      "Aesthetic: premium creative-tech portrait, deep navy and warm amber tones, cinematic lighting, believable workspace, highly realistic human features.",
      "No sci-fi clichés, no holograms, no fantasy UI, no text, no logos, no watermarks.",
    ].join(" "),
  },
  {
    fileName: "case-study-hotline-board.png",
    prompt: [
      "Portfolio case study board for an AI orchestration learning project.",
      "Show a polished collage with realistic young professionals and students thinking about how to be a good AI orchestrator, discussing agent roles, reviewing prompt notes, and comparing vocabulary on cards, screens, and printouts.",
      "Include readable visual cues like concept cards, vocabulary notes, orchestration diagrams, notebook sketches, and laptop screens that suggest curiosity, learning, and careful system design.",
      "Aesthetic: editorial case study board, deep navy framing, warm indoor light, premium realistic photography, neatly arranged grid, serious but approachable.",
      "No logos, no watermarks, no hotline theme, no generic customer support visuals.",
    ].join(" "),
  },
  {
    fileName: "case-study-transit-board.png",
    prompt: [
      "Portfolio case study board for a university room reservation system.",
      "Show student staff workers from different ethnic backgrounds sitting at desktop computers in a university front-desk operations space.",
      "Wardrobe: matching red polo work shirts with clearly visible white collars, white sleeve trim, or white piping so they unmistakably read as red-and-white staff uniforms.",
      "Focus on the people first: four student workers visible, each at a desktop station, working side by side.",
      "Include realistic desktop monitors showing a room booking interface with reservation tables, room cards by floor, availability badges, booking time left, and student check-in workflow cues.",
      "Aesthetic: realistic photography, clean office lighting, internal operations product feel, believable front-desk environment, polished enough for a portfolio case study.",
      "The board should suggest that the system replaced a Google Sheets plus ID-swipe workflow and made reservations easier for staff to manage.",
      "No transit theme, no unrelated portraits, no logos, no watermarks.",
      "Do not render any words, labels, letters, numbers, posters, captions, or interface text outside of abstract unreadable UI shapes on the monitors.",
    ].join(" "),
  },
];

async function main() {
  const apiKey = readApiKey();
  const requestedFile = process.argv[2];
  const selectedPrompts = requestedFile
    ? prompts.filter((item) => item.fileName === requestedFile)
    : prompts;

  if (requestedFile && selectedPrompts.length === 0) {
    throw new Error(`No image prompt configured for ${requestedFile}.`);
  }

  for (const item of selectedPrompts) {
    const outputPath = await generateImage({ apiKey, ...item });
    console.log(`Generated ${path.basename(outputPath)}`);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});