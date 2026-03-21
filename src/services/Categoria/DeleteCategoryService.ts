import { prismaCliente } from "../../prisma";

class DeleteCategoryService {
    async execute(id: string) {
        // Lógica de exclusão de categoria de usuário

        // Verificar se a categoria existe
        const categoriaExistente = await prismaCliente.categoria.findUnique({
            where: {
                id: id
            }
        });

        if (!categoriaExistente) {
            throw new Error("Categoria não encontrada");
        }

        // Excluir a categoria
        await prismaCliente.categoria.delete({
            where: {
                id: id
            }
        });
        
        return { message: "Categoria deletada com sucesso!" };

    }

}

export default DeleteCategoryService;