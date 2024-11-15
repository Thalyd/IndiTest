
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"

import List from "../components/modules/list/List"
import Podcast from "../components/modules/podcast/Podcast"
import Episode from "../components/modules/episode/Episode"


/**
* El enrutador principal de la aplicación. Este componente es el
* punto de entrada al sistema de enrutamiento y configura las rutas de nivel superior
* de la aplicación.
*
* El enrutador es un BrowserRouter de react-router-dom y
* usa el componente Routes para configurar las rutas. Las rutas
* son las siguientes:
*
* - / : La ruta raíz, que muestra el componente List.
* - /podcast/:podcastId : Una ruta que muestra el componente Podcast
*. El parámetro :podcastId se pasa al componente Podcast
* como una propiedad.
* - /podcast/:podcastId/episode/:episodeId : Una ruta que muestra
* el componente Episode. Los parámetros :podcastId y :episodeId
* se pasan al componente Episode como propiedades.
*
* El componente Outlet se usa para representar las rutas secundarias de
* cada ruta. El componente Router es el punto de entrada principal a
* la aplicación y lo utiliza el componente App para representar
* las rutas.
*/
export default function Router(){

    return (
        <BrowserRouter basename="">
        <Routes>
            <Route path="" element={<List/>}   />
            <Route path="podcast/:podcastId" element={<><Podcast/><Outlet/></>}   >
                <Route path="episode/:episodeId" element={<Episode/>}   />
            </Route>
        </Routes> 
        </BrowserRouter>
        )
        
    
}