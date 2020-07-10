# Migration `20200710122529-add-user-model`

This migration has been generated at 7/10/2020, 12:25:29 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "User" (
"email" TEXT NOT NULL,
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"name" TEXT NOT NULL,
"password" TEXT NOT NULL)

CREATE TABLE "new_Link" (
"createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
"description" TEXT NOT NULL,
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"postedById" INTEGER NOT NULL,
"url" TEXT NOT NULL,FOREIGN KEY ("postedById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE)

INSERT INTO "new_Link" ("createdAt", "description", "id", "url") SELECT "createdAt", "description", "id", "url" FROM "Link"

PRAGMA foreign_keys=off;
DROP TABLE "Link";;
PRAGMA foreign_keys=on

ALTER TABLE "new_Link" RENAME TO "Link";

CREATE UNIQUE INDEX "User.email" ON "User"("email")

PRAGMA foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200710122427-init..20200710122529-add-user-model
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "sqlite"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -14,5 +14,15 @@
   id                  Int @id @default(autoincrement())
   createdAt           DateTime @default(now())
   description         String
   url                 String
+  postedBy            User   @relation(fields: [postedById], references: [id])
+  postedById          Int
 }
+
+model User {
+  id                  Int @id @default(autoincrement())
+  name                String
+  email               String @unique
+  password            String
+  links               Link[]
+}
```


