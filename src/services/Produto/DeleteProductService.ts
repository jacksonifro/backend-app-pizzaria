import { prismaCliente } from "../../prisma";

class DeleteProductService {
    async execute(id_prod: string) {

        const verificarProduto = await prismaCliente.produto.findUnique({
            where: {
                id: id_prod,         //procurando o produto pelo id informado
            }

        });

        if (!verificarProduto) {
            throw new Error("Produto nao encontrado");
        }

        await prismaCliente.produto.update({
            where: {
                id: id_prod
            },
            data: {
                desativado: true
            }

        })

        return { message: "Produto deletado com sucesso!" };

    }
}

export { DeleteProductService };