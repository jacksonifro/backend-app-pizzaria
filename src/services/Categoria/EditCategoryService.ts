import { prismaCliente } from "../../prisma";

interface EditCategoryProps {
    id: string;
    nome: string;
}

class EditCategoryService {
    async execute({ id, nome }: EditCategoryProps) {
        const categoria = await prismaCliente.categoria.findUnique({
            where:
             { id: id },
        });

        if (!categoria) {
            throw new Error("Categoria não encontrada");
        }

        const categoriaAtualizada = await prismaCliente.categoria.update({
            where: { id: id },
            data: { nome: nome },
            select: {
                id: true,
                nome: true,
                createdAt: true
            }
        });

        return categoriaAtualizada;
    }
};

export { EditCategoryService };