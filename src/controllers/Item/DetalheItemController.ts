import { Request, Response } from 'express';
import { DetalhesItemService } from '../../services/Item/DetalhesItemService';

class DetalhesItemController {
    async handle(request: Request, response: Response) {

        const id = request.query?.id as string;

        const detalhesItem = new DetalhesItemService();

        const produto = await detalhesItem.execute(id); //pegando o id do produto autenticado a partir do middleware de autenticacao

        return response.json(produto);
    }
}


export { DetalhesItemController };