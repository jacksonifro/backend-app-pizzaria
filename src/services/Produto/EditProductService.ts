import { Readable } from "node:stream";  //biblioteca de streaming padrao do node. nao precisa instalar.

import { prismaCliente } from "../../prisma";
import cloudinary from "../../config/cloudinary";
import { UploadStream } from "cloudinary";

interface EditProductProps {
    id: string,
    nome: string;
    preco: number; // em centavos para evitar problemas com ponto flutuante
    descricao: string;
    categoria_id: string// Chave estrangeira para Categoria
    imagemBuffer: Buffer;
    imagemName: string;
}

class EditProductService {
    async execute({
        id,
        nome,
        preco,
        descricao,
        categoria_id,
        imagemBuffer,
        imagemName,

    }: EditProductProps) {

        const produto = await prismaCliente.produto.findUnique({
            where: { id: id }
        });

        if (!produto) {
            throw new Error("Produto não encontrado");
        }

        // verifica categoria
        const categoriaExiste = await prismaCliente.categoria.findUnique({
            where: { id: categoria_id }
        });

        if (!categoriaExiste) {
            throw new Error("Categoria informada não existe");
        }

        let imagemUrl = produto.imagem; // mantém a antiga

        // 📸 Só faz upload se vier nova imagem
        if (imagemBuffer) {
            try {
                const resultado = await new Promise<any>((resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream(
                        {
                            folder: "produtos",
                            resource_type: "image",
                        },
                        (error, result) => {
                            if (error) reject(error);
                            else resolve(result);
                        }
                    );

                    Readable.from(imagemBuffer).pipe(uploadStream);
                });

                imagemUrl = resultado.secure_url;

            } catch (error) {
                throw new Error("Erro ao atualizar imagem");
            }
        }

        const produtoAtualizado = await prismaCliente.produto.update({
            where: { id: id },
            data: {
                nome: nome,
                preco: preco,
                descricao: descricao,
                categoria_id: categoria_id,
                imagem: imagemUrl
            }
        });

        return produtoAtualizado;
    }
}

export { EditProductService};