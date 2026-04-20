-- CreateTable
CREATE TABLE "task" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "task_pkey" PRIMARY KEY ("id")
);
