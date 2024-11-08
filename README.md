
# Laboratorio NoSQL - Marcelo Bravo

Proyecto realizado en NodeJS que se conecta a una base NoSQL de tipo MongoDB

## Ejecución de proyecto

#### Antes que nada para correr el proyecto se deberá descargar las dependencias

```
  npm install
```

#### Luego se deberá crear un fichero .env en la carpeta raíz con las variables de ambiente

```
  MONGODB_URL=***
  REDIS_URL=***
```

| Parametro | Descripcion                       |
| :-------- | :-------------------------------- |
| `MONGODB_URL`      | URL de conexión a la base MongoDB |
| `REDIS_URL`      | URL de conexión a la base Redis |

#### Para correr el proyecto en el entorno de desarrollo

```
  npm run dev
```

#### Para correr las pruebas del proyecto

```
  npm run test
```

## Ejecución de proyecto en Docker

#### Para generar la imagen

```
  docker build -t labnode .
```

#### Para correr la imagen en un contenedor

```
  docker run -d --env-file ./envDocker.list -p 5000:5000 labnode
```
Donde envDocker.list es el archivo donde se guardan las variables de ambiente con el mismo formato que el .env

## API Requests

#### Agregar un nuevo paciente

```http
  POST /api/paciente
```

| Parametro | Tipo     | Descripcion                |
| :-------- | :------- | :------------------------- |
| `paciente` | `JSON` | **Requerido**. Paciente que se va a dar de alta |

#### Ejemplo de BODY:

```
{
    "cedula": "16449135",
    "nombre": "Silvia",
    "apellido": "Sugo",
    "fechaNacimiento": "1959-07-12",
    "sexo": "Femenino"
}
```


#### Agregar un registro medico

```http
  POST /api/registro-medico
```

| Parametro | Tipo     | Descripcion                |
| :-------- | :------- | :------------------------- |
| `registro medico` | `JSON` | **Requerido**. Registro medico que se va a dar de alta |

#### Ejemplo de BODY:

```
{
    "fechaAlta": "2024-10-01 14:00:00",
    "tipo": "Examen",
    "diagnostico": "Analisis de Sangre",
    "medico": "Miguel Merentiel",
    "institucion": "Casmu",
    "cedula_paciente": "16449135"
}
```


#### Consultar historial medico con cache

```http
  GET /api/consulta-cache/{cedula}/{pagina}/{limite}
```

| Parametro | Tipo     | Descripcion                       |
| :-------- | :------- | :-------------------------------- |
| `cedula`      | `string` | **Requerido**. Cedula del paciente |
| `pagina`      | `int` | Pagina que se desea mostrar |
| `limite`      | `int` | Cantidad de registros a desplegar por pagina |



#### Consultar historial medico

```http
  GET /api/consulta/{cedula}/{pagina}/{limite}
```

| Parametro | Tipo     | Descripcion                       |
| :-------- | :------- | :-------------------------------- |
| `cedula`      | `string` | **Requerido**. Cedula del paciente |
| `pagina`      | `int` | Pagina que se desea mostrar |
| `limite`      | `int` | Cantidad de registros a desplegar por pagina |



#### Obtener registros por criterio

```http
  GET /api/busqueda
```

| Parametro | Tipo     | Descripcion                       |
| :-------- | :------- | :-------------------------------- |
| `busqueda`      | `JSON` | **Requerido**. Criterios para la busqueda |

#### Ejemplo de BODY:

```
{
    "tipo":"", 
    "diagnostico":"", 
    "medico":"", 
    "institucion":"Casmu"
}
```





## Authors

- [@mbravo95](https://github.com/mbravo95)

