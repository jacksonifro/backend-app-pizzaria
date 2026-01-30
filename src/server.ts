import cors from 'cors';
import 'dotenv/config';
import express, { NextFunction, Request, Response} from 'express';
import { router } from './router';

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {  //middleware de tratamento de erros
    if (err instanceof Error) {  //verifica se o erro é uma instancia de Error
        return res.status(400).json({   
            error: err.message 
        });
    }

    return res.status(500).json({  //se o erro nao for uma instancia de Error, retorna um erro 500
        status: "error",
        message: "Erro interno do servidor!"
    });
});



const PORT = process.env.PORT || 3333;  //definindo a porta do servidor, busca a porta do arquivo .env ou usa a porta 3333 como padrao

app.listen(PORT, () => {
    console.log("Servidor rodando em: http://localhost:" + PORT);
});