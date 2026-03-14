import { RO } from "../lib/ro";

async function main() {
  try {
    const ro = RO();
    await ro.build();
    process.exit(0);
  } catch (e) {
    console.error("ro.build: failed", e);
    process.exit(1);
  }
}

main();
