import { ZodError, ZodType } from "zod";
import { Request, Response, NextFunction } from "express";

const validateSchema =
    (schema: ZodType) => //Recebe um schema do Zod como parametro de uma funcao anonima
        async (req: Request, res: Response, next: NextFunction) => {  //abre outra funcao anonima que é o middleware propriamente dito, que recebe os parametros padroes do express: req, res e next
            try {
                await schema.parseAsync({ //tenta validar os dados da requisicao com o schema recebido como parametro
                    body: req.body,  //
                    query: req.query,
                    params: req.params,
                });
                return next(); //se a validacao for bem sucedida, chama o next() para passar para o proximo middleware ou rota
            } catch (error) {  //se der erro na validacao, captura o erro
                
                if (error instanceof ZodError) {    //se o erro for uma instancia de ZodError, ou seja, um erro de validacao do Zod
                    return res.status(400).json({   //
                        error: "Erro de validação!",
                        details: error.issues.map((issue) => ({  // mapeia os erros de validacao para um formato mais amigavel
                            campo: issue.path.slice(1).join('.'),  // pega o caminho do campo que deu erro, remove o primeiro elemento (body, query ou params) e junta o resto com ponto
                            mensagem: issue.message,
                        })),

                    });
                }
                return res.status(500).json({ message: "Erro interno do servidor!" });  //se for outro tipo de erro, retorna um erro 500
            }
        };


export { validateSchema };
