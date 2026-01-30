import { compare } from "bcryptjs";
import { prismaCliente } from "../../prisma";
import { sign } from "jsonwebtoken";

interface AutenticarUserServiceProps{
    email: string;  
    senha: string;
}


class AutenticarUserService {
    public async execute({ email, senha }: AutenticarUserServiceProps) {

        //verificando se o usuario existe no banco de dados
        const verificarUsuario = await prismaCliente.usuario.findFirst({
            where: {
                email: email         //procurando o usuario pelo email informado
               }
        });

        if (!verificarUsuario) {
            throw new Error("Usuario nao encontrado");
        }


        //verificando se a senha informada bate com a senha do banco de dados
        const senhaCorreta = await compare(senha, verificarUsuario.senha);

        if (!senhaCorreta) {
            throw new Error("Senha incorreta");
        }

        //Gerar e retornar um token de autenticação (JWT) - opcional
        const token = sign(        //gerando o token com a biblioteca jsonwebtoken
            {
                nome: verificarUsuario.nome,
                email: verificarUsuario.email
            },
            process.env.JWT_SECRET as string, //chave secreta para assinar o token - em um ambiente real, isso deve ser armazenado em variaveis de ambiente
            {
                subject: verificarUsuario.id, //id do usuario autenticado
                expiresIn: "30d" //tempo de expiração do token
            }
        );


        console.log(`Email: ${email}, Senha: ${senha}`);
        // Aqui você pode adicionar a lógica para autenticar o usuário
        return { 
            id: verificarUsuario.id,
            nome: verificarUsuario.nome,
            email: verificarUsuario.email,
            perfil: verificarUsuario.perfil,
            token: token
        }; //retornando a resposta em formato json
    }   
}

export { AutenticarUserService };