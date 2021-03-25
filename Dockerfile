#Dockerfile va con D mayusc 

FROM node:14 
#Aqui digo que versión de node voy a ocupar 

WORKDIR /usr/src/app 
#?se puede escribir igual /opt/app
#Aqui digo donde va a estar trabajando mi container pero dentro de docker no de mi compu

COPY package*.json ./
#Aqui voy copiar los package(*).json y muevelos a WORKDIR(./)

RUN npm install
#Aqui instalo todas las dependencias de mi proyecto
#?Si fallará alguna dependencia aqui se detiene 

COPY . . 
#voy a copiar el resto de los archivos al WORKDIR 

EXPOSE 3000
#Expone el puerto que vamos a ocupar
#debe ser === al del server.js 

CMD ["node","server.js"]
#va a ejecutar el comando node server.js 
#?como si lo escribieras en la consola y el espacio es la , del array


#* node_modules se ignora en el dockerignore porque se crea con base al sistema ope

