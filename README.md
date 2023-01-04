# CH-Backend-Intermediate
Backend de un eCommerce 
<p align="center">
  <p align="center">    
    <img src="https://github.com/JesusRamirezGamarra/signature/blob/main/public/img/Logo_Negro.png" alt="BFFs" height="250">    
  </p>
  <p align="center">
       CoderHouse - Backend
  </p>
</p>

# CH-Backend-Intermediate
Backend de un eCommerce 


## Se debe entregar:

* Un menú de registro y autenticación de usuarios basado en passport local, guardando en la base de datos las credenciales y el resto de los datos ingresados al momento del registro. 

  - El registro de usuario consiste en crear una cuenta en el servidor almacenada en la base de datos, que contenga el email y password de usuario, además de su nombre, dirección, edad, número de teléfono (debe contener todos los prefijos internacionales) y foto ó avatar. La contraseña se almacenará encriptada en la base de datos.

  - La imagen se podrá subir al servidor y se guardará en una carpeta pública del mismo a la cual se tenga acceso por url.

* Un formulario post de registro y uno de login. De modo que, luego de concretarse cualquiera de estas operaciones en forma exitosa, el usuario accederá a su home.

  - El usuario se logueará al sistema con email y password y tendrá acceso a un menú en su vista, a modo de barra de navegación. Esto le permitirá ver los productos totales con los filtros que se hayan implementado y su propio carrito de compras e información propia (datos de registro con la foto). Además, dispondrá de una opción para desloguearse del sistema.

  - Ante la incorporación de un usuario, el servidor enviará un email al administrador con todos los datos de registro y asunto 'nuevo registro', a una dirección que se encuentre por el momento almacenada en una constante global.

* Envío de un email y un mensaje de whatsapp al administrador desde el servidor, a un número de contacto almacenado en una constante global.

  - El usuario iniciará la acción de pedido en la vista del carrito.

  - Será enviado una vez finalizada la elección para la realizar la compra de productos.

  - El email contendrá en su cuerpo la lista completa de productos a comprar y en el asunto la frase 'nuevo pedido de ' y el nombre y email del usuario que los solicitó. En el mensaje de whatsapp se debe enviar la misma información del asunto del email.

  - El usuario recibirá un mensaje de texto al número que haya registrado, indicando que su pedido ha sido recibido y se encuentra en proceso.


## Aspectos a incluir:

* El servidor trabajará con una base de datos DBaaS (Ej. MongoDB Atlas) y estará preparado para trabajar en forma local o en la nube a través de la plataforma PaaS Heroku.
* Habilitar el modo cluster para el servidor, como opcional a través de una constante global.
* Utilizar alguno de los loggers ya vistos y así reemplazar todos los mensajes a consola por logs eficientes hacia la misma consola. En el caso de errores moderados ó graves el log * tendrá además como destino un archivo elegido.
* Realizar una prueba de performance en modo local, con y sin cluster, utilizando Artillery en el endpoint del listado de productos (con el usuario vez logueado). Verificar los resultados.

Nota  : 

[ver mas](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)

The overall flow of Gitflow is:

1. A `develop` branch is created from `main`
2. A release branch is created from `develop`
3. `Feature` branches are created from `develop`
4. When a `feature` is complete it is merged into the `develop` branch
5. When the `release` branch is done it is merged into `develop` and `main`
6. If an issue in `main` is detected a `hotfix` branch is created from `main`
7. Once the `hotfix` is complete it is merged to both develop and `main`


- La rama `Main` ( antes `Master`), es el branch inicial.
- la rama `develop` o `DEV`, es el branch utilizado por el desarrollador 1 `DEV/[Nombre]` para implementar nuevas funcionalidades requeridas.
- La rama `Hotfix` o `fix/[Error]`, que habitualmente se utiliza para código para depurar el código que venga de producción, por haberse detectado un defecto crítico en producción que deba resolverse, al que se le va a hacer una Release puntual para corregirlo.
- La rama `Feature`, para nuevas características, nuevos requisitos o nuevas historias de usuario.
- La rama `Release`, para estandarizar o cortar una serie de código que ha estado desarrollándose en la rama Develop, se saca una rama de este tipo, se mergea y ahí se depura.

- `pr` o `pull request` : significa «Petición de validación». Simplificándolo al máximo, un pull request es la acción de someter a validación un código que va a fusionarse (o hacer un 'merge', como se suele decir en el mundo de la informática) de una rama a otra.

Curiosidad : 

El movimiento de #BlackLivesMatter ha ayudado a que GitHub sustituya algunas palabras usadas en su plataforma con relación al racismo.
Palabras como master, whitelist, blacklist y slave se encuentran en este proceso de cambio. Pero el más importante en ese momento y que ya ha empezado a tener efecto es que la rama master ahora se llamará main.



## NOTA : 

