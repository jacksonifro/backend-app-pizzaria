import { prismaCliente } from "../../prisma";

class DetalhesItemService {
    async execute(id: string) {

        const verificarItem = await prismaCliente.pedido_Item.findFirst({
            where: {
                id: id,         //procurando o produto pelo id informado
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
        });

        if (!verificarItem) {
            throw new Error("Item nao encontrado");
        }

        return verificarItem;



    }
}

export { DetalhesItemService };