import { prismaCliente } from "../../prisma";

interface deletarProps {
    pedido_id: string,
}

class DeletarPedidoService {
    async execute({pedido_id }: deletarProps) {

        //Verificacao se pedido existe
        const verificarPedido = await prismaCliente.pedido.findFirst({
            where: {
                id: pedido_id
            }
        });

        if (!verificarPedido) {
            throw new Error("ID do Pedido informado não existe!")   //se a categoria nao existe ele para a execucao com o throw
        }

        await prismaCliente.pedido.delete({
            where: {
                id: pedido_id,
            }
        })

        return { mensage: "Pedido Deletado com sucesso!" };

    }
}

export { DeletarPedidoService };