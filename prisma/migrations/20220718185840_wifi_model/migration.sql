-- CreateTable
CREATE TABLE "Wifi" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "network" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Wifi_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Wifi" ADD CONSTRAINT "Wifi_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
