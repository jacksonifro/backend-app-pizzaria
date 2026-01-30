import { Request, Response } from "express";
import { FinalizarPedidoService } from "../../services/Pedido/FinalizarPedidoService";

class FinalizarPedidoController {
    async handle(req: Request, res: Response){

        const {pedido_id} = req.body;

        const enviarPedido = new FinalizarPedidoService();

        const pedidoAlterado = await enviarPedido.execute({
            pedido_id: pedido_id,
        });

        return res.json(pedidoAlterado);
    }
}

export {FinalizarPedidoController};