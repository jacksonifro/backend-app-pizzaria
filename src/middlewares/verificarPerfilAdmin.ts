import { Request, Response, NextFunction } from "express";
import { prismaCliente } from "../prisma";

const verificarPerfilAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const user_id = req.user_id;

    if (!user_id) {
        return res.status(401).json(
            { error: 'Acesso negado. Usuário não autenticado.' });
    }

    const user = await prismaCliente.usuario.findUnique({
        where: {
            id: req.user_id
        }
    });

    if (!user) {
        return res.status(401).json(
            { error: 'Acesso negado. Usuário não encontrado.' });  
    }


    if (user?.perfil !== 'ADMIN') {
        return res.status(401).json(
            { error: 'Acesso negado. Usuário não é administrador.' });  
    }

    next(); // Prosseguir para o próximo middleware ou rota se o usuário for admin

};

export { verificarPerfilAdmin };    