import { prismaCliente } from "../../prisma";

interface finalziarProps {
    pedido_id: string,
}

class FinalizarPedidoService {
    async execute({ pedido_id }: finalziarProps) {

        //Verificacao se pedido existe
        const verificarPedido = await prismaCliente.pedido.findFirst({
            where: {
                id: pedido_id
            }
        });

        if (!verificarPedido) {
            throw new Error("ID do Pedido informado não existe!")   //se a categoria nao existe ele para a execucao com o throw
        }


        const pedido = await prismaCliente.pedido.update({
            where: {
                id: pedido_id,
            },
            data: {
                status: true
            },
            select: {
                id: true,
                mesa: true,
                cliente_nome: true,
                rascunho: true,
                status: true,
                createdAt: true,
            }
        })

        return pedido;

    }
}

export { FinalizarPedidoService };