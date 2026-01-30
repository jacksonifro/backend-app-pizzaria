import { Request, Response} from 'express';
import { AutenticarUserService } from '../../services/Usuario/AutenticarUserService';

class AuthenticateUserController {
    async handle(req: Request, res: Response) {
        // Lógica de autenticação de usuário
        const { email, senha } = req.body; //pegando os dados do corpo da requisicao

        const autenticarUserService = new AutenticarUserService();
        const session = await autenticarUserService.execute({ email, senha }); //chamando o serviço de autenticação de usuário

        res.json({ session  }); //retornando a resposta em formato json
    }   
}

export { AuthenticateUserController };