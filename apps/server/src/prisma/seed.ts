import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      name: 'Alice',
      email: 'alice@prisma.io',
     tasks: {
        create: {
          title: 'Check out Prisma with Next.js',
          description: 'https://www.prisma.io/nextjs',

        },
      },
    },
  })
  const bob = await prisma.user.upsert({
    where: { email: 'bob@prisma.io', },
    update: {},
    create: {
      name: 'Bob',
      email: 'bob@prisma.io',
      tasks: {
        create: [
          {
            title: 'Follow Prisma on Twitter',
            description: 'https://twitter.com/prisma',
          },
          {
            title: 'Follow Nexus on Twitter',
            description: 'https://twitter.com/nexusgql',
          },
        ],
      },
    },
  })
  console.log({ alice, bob })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })