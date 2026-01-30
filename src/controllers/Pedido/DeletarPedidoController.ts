import { Request, Response } from "express";
import { DeletarPedidoService } from "../../services/Pedido/DeletePedidoService";

class DeletarPedidoController {
    async handle(req: Request, res: Response){

        const pedido_id = req.body;

        const deletarPedido = new DeletarPedidoService();

        const pedidoAlterado = await deletarPedido.execute({
            pedido_id: pedido_id,
        });

        res.json(pedidoAlterado);
        


    }
}

export {DeletarPedidoController};