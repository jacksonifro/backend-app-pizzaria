import DeleteCategoryService from "../../services/Categoria/DeleteCategoryService";
import { Request, Response } from "express";

class DeleteCategoryController {
    async handle(req: Request, res: Response) {
        const { id } = req.query as { id: string }; // Pegando o ID da categoria a ser deletada a partir dos parâmetros de consulta (query parameters)

            const deleteCategoryService = new DeleteCategoryService();

            const resultado = await deleteCategoryService.execute(id);
            return res.json(resultado);   
    }
}   

export default DeleteCategoryController;