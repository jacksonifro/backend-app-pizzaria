import { CreateUserCategory } from "../../services/Categoria/CreateCategoryService";


import { Request, Response } from "express";

class CreateCategoryController {
    async handle(req: Request, res: Response) { //o metodo handle é o padrao para controllers
        // Lógica de criação de categoria de usuário
        const { nome } = req.body; //pegando os dados do corpo da requisicao

        const createCategoryService = new CreateUserCategory();

            const categoria = await createCategoryService.execute({ nome });
            return res.json(categoria);
    }
}

export { CreateCategoryController };