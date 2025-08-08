// app/api/images/route.ts

const globalStore = globalThis as unknown as { imageStore?: string[] };

if (!globalStore.imageStore) globalStore.imageStore = [];

const imageStore = globalStore.imageStore;

export async function GET() {
  return new Response(JSON.stringify(imageStore), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function DELETE() {
  imageStore.length = 0;
  return new Response("Queue cleared", { status: 200 });
}

