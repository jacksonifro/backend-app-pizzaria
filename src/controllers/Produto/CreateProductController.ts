import { Request, Response } from 'express';
import { CreateProductService } from '../../services/Produto/CreateProductService';

class CreateProductController {
    async handle(req: Request, res: Response) {

        const { nome, preco, descricao, categoria_id } = req.body;

        console.log(req.file);

        if (!req.file) {
            throw new Error("A imagem do produto é obrigatorio!");
        }

        const criarProduto = new CreateProductService();

        const produto = await criarProduto.execute({
            nome: nome,
            preco: parseInt(preco),
            descricao: descricao,
            categoria_id: categoria_id,
            imagemBuffer: req.file.buffer,
            imagemName: req.file.originalname
        }
        );

        return res.json(produto);
    }
}

export { CreateProductController };