* Malas Practicas : [ver mas](https://midu.dev/malas-practicas-javascript/)
* JavaScript variable name validator : [ver mas](https://mothereff.in/js-variables)
* Productividad en Visual Code : 
- [ver mas](https://withoutdebugger.com/2020/07/12/tutorial-productividad-con-visual-studio-editor-de-codigo-parte-1/) 
- [ver mas](https://damiandeluca.com.ar/visual-studio-code-atajos-de-teclado-shortcuts)
* Convenciones para nombres de varialbes, funciones, clases, enum : [ver mas](https://www.youtube.com/watch?v=iYI3YvdsUWw)
se adopta como convecion :

a) las variables de solo lectura se esribiran en `UPPER SNAKE_CASE`
```javascipt
const MAX_LENGHT = 180;
```
b) las variables comunes tenemos : 

- se esribiran en `camelCase` 
para numeros/string/objetos/arrays : sustantivos con adjetivos [ver mas](https://www.ejemplos.co/sustantivos-con-sus-adjetivos/)
sustantivo : Un sustantivo es una palabra que designa o da nombre a una entidad fija, es decir, un concepto, persona, objeto, lugar. Por ejemplo: auto, fuerza, Juan.
adjetivos  : Un adjetivo es una palabra que modifica un sustantivo, expresando sus características o propiedades. Por ejemplo: amplio, verdadero, grande
```javascript
let firstName,lastName,averageHeight,maxPay;
```

- las clases en `PascalCase`
```javascript
class ProductController {};
class CartService {};
...
const product =  new Product();'
```

- los enum en `UPPER_SNAKE_CASE`
```javascript
export const AccountType {
	PERSONAL	= 	'Personal'
	BUSINESS	=	'Business'
	CREATOR		=	'Creator'
}
...
Switch (accountType){
	CASE AccountType.PERSONAL:
		...
}

```
- para las variables `booleanas` utilizar `is`o `has` ( en espanol :  `es`, `esta`, `tiene`, `ha`)
```javascript
// isValidPassword
// hasAcceptedTheTerms

const { isValidPassword } = usuario 
if ( !isValidPassword ){
  ...
}
```
c) para funciones utilizaremos verbos en infinitivo o de accion y un sustantivo

```javascript
createProducto  = () =>{} o addProduct  = () =>{}
readProducto    = () =>{} o getProducto = () =>{}
updateProducto  = () =>{} o setProducto = () =>{} 
deleteProducto  = () =>{} 

```

d) utizar `#` para definir variables privadas ( se utiliza `_ ` como prefijo de variables que no deberian ser Seteadas .) [ver mas](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Classes/Private_class_fields)
```javascript
#privateField
static #PRIVATE_STATIC_FIELD

class ClassWithPrivateField {
  #privateField
}

class ClassWithPrivateMethod {
  #privateMethod() {
    return 'hello world'
  }
}

class ClassWithPrivateStaticField {
  static #PRIVATE_STATIC_FIELD
}

```
e) los `import` se denominaran en `kebab-case`
```javascript
import tokenGenerator from 'token-generator'
```

f) para los archivos se utilizara `kebab-case`
```bash
token-generator.js
validate-helper.js
chat-router.js
```

* response types [ver mas](https://es.javascript.info/fetch#:~:text=el%20siguiente%20cap%C3%ADtulo)%2C-,response.,datos%20binarios%20de%20bajo%20nivel)
```javascript
response.text() – lee y devuelve la respuesta en formato texto,
response.json() – convierte la respuesta como un JSON,
response.formData() – devuelve la respuesta como un objeto FormData (codificación multipart/form-data, explicado en el siguiente capítulo),
response.blob() – devuelve la respuesta como Blob (datos binarios tipados),
response.arrayBuffer() – devuelve la respuesta como un objeto ArrayBuffer (datos binarios de bajo nivel)
```
* response.json()

```javascript
  const jsonMessage = { 
    status: hasJsonMessage.SUCCESS, 
    message:`Product Create Sucessfully`, 
    code:`` // Optional used for details summary 
    payload:{data:product}, cause: undefined 
  }

  catch(err){
    const jsonMessage = { 
      status: hasJsonMessage.ERROR, 
      message:`Product not found`, 
      code:``// Optional used for details summary 
      payload:{data:product}, cause: err 
    }
  }
```

* excepcion : para el uso de PascalCase en la nomenclatura 
a ) Exportar `Class`
Para :
```javascript
export default class GetProductModel {...}
```
Realizamos :
```javascript
const productService = new ProductService(ProductModel, GetProductModel, productDao, uuidv4)
```
b) Exportar `const`
```javascript
let productDao
switch (config.PERSISTENCE) {
    case 'mongodb':
        const { default: ProductsDaoMongodb } = await import('./mongodb/product.mongodb.dao.js')
        const { default: mongooseProductModel } = await import('./mongodb/product.mongoose.model.js')
        productDao = new ProductsDaoMongodb(mongooseProductModel)
    break
    ...
export { productDao }
```
* Nomenclatura para file ( archivo ) a ser exportado
```javascript
//Product concepts
product.route.js
product.controller.js
product.service.js
product-mongodb.dao.js
product-mongoose.model.js
product.validator.js
//Global concepts
isAdmin.middleware.js
index-email-sender.js
index-sms-sender.js
index-path.util.js

```

