import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';


interface   Payload {
    sub: string;
}

async function autenticarTokenUser(req: Request, res: Response, next: NextFunction) { //middleware para autenticar o usuario

    const autorizar = req.headers.authorization; //pegando o token do cabeçalho da requisição

    if (!autorizar) {
        return res.status(401).json({ error: 'Token de autenticação ausente' });
    }

    const [, token] = autorizar.split(' '); //separando o token do tipo Bearer que veio no header requisição

    try {
        const { sub } = verify(token!, process.env.JWT_SECRET as string) as Payload; //verificando o token usando a chave secreta
        // Você pode adicionar informações do usuário ao objeto de requisição, se necessário
        req.user_id = sub; //armazenando os dados decodificados do token no objeto de requisição. O user foi adicionado dinamicamente ao tipo Request



        return next(); //prosseguir para o próximo middleware ou rota
    }
    catch (err) {
        return res.status(401).json({ error: 'Token de autenticação inválido' });
    }
}

export { autenticarTokenUser };

