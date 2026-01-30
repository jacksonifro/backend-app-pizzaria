import { prismaCliente } from "../../prisma";

interface itemProps {
    pedido_id: string;
    produto_id: string;
    quantidade: number
}

class CreateItemService {
    async execute({ pedido_id, produto_id, quantidade }: itemProps) {

        //Verificacao se pedido existe
        const verificarPedido = await prismaCliente.pedido.findFirst({
            where: {
                id: pedido_id
            }
        });

        if (!verificarPedido) {
            throw new Error("ID do Pedido informado não existe!")   //se a categoria nao existe ele para a execucao com o throw
        }

        //Verificacao se produto existe
        const verificarProdudo = await prismaCliente.produto.findFirst({
            where: {
                id: produto_id
            }
        });

        if (!verificarProdudo) {
            throw new Error("ID do Pedido informado não existe!")   //se a categoria nao existe ele para a execucao com o throw
        }


        try {
            const item = await prismaCliente.pedido_Item.create({
                data: {
                    pedido_id: pedido_id,
                    produto_id: produto_id,
                    quantidade: quantidade
                },
                select: {
                    id: true,
                    quantidade: true,
                    pedido_id: true,
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

            })

            return item;  //retornando uma mensagem de sucesso do metodo execute

        } catch (error) {
            console.log(error);
            new Error("Erro ao inserir o item!")

        }
    }
}


export { CreateItemService };