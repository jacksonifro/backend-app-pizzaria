import { Router } from "express";
import multer from "multer";
import uploadConfig from './config/multer';

import { CreateUserController } from "./controllers/Usuario/CreateUserController";
import { validateSchema } from "./middlewares/validateSchema";
import { createUserSchema, autenticateUserSchema } from "./schemas/userSchema";
import { createCategorySchema } from "./schemas/categorySchema";
import { AuthenticateUserController } from "./controllers/Usuario/AutenticarUserController";
import { DetalhesUserController } from "./controllers/Usuario/DetalhesUserController";
import { autenticarTokenUser } from "./middlewares/autenticarTokenUser";
import { CreateCategoryController } from "./controllers/Categoria/CreateCategoryController";
import { verificarPerfilAdmin } from "./middlewares/verificarPerfilAdmin";
import { ListCategoryController } from "./controllers/Categoria/ListCategoryController";
import { CreateProductController } from "./controllers/Produto/CreateProductController";
import { createProductSchema } from "./schemas/productSchema";
import { ListProdutctController } from "./controllers/Produto/ListProductController";
import { DetalhesProductController } from "./controllers/Produto/DetalhesProductController";
import { DeleteProductController } from "./controllers/Produto/DeleteProductController";
import { EditProductController } from "./controllers/Produto/EditProductController";
import { ListProductCatController } from "./controllers/Produto/ListProductCatController";
import { EditUserController } from "./controllers/Usuario/EditUserController";
import { CreatePedidoController } from "./controllers/Pedido/CreatePedidoController";
import { createPedidoSchema, enviarPedidoSchema } from "./schemas/pedidoSchema";
import { ListPedidoController } from "./controllers/Pedido/ListPedidoController";
import { CreateItemController } from "./controllers/Item/CreateItemController";
import { createItemSchema } from "./schemas/itemSchema";
import { DeleteItemController } from "./controllers/Item/DeleteItemController";
import { DetalhesItemController } from "./controllers/Item/DetalheItemController";
import { DetalhesPedidoController } from "./controllers/Pedido/DetalhesPedidoController";
import { EnviarPedidoController } from "./controllers/Pedido/EnviarPedidoController";



const router = Router();
const upload = multer(uploadConfig);

//Rota para criar usuario
router.post(
    '/users',  //rota para criar usuario
    validateSchema(createUserSchema),  //middleware para validar o schema da requisicao usando o schema de criacao de usuario
    new CreateUserController().handle    //controller para criar usuario
);

//Rota para edit usuario
router.put(
    '/users',  //rota para criar usuario
    validateSchema(createUserSchema),  //middleware para validar o schema da requisicao usando o schema de criacao de usuario
    new EditUserController().handle    //controller para criar usuario
);

//Rota para autenticar usuario
router.post(
    '/login',  //rota para login
    validateSchema(autenticateUserSchema),  //middleware para validar o schema da requisicao usando o schema de autenticacao de usuario     
    new AuthenticateUserController().handle    //controller para autenticar usuario
);  
    

//Rota para obter detalhes do usuario
router.get(
    '/me',
    autenticarTokenUser,  //middleware para autenticar o token do usuario LOGADO antes de acessar os detalhes
    new DetalhesUserController().handle,  //controller para obter detalhes do usuario
);


//Rota para criar categoria de usuario
router.post(
    '/categories',  //rota para criar categoria de usuario
    autenticarTokenUser,
    verificarPerfilAdmin,
    validateSchema(createCategorySchema),  //middleware para validar o schema da requisicao usando o schema de criacao de categoria de usuario
    new CreateCategoryController().handle  //controller para criar categoria de usuario
);


//Rota para listar categoria
router.get(
    '/categories',
    autenticarTokenUser,
    new ListCategoryController().handle 

);

//Rota para criar produto
router.post(
    '/products',
    autenticarTokenUser,
    verificarPerfilAdmin,
    upload.single ('file'), //no paramns form-data da requisicao, ele vai pegar o campo file
    validateSchema(createProductSchema),
    new CreateProductController().handle
)

//Rota para listar produto
router.get(
    '/products',
    autenticarTokenUser,
    new ListProdutctController().handle
)

//Rota para Ver produto
router.get(
    '/products_view',
    autenticarTokenUser,
    new DetalhesProductController().handle
)


//Rota para Excluir Produto
router.delete(
    '/products',
    autenticarTokenUser,
    verificarPerfilAdmin,
    new DeleteProductController().handle
)

//Rota para Editar Produto
router.put(
    '/products_edit',
    autenticarTokenUser,
    verificarPerfilAdmin,
    upload.single("file"), // 👈 campo "file" no form-data
    new EditProductController().handle
)

//Rota para Listar Produto por Categorias
router.get(
    '/products_cat',
    autenticarTokenUser,
    new ListProductCatController().handle
)

//Rota pra Criar Pedido
router.post(
    '/pedidos',
    autenticarTokenUser,
    validateSchema(createPedidoSchema),
    new CreatePedidoController().handle
)

//Rota para listar Pedidos
router.get(
    '/pedidos',
    autenticarTokenUser,
    new ListPedidoController().handle
)

//Rota para Ver Pedido
router.get(
    '/pedidos/view',
    autenticarTokenUser,
    new DetalhesPedidoController().handle
)

//Rota para Enviar Pedido
router.put(
    '/pedidos/send',
    autenticarTokenUser,
    validateSchema(enviarPedidoSchema),
    new EnviarPedidoController().handle
)


//Rota para Criar Item
router.post(
    '/pedidos/add',
    autenticarTokenUser,
    validateSchema(createItemSchema),
    new CreateItemController().handle
)


//Rota para Deletar Item
router.delete(
    '/pedidos/remove',
    autenticarTokenUser,
    new DeleteItemController().handle
)


//Rota para Ver Item
router.get(
    '/pedidos/view',
    autenticarTokenUser,
    new DetalhesItemController().handle
)

export { router };

