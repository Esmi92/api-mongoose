const{Storage} = require('@google-cloud/storage')

const storage = new Storage({
   //en firebase configuración de proyecto 
    projectId: "master-code-aa30e",
    
    // viene desde firebase, keys
    keyFilename: "server.json" 
})

//*se copia de firebase storage master-code-aa30e.appspot.com
const bucket = storage.bucket("master-code-aa30e.appspot.com");

module.exports = (file) =>{
    return new Promise((resolve,reject)=>{
        if(!file) reject("no hay archivo");
        
        //esto renombra la imagen que suber
        const newFilename = `${file.originalname}_${Date.now()}`;

        // ese archivo lo voy a crear en firebase 
        const fileUpload = bucket.file(newFilename);

        //*Validar tipo de dato 
        const validMimeType = ['image/jpeg','image/png']
        if(validMimeType.indexOf(file.mimetype) === -1) reject('tipo de archivo no valido')

        // el archivo se manda por partes, aqui te voy a mandar las partes
        const blobStream = fileUpload.createWriteStream({
            metadata:{
                contentType: file.mimetype 
                //que tipo de archivo te paso 
            }
        })

        //? los .on son como eventListeners si sucede en esta caso error hacer esto
        blobStream.on('error',(error)=>{
            reject(error)
        }) // si pasa un error la promesa debe regresar un error en el transcurso del paso de las partes

        //*ver docto https://googleapis.dev/nodejs/storage/latest/File.html#createWriteStream
        blobStream.on('finish',()=>{
            const url = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`
            resolve(url)
        })

        blobStream.end(file.buffer)
        // aqui empieza la transmisión de datos de backend a bucket

    })
}
