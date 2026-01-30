import { Request, Response } from "express";
import { CreateUserService } from "../../services/Usuario/CreateUserService";

class CreateUserController {
  async handle(req: Request, res: Response) { //o metodo handle é o padrao para controllers
    // Lógica de criação de usuário
    
    const { nome, email, senha}  = req.body; //pegando os dados do corpo da requisicao
    
    console.log(`Nome: ${nome}, Email: ${email}, Senha: ${senha}`);

    const createUserService = new CreateUserService(); //instanciando a classe de servico de criacao de usuario
    
    const user = await createUserService.execute({ 
      nome: nome,  //passando os dados para o metodo execute da classe de servico de criacao de usuario
      email: email,
      senha: senha
    }); //chamando o metodo execute da classe de servico de criacao de usuario
    
    res.json(user);  //retornando a resposta em formato json
    
  }
}

export { CreateUserController };
