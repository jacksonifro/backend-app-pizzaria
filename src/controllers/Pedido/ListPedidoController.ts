import { Request, Response } from "express";
import { ListPedidoService } from "../../services/Pedido/ListPedidoService";

class ListPedidoController {
    async handle(req: Request, res: Response){

        const rascunho = req.query?.rascunho as string || undefined;

        const listaPedidoService = new ListPedidoService();

        const pedidos = await listaPedidoService.execute({
            rascunho: rascunho
            
        });

        return res.json(pedidos);

    }
}

export { ListPedidoController};