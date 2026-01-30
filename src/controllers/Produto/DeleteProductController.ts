import { Request, Response} from "express";
import { DeleteProductService } from "../../services/Produto/DeleteProductService"

class DeleteProductController {
    async handle(req: Request, res: Response){

        const deleteProductService = new DeleteProductService();

        const produto = await deleteProductService.execute(req.query?.id as string);

        res.json(produto)
    }
    
}

export { DeleteProductController };