import z from "zod";

const createCategorySchema = z.object({

    body: z.object({
        nome: z
            .string({ message: "Nome precisa ser um texto" })
            .min(3, { message: "Nome precisa de no mínimo 3 caracteres" })
            .max(300, { message: "Nome pode ter no máximo 300 caracteres" }),
    }), 
});

export { createCategorySchema };