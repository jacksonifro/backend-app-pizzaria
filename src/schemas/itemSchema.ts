import { z } from "zod";

const createItemSchema = z.object({

    body: z.object({
        pedido_id: z
            .string({ message: "ID do Pedio e obrigatorio!" })
            .min(1, { message: "ID precisa de no mínimo 1 letras e numeros" }),
        produto_id: z
            .string({ message: "Id do Produto é obrigatorio!" })
            .min(1, { message: "ID precisa de no mínimo 1 letras e numeros" }),

        quantidade: z
            .number({ message: "Quantidade é obrigatorio!" })
            .int({ message: "Quantidade precisa de no minimo 1 numero" })
            .positive("Quantidade de ser um numero positivo!")
    }),
});

export { createItemSchema };