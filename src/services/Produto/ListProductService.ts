import { prismaCliente } from "../../prisma";

interface props {
  desativado?: string
}


class ListProductService {
  async execute({desativado}: props) {
    const produtos = await prismaCliente.produto.findMany({ //categoria é o nome da tabela no banco de dados
      where:{
        ...(desativado !== undefined && {     //não vinher nem false ou true, retorna todos
          desativado: desativado === "true"
        })
      },
      
      orderBy: {
        nome: "asc", //ordenando as produtos em ordem alfabetica crescente
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
    }
    );
    return produtos; //retornando as produtos encontradas
  }
}

export { ListProductService };