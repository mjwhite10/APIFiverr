const fs = require('fs/promises');
const path = require('path');
const uuid = require('uuid');
const sharp = require('sharp');
//Esta es una función que nos devuleve un error con su estado
const generateError = (message, status) => {
  const error = new Error(message);
  error.httpStatus = status;
  return error;
};

//Función que crea un directorio si este no existe
const createPathIfNotExits = async (path) => {
  try {
    await fs.access(path);
  } catch {
    await fs.mkdir(path, { recursive: true });
  }
};

//Función que procesa las imagenes y las almacena en el servidor
const processAndSaveImage = async (uploadedImage, imageUploadPath) => {
  // Leer la imagen que se subio
  const image = sharp(uploadedImage.data);
  // Saco información de la imagen
  const imageInfo = await image.metadata();

  // Cambiarle el tamaño si es necesario
  if (imageInfo.width > 1000) {
    image.resize(1000);
  }

  // Guardar la imagen en el directorio de subidas
  const imageFileName = `${uuid.v4()}.jpg`;
  await image.toFile(path.join(imageUploadPath, imageFileName));

  // Devolver el nombre con el que fue guardada
  return imageFileName;
};

//Función que elimina un archivo
const deleteFile = async (path) => {
  try {
    await fs.rm(path);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  generateError,
  createPathIfNotExits,
  processAndSaveImage,
  deleteFile,
};
