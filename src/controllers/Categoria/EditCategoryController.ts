import { Request, Response } from "express";
import { EditCategoryService } from "../../services/Categoria/EditCategoryService";

class EditCategoryController {
    async handle(req: Request, res: Response) {
        
        const id = req.query.id as string;
        const { nome } = req.body;

        const editarCategoria = new EditCategoryService();

        const categoriaAtualizada = await editarCategoria.execute({ id, nome });

        return res.json(categoriaAtualizada);
    }
}

export { EditCategoryController };