import { prismaCliente } from "../../prisma";

interface enviarProps{
    cliente: string,
    pedido_id: string,
}

class EnviarPedidoService {
    async execute ({cliente, pedido_id}: enviarProps) {

        const pedido = await prismaCliente.pedido.update({
            where: {
                id: pedido_id,      
            },
            data: {
                cliente_nome: cliente,
                rascunho: false
            },
            select: {
                id: true,
                mesa: true,
                cliente_nome: true,
                rascunho: true,
                status_mesa: true,
                createdAt: true,
            }
        })

        return pedido;

    }
}

export {EnviarPedidoService};