import { db } from "./index";
import { essays, programRsvps, programs, reflections, verses } from "./schema";
import { essaysData, programsData, reflectionsData, versesData } from "./seed-data";

async function main() {
  console.log("Seeding as-sabuur.com …");

  await db.delete(programRsvps);
  await db.delete(programs);
  await db.delete(essays);
  await db.delete(reflections);
  await db.delete(verses);

  await db.insert(programs).values(programsData);
  await db.insert(essays).values(essaysData);
  await db.insert(reflections).values(reflectionsData);
  await db.insert(verses).values(versesData);

  console.log(
    `✓ ${programsData.length} programs, ${essaysData.length} essays, ${reflectionsData.length} reflections, ${versesData.length} verses`,
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
