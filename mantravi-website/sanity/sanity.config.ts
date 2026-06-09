import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";
import { sanityDataset, sanityProjectId } from "./env";

export default defineConfig({
  name: "mantravi",
  title: "Mantravi CMS",
  projectId: sanityProjectId,
  dataset: sanityDataset,
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
