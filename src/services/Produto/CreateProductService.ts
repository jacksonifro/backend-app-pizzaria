import { Readable } from "node:stream";  //biblioteca de streaming padrao do node. nao precisa instalar.

import { prismaCliente } from "../../prisma";
import cloudinary from "../../config/cloudinary";

interface CreateProductProps {
    nome: string;
    preco: number; // em centavos para evitar problemas com ponto flutuante
    descricao: string;
    categoria_id: string// Chave estrangeira para Categoria
    imagemBuffer: Buffer;
    imagemName: string;
}

class CreateProductService {
    async execute({
        nome,
        preco,
        descricao,
        categoria_id,
        imagemBuffer,
     }: CreateProductProps) {


        //Verificacao se categoria existe
        const verificarCategoriaID = await prismaCliente.categoria.findFirst({
            where: {
                id: categoria_id
            }
        });

        if (!verificarCategoriaID) {
            throw new Error("Categoria informada não existe!")   //se a categoria nao existe ele para a execucao com o throw
        }

        //verificacoa se existe o ja existe com o mesmo nome
        const verificarProdutoExistente = await prismaCliente.produto.findFirst({ //verificando se ja existe um usuario com o email informado
            where: {
                nome: nome,
            },
        });

        if (verificarProdutoExistente) {
            throw new Error("Produto ja existe");  //O throw new Error interrompe a execucao da funcao e retorna o erro para quem chamou a funcao
        }


        //LOGICA
        //Enviar par ao cloudinary salvar a imagem e pegar a url salva

        let imagemUrl = "";

        try {

            const resultado = await new Promise<any>((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        folder: "produtos",
                        resource_type: "image",
                    },
                    (error, result) => {
                        if (error) {
                            reject(error);

                        } else {
                            resolve(result);
                        }
                    }
                )

                //Criar o stream do buffer e fazer o pipe para o cloudinary
                const bufferStream = Readable.from(imagemBuffer)
                bufferStream.pipe(uploadStream)

            } //fim da funcao anonima da promisse
            ) //fim da promisse

            console.log(resultado);

            //aqui ele grava a URL da imagem salva no Cloudnary nessa variavel.
            imagemUrl = resultado.secure_url;

        } catch (error) {
            console.log(error);
            new Error("Erro no carregamento!")

        }

        //Salvar a url da imagem e os dados no BD de um novo produto
        const prod = await prismaCliente.produto.create({
            data: {
                nome: nome,
                preco: preco,
                descricao: descricao,
                imagem: imagemUrl,
                categoria_id: categoria_id
            },
            select: {
                id: true,
                nome: true,
                preco: true,
                descricao: true,
                categoria_id: true,
                imagem: true,
                createdAt: true
            }
        })


        return {prod};  //retornando uma mensagem de sucesso do metodo execute
    }



}


export { CreateProductService };