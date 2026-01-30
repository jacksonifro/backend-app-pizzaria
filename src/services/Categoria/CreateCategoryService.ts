import { prismaCliente } from "../../prisma";


interface CreateUserCategoryProps {
    nome: string;
}

class CreateUserCategory {
    async execute({ nome }: CreateUserCategoryProps) {
        // Lógica de criação de categoria de usuário    

        const categoriaExistente = await prismaCliente.categoria.findFirst({  //verificando se a categoria ja existe
            where: {
                nome: nome
            }
        });

        if (categoriaExistente) {
            throw new Error("Categoria ja existe"); //  lançando um erro se a categoria ja existir, trhow new Error interrompe a execucao da funcao
        };  

        const novaCategoria = await prismaCliente.categoria.create({
            data: {
                nome: nome
            },
            select:
            {
                id: true,
                nome: true,
                createdAt: true
            }
        });

        return novaCategoria; //retornando a nova categoria criada
    }   
}

export { CreateUserCategory };