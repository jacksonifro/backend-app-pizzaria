import { Request, Response } from "express";
import { EnviarPedidoService } from "../../services/Pedido/EnviarPedidoService";

class EnviarPedidoController {
    async handle(req: Request, res: Response){

        const {pedido_id, cliente} = req.body;

        const enviarPedido = new EnviarPedidoService();

        const pedidoAlterado = await enviarPedido.execute({
            pedido_id: pedido_id,
            cliente: cliente
        });

        return res.json(pedidoAlterado);
        


    }
}

export {EnviarPedidoController};