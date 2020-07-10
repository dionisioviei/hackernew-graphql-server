# Migration `20200710152853-add-vote-model`

This migration has been generated at 7/10/2020, 3:28:53 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "Vote" (
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"linkId" INTEGER NOT NULL,
"userId" INTEGER NOT NULL,FOREIGN KEY ("linkId") REFERENCES "Link"("id") ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE)

CREATE UNIQUE INDEX "Vote.linkId_userId" ON "Vote"("linkId","userId")

PRAGMA foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200710122529-add-user-model..20200710152853-add-vote-model
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
@@ -16,8 +16,9 @@
   description         String
   url                 String
   postedBy            User   @relation(fields: [postedById], references: [id])
   postedById          Int
+  votes               Vote[]
 }
 model User {
   id                  Int @id @default(autoincrement())
@@ -25,4 +26,14 @@
   email               String @unique
   password            String
   links               Link[]
 }
+
+model Vote {
+  id                  Int @id @default(autoincrement())
+  link                Link @relation(fields: [linkId], references: [id])
+  linkId              Int
+  user                User @relation(fields: [userId], references: [id])
+  userId              Int
+
+  @@unique([linkId, userId])
+}
```


