import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL || ""; // Garantir que a variável de ambiente está definida
const adapter = new PrismaPg({ connectionString });  // Configura o adaptador com a string de conexão do banco de dados

const prismaCliente = new PrismaClient({ adapter }); // Inicializa o PrismaClient com o adaptador configurado

export { prismaCliente }; 