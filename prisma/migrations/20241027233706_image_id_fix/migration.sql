/*
  Warnings:

  - You are about to drop the `_FileToRecipe` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `recipeId` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_FileToRecipe" DROP CONSTRAINT "_FileToRecipe_A_fkey";

-- DropForeignKey
ALTER TABLE "_FileToRecipe" DROP CONSTRAINT "_FileToRecipe_B_fkey";

-- AlterTable
ALTER TABLE "File" ADD COLUMN     "recipeId" INTEGER NOT NULL,
ADD COLUMN     "recipeid" INTEGER;

-- DropTable
DROP TABLE "_FileToRecipe";

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
