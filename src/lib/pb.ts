import PocketBase from "pocketbase"

const pb = new PocketBase(Bun.env.PB_URL);

pb.autoCancellation(false);

await pb.collection('_superusers').authWithPassword(Bun.env.PB_USER || "", Bun.env.PB_PASS || "", {
  autoRefreshThreshold: 30 * 60
})

export default pb;