Realizamos :
```javascript
const productService = new ProductService(ProductModel, GetProductModel, productDao, uuidv4)
```

* diferencia : res.send() , res.json() , res.end() [ver mas](https://medium.com/gist-for-js/use-of-res-json-vs-res-send-vs-res-end-in-express-b50688c0cddf)


* Atajos de teclado para windows 10 [ver mas](https://www.xataka.com/basics/estos-son-los-mejores-gestos-y-atajos-de-teclado-para-windows-10)

* Conceptos : 

- JSON Payload : Payload is the essential information in a data block that you send to or receive from the server when making API requests. The Payload can be sent or received in a variety of formats, including JSON.31 oct 2021
- Response.ok : 
La propiedad de solo lectura ok de la interfaz Response contiene un Booleano que indica si la respuesta fue exitosa (estado en un rango de 200 a 299) o no. [ver mas](https://developer.mozilla.org/es/docs/Web/API/Response/ok)

* Librarys :
- Free Icons SVG : [ver mas](https://heroicons.dev/)
- Free Icons SVG(blog) : [ver mas](https://themesberg.com/blog/open-source/10-open-source-free-svg-icon-libraries)
- Tailwind CSS : [ver mas](https://tailwindui.com/)
- Tailwind CSS Components : [ver mas](https://tailwindui.com/)
- Tailwind CSS eCommerce : [ver mas](https://tailwindui.com/components/ecommerce/components/shopping-carts)
- Tailwind CSS : Visa, MasterCard, etc [ver mas](https://flowbite.com/docs/components/buttons/)
 
* MongoDB: [ver mas](https://geekflare.com/es/mongodb-queries-examples/)
- regex : [ver mas](https://www.mongodb.com/docs/manual/reference/operator/query/regex/#op._S_regex)
- Json Viewer Parser : http://jsonviewer.stack.hu/

* email Temporal [ver mas](https://temp-mail.org/es/)
* ethereal : [ver mas](https://ethereal.email/)
* script : [ver mas](https://lenguajehtml.com/html/scripting/etiquetas-html-scripts/)

* Express-validators (sanitizers) [ver mas](https://github.com/validatorjs/validator.js#sanitizers)
  - ejemplos [ver mas](https://codigoencasa.com/validacion-de-entradas-de-usuario-en-su-aplicacion-express-js-con-express-validator/)
* SMS : [ver mas](https://www.twilio.com/es-mx/)
* await : [ver mas](https://dev.to/lydiahallie/javascript-visualized-promises-async-await-5gke)
* handleBars : 
  - with express  [ver mas](https://www.npmjs.com/package/express-handlebars)
  - register helpers : [ver mas](https://es.stackoverflow.com/questions/410141/dificultad-con-handlebars-registerhelper-en-handlebars)
  - Ejemplos helpers : [ver mas](https://www.cloudhadoop.com/handlebarjs-if-helper/)

* ecomerce 
  - Front ReactJS y Backend : [ver mas](https://www.youtube.com/watch?v=R4eLKuzg2WU)


  * bugs : 
   - redirect after a fetch post call [ver mas](https://stackoverflow.com/questions/39735496/redirect-after-a-fetch-post-call)

   * mongoDB :
   - arrays parte 1 : [ver mas](https://dev.to/paulasantamaria/mongodb-animated-adding-and-removing-elements-from-arrays-50cl) 
   - arrays parte 2 : [ver mas](https://dev.to/paulasantamaria/mongodb-animated-updating-elements-in-arrays-2phi)

   * HandleBars : 
   - Manual : [ver mas](https://1library.co/document/ydljjd6z-handlebars-introducci%C3%B3n-instalaci%C3%B3n-handlebars-copyright-academy-reservados-derechos.html)

* http Erros : 
  - 200 “OK” – La respuesta para una solicitud HTTP exitosa. El resultado dependerá del tipo de solicitud.
  - 201 “Created” – La solicitud se cumplió y el servidor creó un nuevo recurso.
  - 204 “No Content” – El servidor cumplió con la solicitud pero no devolverá ningún contenido.
  - 400 “Bad Request” – El servidor no puede devolver una respuesta válida debido a un error del lado del cliente. Las causas comunes son URL solicitadas con formato incorrecto, enrutamiento de solicitud engañoso, tamaño de archivo grande, etc.
  - 403 “Forbidden” – El error indica que el servidor deniega el acceso a un usuario que no tiene permiso para acceder a los recursos. Este error es similar al código HTTP 401, pero la diferencia es que en este caso, se conoce la identidad del usuario.
  - 409 “Conflict” – Este error ocurre cuando una solicitud no se puede procesar debido a un conflicto en el estado actual del recurso en el servidor. Un ejemplo de este error es cuando se envían múltiples ediciones del mismo archivo al servidor, y las ediciones entran en conflicto entre sí.
  - 422 “Unprocessable Entity” – La solicitud del cliente está bien formada pero contiene errores semánticos que impiden que el servidor procese una respuesta. -->