import { prismaCliente } from "../../prisma";


interface props {
    rascunho?: string;
}

class ListPedidoService {
    async execute({rascunho}: props){
        const pedidos = await prismaCliente.pedido.findMany({
            where: {
                ...(rascunho !== undefined && {   //lista todos quando o 
                    rascunho: rascunho === "true" ? true : false
                })
            },
            select: {
                id: true,
                mesa: true,
                cliente_nome: true,
                status_mesa: true,
                createdAt: true,
                itens: {
                    select: {
                        id: true, 
                        quantidade: true,
                        produto: {
                            select: {
                                id: true,
                                nome: true,
                                preco: true,
                                descricao: true,
                                imagem: true
                            }
                        }
                    }
                }
            }
        }
    );

        return pedidos;
    }
};


export {ListPedidoService};