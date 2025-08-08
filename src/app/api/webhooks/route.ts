// pages/api/webhook.ts

const globalStore = globalThis as unknown as {
  imageStore?: string[];
};

if (!globalStore.imageStore) {
  globalStore.imageStore = [];
}

const imageStore = globalStore.imageStore;

const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN || "";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (data?.entry) {
      for (const entry of data.entry) {
        for (const change of entry.changes || []) {
          for (const message of change.value?.messages || []) {
            if (message.type === "image") {
              const imageId = message.image.id;
              console.log("Received image ID:", imageId);

              const mediaUrlRes = await fetch(
                `https://graph.facebook.com/v20.0/${imageId}`,
                {
                  method: "GET",
                  headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                  },
                }
              );

              if (!mediaUrlRes.ok) {
                console.error("Failed to fetch media URL");
                continue;
              }

              const mediaUrlData = await mediaUrlRes.json();
              const mediaUrl = mediaUrlData.url;

              const imageRes = await fetch(mediaUrl, {
                headers: {
                  Authorization: `Bearer ${ACCESS_TOKEN}`,
                },
              });

              if (!imageRes.ok) {
                console.error("Failed to download image");
                continue;
              }

              const arrayBuffer = await imageRes.arrayBuffer();
              const base64 = Buffer.from(arrayBuffer).toString("base64");
              imageStore.push(base64);
              console.log("Image saved to store");
            }
          }
        }
      }
    }

    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("Webhook error:", err);
    return new Response("Bad Request", { status: 400 });
  }
}

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || "secret";

  if (mode === "subscribe" && token === VERIFY_TOKEN && challenge) {
    return new Response(challenge, { status: 200 });
  }

  return new Response("Unauthorized", { status: 403 });
}

export async function DELETE() {
  imageStore.length = 0;
  return new Response("Queue cleared", { status: 200 });
}
