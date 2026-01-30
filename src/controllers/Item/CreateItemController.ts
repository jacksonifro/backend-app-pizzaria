import { Request, Response } from "express";
import { CreateItemService } from "../../services/Item/CreateItemService";


class CreateItemController {
    async handle(req: Request, res: Response){

        const {pedido_id, produto_id, quantidade} = req.body;

        const itemService = new CreateItemService();

        const item =  await itemService.execute({
            pedido_id: pedido_id,
            produto_id: produto_id,
            quantidade: quantidade
        })

        return res.json(item);

    }
}


export {CreateItemController};