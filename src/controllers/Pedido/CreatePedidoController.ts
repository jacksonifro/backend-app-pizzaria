import { Request, Response } from "express";
import { CreatePedidoService } from "../../services/Pedido/CreatePedidoService";

class CreatePedidoController {
    async handle(req: Request, res: Response) {

        const { mesa, cliente } = req.body;

        const createPedido = new CreatePedidoService();

        const pedido = await createPedido.execute({
            mesa: mesa,
            cliente: cliente
        });

        return res.json(pedido);
    }
}

export { CreatePedidoController };