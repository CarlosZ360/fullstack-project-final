// Seed data for the database in TS
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
 
async function main(): Promise<void> {
  await prisma.task.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      text: 'Tarea de ejemplo para pruebas',
      completed: false,
    },
  })
}
 
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e: unknown) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

