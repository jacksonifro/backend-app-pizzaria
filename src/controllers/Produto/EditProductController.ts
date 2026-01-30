import { Request, Response } from "express";
import { EditProductService } from "../../services/Produto/EditProductService";

class EditProductController {
  async handle(req: Request, res: Response) {

    const id = req.query.id as string;

    const { nome, preco, descricao, categoria_id } = req.body;

    // IMAGEM OBRIGATÓRIA
    if (!req.file) {
      return res.status(400).json({
        error: "A imagem do produto é obrigatória na edição"
      });
    }

    const editarProduct = new EditProductService();

    const produtoAtualizado = await editarProduct.execute({
      id,
      nome,
      preco: Number(preco),
      descricao,
      categoria_id,
      imagemBuffer: req.file.buffer,
      imagemName: req.file.originalname
    });

    return res.json(produtoAtualizado);
  }
}

export { EditProductController };
