-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_recipeId_fkey";

-- AlterTable
ALTER TABLE "File" ADD COLUMN     "instructionId" INTEGER;

-- CreateTable
CREATE TABLE "_FileToRecipe" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FileToRecipe_AB_unique" ON "_FileToRecipe"("A", "B");

-- CreateIndex
CREATE INDEX "_FileToRecipe_B_index" ON "_FileToRecipe"("B");

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_instructionId_fkey" FOREIGN KEY ("instructionId") REFERENCES "Instruction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FileToRecipe" ADD CONSTRAINT "_FileToRecipe_A_fkey" FOREIGN KEY ("A") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FileToRecipe" ADD CONSTRAINT "_FileToRecipe_B_fkey" FOREIGN KEY ("B") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
