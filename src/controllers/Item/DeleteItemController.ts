import { Request, Response} from "express";
import { DeleteItemService } from "../../services/Item/DeleteItemService"

class DeleteItemController {
    async handle(req: Request, res: Response){

        const deleteItem = new DeleteItemService();

        const item = await deleteItem.execute(req.query?.id as string);

        res.json(item)
    }
    
}

export { DeleteItemController };