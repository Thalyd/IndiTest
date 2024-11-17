import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import List from "@Modules/list/List";
import Podcast from "@Modules/podcast/Podcast";
import Episode from "@Modules/episode/Episode";
import React from "react";

interface RouterProps {
  Layout: React.FC<{ children: React.ReactNode }>;
}

/**
 * Router es un componente que utiliza React Router para gestionar las
 * rutas de la aplicación.
 *
 * La ruta raiz muestra la lista de podcasts y cada podcast en una ruta
 * como "podcast/:podcastId". Dentro de cada podcast, se muestra el
 * componente Podcast y se crea una ruta hija para cada episodio
 * como "episode/:episodeId". La ruta hija muestra el componente Episode.
 *
 * @param {RouterProps} props
 * - Layout: el componente que se usará como layout para la aplicación.
 *   Debe ser un componente que renderize un <Outlet />
 *   para mostrar el contenido de la ruta actual.
 *
 * @returns {JSX.Element}
 * - un elemento JSX que contiene la configuración de las rutas.
 */
export default function Router({ Layout }: RouterProps) {
  return (
    <BrowserRouter basename="">
      <Layout>
        <Routes>
          <Route path="" element={<List />} />
          <Route
            path="podcast/:podcastId"
            element={<Outlet context={{ fromOutlet: false }} />} // Default context
          >
            {/* Podcast at the base route */}
            <Route
              index
              element={
                <>
                  <Podcast />
                </>
              }
            />

            {/* Podcast + Episode */}
            <Route
              path="episode/:episodeId"
              element={
                <>
                  <Podcast clear />
                  <Episode />
                </>
              }
            />
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
