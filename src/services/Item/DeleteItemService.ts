import { prismaCliente } from "../../prisma";

class DeleteItemService {
    async execute(id: string) {


            const verificarItem = await prismaCliente.pedido_Item.findUnique({
                where: {
                    id: id,         
                }

            });

            if (!verificarItem) {
                throw new Error("Produto nao encontrado");
            }

            await prismaCliente.pedido_Item.delete({
                where: {
                    id: id
                },


            })

            return { message: "Produto deletado com sucesso!" };



    }

}

export { DeleteItemService };