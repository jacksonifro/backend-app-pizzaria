import { Request, Response } from 'express';
import { DetalhesPedidoService } from '../../services//Pedido/DetalhesPedidoService';

class DetalhesPedidoController {
    async handle(request: Request, response: Response) {

        const id = request.query?.id as string;

        const detalhesPedido = new DetalhesPedidoService();

        const pedido = await detalhesPedido.execute(id); //pegando o id do produto autenticado a partir do middleware de autenticacao

        return response.json(pedido);
    }
}


export { DetalhesPedidoController };