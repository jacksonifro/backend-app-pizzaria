import { z } from "zod";

export const createProductSchema  = z.object({
    body: z.object({
        nome: 
        z.string({message: "O nome do produto e obrigatorio"})
        .min(3, {message: "Produto precisa de no minimo 3 caracteres"}),

        preco:
        z.string({message: "O preco e obrigatorio"})
        .min(1, {message: "Preco com pelo menos 1 centavo"}),

        descricao: 
        z.string({message: "A descricao e obrigatorio"})
        .min(3, {message: "A descricao precisa de no minimo 3 caracteres"}),

        categoria_id: 
        z.string({message: "A categoria_id do produto e obrigatorio"})
        .min(3, {message: "ID categoria precisa de no minimo 3 caracteres"}),

    })
})

