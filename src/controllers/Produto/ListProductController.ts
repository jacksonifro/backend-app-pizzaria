
import { Request, Response } from "express";
import { ListProductService } from "../../services/Produto/ListProductService";



class ListProdutctController {
  async handle(req: Request, res: Response) { //o metodo handle é o padrao para controllers
    // Lógica de listagem de produtos
    
    const desativado = req.query.desativado as string | undefined;
    
    const ListProductServices = new ListProductService(); //instanciando a classe de servico de listagem de categorias
    
    const produtos = await ListProductServices.execute({
      
      desativado: desativado,

    }); //chamando o metodo execute da classe de servico de listagem de categorias  
    res.json(produtos);  //retornando a resposta em formato json
  
  } 
}
export { ListProdutctController };
