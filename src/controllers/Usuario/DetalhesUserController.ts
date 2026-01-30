import { Request, Response } from 'express';
import { DetalhesUserService } from '../../services/Usuario/DetalhesUserService';

class DetalhesUserController {
    async handle(request: Request, response: Response) {   

        const detalhesUserService = new DetalhesUserService();
        
        const user = await detalhesUserService.execute(request.user_id); //pegando o id do usuario autenticado a partir do middleware de autenticacao
        
        return response.json(user);
    }   
}


export { DetalhesUserController };