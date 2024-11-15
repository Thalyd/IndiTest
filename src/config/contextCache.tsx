import { createContext, useEffect, useMemo, useState } from "react";
import { ITunesListItem } from "../api/useGetPodcasts";
import clearTimeZone from "../components/shared/utils/clearTimeZone";
import { CacheMemory } from "./constants";

export const CacheMem = createContext(null);

const rightNow = clearTimeZone(new Date());
const tomorrow = new Date(
  new Date(rightNow).setTime(rightNow.getTime() + CacheMemory)
);

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

  const storedSession = localStorage.getItem("session");

  if (storedSession) {
    const session = JSON.parse(storedSession);
    console.log("expireDate", new Date(new Date(session.expireDate).getTime()));
    console.log("rightNow", rightNow);
    if (new Date(new Date(session.expireDate).getTime()) < rightNow) {
      localStorage.removeItem("session");
    }
  }

  if (storedSession && podList.length === 0) {
    const session = JSON.parse(storedSession);

    setPodList(session.podList);
  }

  useEffect(() => {
    if (podList.length > 0 && !storedSession) {
      const sessionObject = {
        podList: podList,
        lastSession: rightNow,
        expireDate: tomorrow,
      };
      localStorage.setItem("session", JSON.stringify(sessionObject));
    }
  }, [podList, storedSession]);

  const cacheValue = useMemo(
    () => ({
      podList,
      setPodList,
    }),
    [podList, setPodList]
  );

  return <CacheMem.Provider value={cacheValue}>{children}</CacheMem.Provider>;
}
