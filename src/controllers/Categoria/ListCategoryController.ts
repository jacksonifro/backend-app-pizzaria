
import { Request, Response } from "express";
import { ListCategoryService } from "../../services/Categoria/ListCategoryService";



class ListCategoryController {
  async handle(_: Request, res: Response) { //o metodo handle é o padrao para controllers
    // Lógica de listagem de categorias
    const listCategoryService = new ListCategoryService(); //instanciando a classe de servico de listagem de categorias
    
    const categories = await listCategoryService.execute(); //chamando o metodo execute da classe de servico de listagem de categorias  
    res.json(categories);  //retornando a resposta em formato json
    
  } 
}
export { ListCategoryController };
