
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"

import List from "../components/modules/list/List"
import Podcast from "../components/modules/podcast/Podcast"
import Episode from "../components/modules/episode/Episode"


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