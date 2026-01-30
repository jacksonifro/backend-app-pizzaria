import { Request, Response } from "express";
import {ListProductCatService } from "../../services/Produto/ListProductCatService";


class ListProductCatController {
    async handle(req: Request, res: Response){

        const cat = req.query.categoria_id as string;

        const listProductCatController = new ListProductCatService();

        const prod =  await listProductCatController.execute(cat);

       return res.json(prod)

    }
}

export {ListProductCatController};