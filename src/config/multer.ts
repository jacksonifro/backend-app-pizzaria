import multer from 'multer';

//Usar o memorystorage para manter o arquivo em memoria e enviar diretamente para o cloudinary

const uploadConfig: multer.Options = {  //chama a funcao Options do multer (importado) e passa as configurações solicitadas
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, //5 mb
    },
    fileFilter: (req: any, file: Express.Multer.File, callback: any) => {
        const tiposArquivos = ["image/jpeg", "image/jpg", "image/png"];

        if (tiposArquivos.includes(file.mimetype)){
            callback(null, true);

        } else {
            callback(new Error("Formato de arquivo invalido! Use apenas JPG, JPEG, PNG."));
        }
    },
}


export default uploadConfig;