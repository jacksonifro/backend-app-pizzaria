import { z } from "zod";

const createUserSchema = z.object({

    body: z.object({
        nome: z
            .string({ message: "Nome precisa ser um texto" })
            .min(3, { message: "Nome precisa de no mínimo 3 caracteres" })
            .max(300, { message: "Nome pode ter no máximo 300 caracteres" }),
        email: z.email({ message: "Email inválido" }),
        senha: z
            .string()
            .min(6, { message: "Senha precisa de no mínimo 4 caracteres" })
            .max(8, { message: "Senha pode ter no máximo 8 caracteres" }),
    }),
});

const autenticateUserSchema = z.object({
    body: z.object({
        email: z.email({ message: "Email inválido" }),
        senha: z
            .string({ message: "Senha obrigatória" })
            .min(6, { message: "Senha precisa de no mínimo 4 caracteres" })
            .max(8, { message: "Senha pode ter no máximo 8 caracteres" }),
    }),
});



export { createUserSchema, autenticateUserSchema };