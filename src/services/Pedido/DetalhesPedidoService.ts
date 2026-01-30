import { prismaCliente } from "../../prisma";

class DetalhesPedidoService {
    async execute(id: string) {

        const verficarID = await prismaCliente.pedido.findUnique({
            where: {
                id: id
            }
        });

        if (!verficarID) {
            throw new Error("O ID do Pedido informado não existe!")
        }

        const verificarPedido = await prismaCliente.pedido.findFirst({
            where: {
                id: id,         //procurando o produto pelo id informado
            },
            select: {
                id: true,
                mesa: true,
                cliente_nome: true,
                rascunho: true,
                status: true,
                createdAt: true,
                updatedAt: true,
                itens: {
                    select: {
                        id: true,
                        quantidade: true,
                        createdAt: true,
                        produto: {
                            select: {
                                id: true,
                                nome: true,
                                preco: true,
                                descricao: true,
                                categoria_id: true,
                                imagem: true,
                                createdAt: true
                            }
                        }
                    }
                }
            }
        });

        if (!verificarPedido) {
            throw new Error("Pedido nao encontrado");
        }

        return verificarPedido;



    }
}

export { DetalhesPedidoService };