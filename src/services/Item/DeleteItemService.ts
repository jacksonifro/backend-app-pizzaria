import { prismaCliente } from "../../prisma";

class DeleteItemService {
    async execute(id: string) {


            await prismaCliente.pedido_Item.delete({
                where: {
                    id: id
                },


            })

            return { message: "Produto deletado com sucesso!" };



    }

}

export { DeleteItemService };