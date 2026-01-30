import { prismaCliente } from "../../prisma";

class DetalhesUserService {
    async execute(id_user: string) {
        
        const verificarUsuario = await prismaCliente.usuario.findFirst({
            where: {
                id: id_user         //procurando o usuario pelo id informado
            },
            select: {
                id: true,
                nome: true,
                email: true,
                perfil: true,
                createdAt: true
            }
        });

        if (!verificarUsuario) {
            throw new Error("Usuario nao encontrado");
        }
        
        return verificarUsuario;



    }
}

export { DetalhesUserService };