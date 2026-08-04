import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Migrate/introspect need a connection that supports advisory locks and
    // shadow-database creation, which Supabase's transaction-pooled
    // DATABASE_URL (PgBouncer, port 6543) does not. DIRECT_URL is the
    // session-mode connection (port 5432) used only for this. The app
    // runtime never reads this file — it connects with pooled DATABASE_URL
    // directly via @prisma/adapter-pg (see lib/prisma.ts).
    url: process.env.DIRECT_URL || process.env.DATABASE_URL,
  },
});
