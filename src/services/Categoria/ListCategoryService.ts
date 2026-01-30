import { prismaCliente } from "../../prisma";


class ListCategoryService {
  async execute() {
    const categories = await prismaCliente.categoria.findMany({ //categoria é o nome da tabela no banco de dados
      orderBy: {
        nome: "asc", //ordenando as categorias em ordem alfabetica crescente
      },
    }); 
    return categories; //retornando as categorias encontradas
  } 
}

export { ListCategoryService };