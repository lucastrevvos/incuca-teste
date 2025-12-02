import bcrypt from "bcryptjs";
import { prisma } from "./db/prisma";

async function main() {
  const email = "cliente@incuca.com.br";

  const plainPassword =
    "seumamesapossuirtrespernaschamadasqualidadeprecobaixoevelocidadeelaseriacapenga.";

  const hashed = await bcrypt.hash(plainPassword, 10);

  const existing = await prisma.user.findUnique({ where: { email } });

  if (!existing) {
    await prisma.user.create({
      data: {
        email,
        password: hashed,
      },
    });
    console.log("Usuario padrão criado");
  } else {
    console.log("Usuario padrão já existe");
  }
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
