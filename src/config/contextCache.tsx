import { createContext, useEffect, useMemo, useState } from "react";
import { ITunesListItem } from "@Api/useGetPodcasts";
import clearTimeZone from "@Utils/clearTimeZone";
import { CacheMemory } from "@Config/constants";
import { PodData } from "@Api/useGetPodcastSingle";

export const CacheMem = createContext(null);

const rightNow = clearTimeZone(new Date());
const tomorrow = new Date(
  new Date(rightNow).setTime(rightNow.getTime() + CacheMemory)
);

interface PodDataWithMem extends PodData {
  lastSesion: Date;
  expireDate: Date;
}

/**
 * El proveedor de contexto para la cache de la aplicación.
 *
 * Este proveedor crea, gestiona y proporciona una cache de la lista de
 * podcasts y sus correspondientes datos individuales. La cache se guarda
 * en el almacenamiento local del navegador y se actualiza cada vez que
 * se cambia una de las listas.
 *
 * El proveedor expone las siguientes propiedades:
 * - podList: La lista de podcasts.
 * - podsData: La lista de los datos individuales de los podcasts.
 * - setPodList: La función para actualizar la lista de podcasts.
 * - setPodsData: La función para actualizar la lista de los datos individuales
 *   de los podcasts.
 * - updatePodList: La función para actualizar la lista de los datos individuales
 *   de un podcast.
 * - getPodcast: La función para obtener los datos de un podcast.
 * - getEpisode: La función para obtener los datos de un episodio.
 * - updateList: La función para actualizar la lista de podcasts.
 *
 * @param {children?: React.ReactNode} Los componentes hijos que se
 *   renderizarán con el proveedor de contexto.
 * @returns {JSX.Element} El proveedor de contexto que renderiza los
 *   componentes hijos.
 */

export default function ContextCache({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [podList, setPodList] = useState<ITunesListItem[]>([]);
  const [podsData, setPodsData] = useState<PodData[]>([]);

  const storedSession = localStorage.getItem("session");
  const session = JSON.parse(storedSession);

  if (!storedSession) {
    createSession();
  } else {
    checkHealth();
  }

  function checkHealth() {
    if (new Date(new Date(session.expireDate).getTime()) < rightNow) {
      localStorage.removeItem("session");
    }

    const podsToRemove = podsData.map((pod: PodDataWithMem) => {
      if (0 > 23) {
        //
        return pod.id;
      }
    });

    if (podList.length === 0 && session.podList.length > 0) {
      setPodList(session.podList);
    }

    if (podsData.length === 0 && session.podsData.length > 0) {
      setPodsData(session.podsData);
    }

    if (podsData.length > 0) {
      removePodFromSession(podsToRemove);
    }
  }

  useEffect(() => {
    if (podList.length > 0 && !storedSession) {
    }
  }, [podList, storedSession]);

  function removePodFromSession(ids: number[]) {
    const localStoredSession = localStorage.getItem("session");
    const localSession = JSON.parse(localStoredSession);
    const UpdateSesion = {
      ...localSession,
      podsData: localSession.podsData.filter(
        (pod: PodData) => !ids.includes(pod.id)
      ),
    };
    localStorage.setItem("session", JSON.stringify(UpdateSesion));
  }

  function updatePodList(newPod: PodData) {
    const localStoredSession = localStorage.getItem("session");
    const localSession = JSON.parse(localStoredSession);

    if (localSession) {
      const UpdateSesion = {
        ...session,
        podsData: [
          ...podsData,
          { ...newPod, lastSesion: rightNow, expireDate: tomorrow },
        ],
      };
      localStorage.setItem("session", JSON.stringify(UpdateSesion));
      setPodsData([...podsData, newPod]);
    } else {
      updatePodList(newPod);
    }
  }

  function updateList(newPods: ITunesListItem[]) {
    const localStoredSession = localStorage.getItem("session");
    const localSession = JSON.parse(localStoredSession);
    if (localSession) {
      const UpdateSesion = {
        podList: newPods,
        lastSession: rightNow,
        expireDate: tomorrow,
        podsData: localSession.podsData ?? [],
      };
      localStorage.setItem("session", JSON.stringify(UpdateSesion));
      setPodList(newPods);
    } else {
      updateList(newPods);
    }
  }

  function createSession() {
    const localSession = {
      podList: [],
      lastSession: undefined,
      expireDate: undefined,
      podsData: [],
    };
    localStorage.setItem("session", JSON.stringify(localSession));
  }

  function getPodcast(id: string) {
    return podsData.find((pod: PodData) => pod.id === Number(id));
  }

  function getEpisode(podcastId: string, episodeId: string) {
    return podsData
      .find((pod: PodData) => pod.id === Number(podcastId))
      .episodes.find((episode: any) => episode.id === Number(episodeId));
  }

  const cacheValue = useMemo(
    () => ({
      podList,
      setPodList,
      podsData,
      setPodsData,
      updatePodList,
      getPodcast,
      getEpisode,
      updateList,
    }),
    [
      podList,
      setPodList,
      podsData,
      setPodsData,
      updatePodList,
      getPodcast,
      getEpisode,
      updateList,
    ]
  );

  return <CacheMem.Provider value={cacheValue}>{children}</CacheMem.Provider>;
}
