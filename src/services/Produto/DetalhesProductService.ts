import { prismaCliente } from "../../prisma";

class DetalhesProductService {
    async execute(id_prod: string) {
        
        const verificarProduto = await prismaCliente.produto.findFirst({
            where: {
                id: id_prod,         //procurando o produto pelo id informado
            },
            select: {
                id: true,
                nome: true,
                preco: true,
                descricao: true,
                categoria_id: true,
                imagem: true,
                desativado: true,
                createdAt: true
            }
        });

        if (!verificarProduto) {
            throw new Error("Produto nao encontrado");
        }

        return verificarProduto;



    }
}

export { DetalhesProductService };