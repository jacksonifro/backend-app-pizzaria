import { prismaCliente } from "../../prisma";

class ListProductCatService {
    async execute(id_categoria: string) {

        const verificaID = await prismaCliente.categoria.findUnique({
            where: {
                id: id_categoria
            }
        })

        if (!verificaID) {
            throw new Error("Categoria informada não existe!")
        }

        const produtos = await prismaCliente.produto.findMany({
            where: {
                categoria_id: id_categoria
            },
            select: {
                id: true,
                nome: true,
                preco: true,
                descricao: true,
                categoria_id: true,
                imagem: true,
                desativado: true,
                createdAt: true,
                categoria: {
                    select: {
                        id: true,
                        nome: true
                    }
                }
            },
        })


        return produtos;
    }

}


export { ListProductCatService };
