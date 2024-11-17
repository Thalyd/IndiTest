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
 * ContextCache es un contexto que envuelve toda la aplicación y almacena
 * la lista de podcasts en el almacenamiento local. La lista de podcasts se almacena en
 * el almacenamiento local con una marca de tiempo de cuándo se almacenó y una marca de tiempo de
 * vencimiento. La lista de podcasts solo se recupera del almacenamiento local
 * si la marca de tiempo de vencimiento es en el futuro.
 *
 * @param {{ children?: React.ReactNode; }} props
 * - children: los componentes secundarios que se envolverán en el contexto.
 *
 * @returns {JSX.Element}
 * - un elemento JSX que envuelve a los secundarios con el proveedor de contexto.
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

  const cacheValue = useMemo(
    () => ({
      podList,
      setPodList,
      podsData,
      setPodsData,
      updatePodList,
      getPodcast,
      updateList,
    }),
    [
      podList,
      setPodList,
      podsData,
      setPodsData,
      updatePodList,
      getPodcast,
      updateList,
    ]
  );

  return <CacheMem.Provider value={cacheValue}>{children}</CacheMem.Provider>;
}
