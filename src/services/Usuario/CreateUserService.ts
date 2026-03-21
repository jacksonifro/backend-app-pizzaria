import { prismaCliente } from "../../prisma";
import { hash } from "bcryptjs";

interface CreateUserProps {
  nome: string;
  email: string;
  senha: string;
}

class CreateUserService {
  async execute({ nome, email, senha }: CreateUserProps) {   //a funcao precisa ser async pois vai interagir com o banco de dados
    // Implementation for creating a user
    
    const verificarUsuarioExistente = await prismaCliente.usuario.findUnique({ //verificando se ja existe um usuario com o email informado
      where: {
        email: email,
      },
    });

    if (verificarUsuarioExistente) {
      throw new Error("Usuario ja existe");  //O throw new Error interrompe a execucao da funcao e retorna o erro para quem chamou a funcao
    }

    const senhaHash = await hash(senha, 8); //criptografando a senha do usuario com bcryptjs, o numero 8 representa a quantidade de rodadas de hash

    senha = senhaHash; //atribuindo a senha criptografada a variavel senha

    const user = await prismaCliente.usuario.create({  //como o execute e uma funcao async, usamos await para esperar a resposta do banco de dados. OBS: usuario é o nome da tabela no banco de dados
      data: {
        nome: nome,
        email: email,
        senha: senha,
      },
      select: {
        id: true,
        nome: true,
        email: true,
        senha: true,
        perfil: true,
        createdAt: true,
        updatedAt: true
      }
    });


    return user;  //retornando uma mensagem de sucesso do metodo execute
  }
}

export { CreateUserService };