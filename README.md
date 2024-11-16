## Arquitectura

Utilizaremos una SPA simple para este caso, sin más esfuerzos que el create app nativo de React. le Añadiremos craco para poder usar aliases en las rutas de import y facilitar el desarrollo.

1. **Capa de UI / componentes**: Contiene todos los componentes de UI que se encargan de renderizar la interfaz visual. Cada componente tiene su propio archivo de estilos y se organiza en carpetas por funcionalidad. Contiene los componentes que cargan el modulo correspondiente segun el router.
2. **Capa de Business / hooks**: En esta capa se encuentran los hooks y contextos que manejan el estado y las reglas de negocio. La lógica de la aplicación se aísla aquí para facilitar el mantenimiento.

3. **Capa de Configuración / config**: En esta capa tenemos archivos para alterar la configuracion de la applicacion así como los componentes que proporcionan providers o gestión de los Storages.

4. **Capa de servicio / api**: Esta capa centraliza todas las llamadas a servicios externos y APIs, lo cual permite que las capas superiores solo se comuniquen a través de funciones definidas en los servicios.

### Ventajas

- **Escalabilidad**: La separación de responsabilidades permite agregar nuevas funcionalidades sin afectar el código existente.
- **Modularidad**: Cada capa es independiente y puede ser modificada o reemplazada con mínimas repercusiones en el resto de la aplicación.
- **Mantenimiento**: Los archivos de configuración aislados permiten afinar la aplicación rápidamente.

### Notas

- **acerca de SASS** : En mi opinión personal, los procesadores de CSS nacen para cubrir necesidades que hoy en dia cubre mucho mejor un procesador de CSS javascript como por ejemplo emotion/styled, ya que estos gestionan mejor los cambios de estado para alterar sus variables.

- **IA** : Nos servimos de Codeium para generar ágilmente la documentación, pero siempre revisandola antes.
- **formatter** : Prettier
- **Nomenclatura** : Optamos por camelCase para las variables
- **localization** : Usamos i18next para dejar todos los textos en un diccionario y una fácil traducción posterior si fuera necesaría

### Cambios en el diseño propuesto

- **Lista de podcasts** : Reducimos el espacio entre rows. Igualamos el height de cada card. Añadimos ellipsis para los textos muy largos. Añadimos sombreado suave superior a las imagenes para evitar mala visualización de las imagenes de fondo blanco. Añadimos pequeña animacion al hover.
