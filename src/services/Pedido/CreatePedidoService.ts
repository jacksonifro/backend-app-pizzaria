import { prismaCliente } from "../../prisma";

interface pedidoProps {
    mesa: string,
    cliente: string

}

class CreatePedidoService {
    async execute({mesa, cliente}: pedidoProps){

        const pedido = await prismaCliente.pedido.create({
            data: {
                mesa: parseInt(mesa),
                cliente_nome: cliente
            }
        })

        return pedido;

    }

}

export {CreatePedidoService};