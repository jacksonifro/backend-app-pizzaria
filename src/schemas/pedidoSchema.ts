import { z } from "zod";

const createPedidoSchema = z.object({

    body: z.object({
        mesa: z
            .string({ message: "Mesa precisa ser numero no formato texto!" })
            .min(1, { message: "Mesa precisa de no mínimo 1 numero" })
            .max(3, { message: "Mesa precisa de no máximo 3 números" }),
        cliente_nome: z
            .string({ message: "Nome do cliente é obrigatorio!" })
            .min(1, { message: "Nome precisa de no mínimo 1 caracteres" })
    }),
});


const enviarPedidoSchema = z.object({
    body: z.object({
        pedido_id: z
            .string({ message: "ID do Pedio e obrigatorio!" })
            .min(1, { message: "ID precisa de no mínimo 1 letras e numeros" }),
        cliente: z
            .string({ message: "Nome do cliente é obrigatorio!" })
            .min(1, { message: "Nome precisa de no mínimo 1 caracteres" })
    }),
});


const finalizarPedidoSchema = z.object({
    body: z.object({
        pedido_id: z
            .string({ message: "ID do Pedio e obrigatorio!" })
            .min(1, { message: "ID precisa de no mínimo 1 letras e numeros" }),

    }),
});

export { createPedidoSchema, enviarPedidoSchema, finalizarPedidoSchema };