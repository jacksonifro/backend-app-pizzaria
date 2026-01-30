import { Request, Response } from "express";
import { EditUserService } from "../../services/Usuario/EditUserService";

class EditUserController {
  async handle(req: Request, res: Response) { //o metodo handle é o padrao para controllers
    // Lógica de criação de usuário
    
    const { nome, email, senha}  = req.body; //pegando os dados do corpo da requisicao
    
    const editarUsuario = new EditUserService(); //instanciando a classe de servico de criacao de usuario
    
    const user = await editarUsuario.execute({ 
      nome: nome,  //passando os dados para o metodo execute da classe de servico de criacao de usuario
      email: email,
      senha: senha
    }); //chamando o metodo execute da classe de servico de criacao de usuario
    
    res.json(user);  //retornando a resposta em formato json
    
  }
}

export { EditUserController };
