import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import List from "@Modules/list/List";
import Podcast from "@Modules/podcast/Podcast";
import Episode from "@Modules/episode/Episode";
import React from "react";

interface RouterProps {
  Layout: React.FC<{ children: React.ReactNode }>;
}

/**
 * Un enrutador que renderiza una lista de podcasts en la ruta raíz y un podcast en
 * la ruta "podcast/:podcastId". Si la ruta es "podcast/:podcastId/episode/:episodeId",
 * renderiza el podcast y su episodio.
 *
 * @param {RouterProps} props
 * - Diseño: un componente React con el que envolver las rutas.
 *
 * @returns {JSX.Element} un componente BrowserRouter con las rutas especificadas.
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
            <Route
              index
              element={
                <>
                  <Podcast />
                </>
              }
            />

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
