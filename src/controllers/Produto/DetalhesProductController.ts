import { Request, Response } from 'express';
import { DetalhesProductService } from '../../services/Produto/DetalhesProductService';

class DetalhesProductController {
    async handle(request: Request, response: Response) {

        const id = request.query?.id as string;

        const detalhesProductService = new DetalhesProductService();

        const produto = await detalhesProductService.execute(id); //pegando o id do produto autenticado a partir do middleware de autenticacao

        return response.json(produto);
    }
}


export { DetalhesProductController };