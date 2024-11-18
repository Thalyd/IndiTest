import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useRef, useState } from "react";
import { CorrsEvader } from "@Config/constants";

interface useAxiosProps {
  url: string;
  type?: "GET" | "POST" | "PUT" | "DELETE";
  time?: number;
  skip?: boolean;
}

/**
 * Hook personalizado para obtener datos de una API.
 *
 * Este hook admite opciones para especificar la url, el tipo de solicitud (GET, POST, PUT, DELETE)
 * y un valor booleano para saltar la solicitud.
 *
 * @param {useAxiosProps} props
 * - url: la url de la API que se va a llamar.
 * - type: el tipo de solicitud (GET, POST, PUT, DELETE). Por defecto se utiliza GET.
 * - skip: booleano para saltar la solicitud. Por defecto es false.
 *
 * @returns {Object} Un objeto que contiene:
 * - data: los datos obtenidos de la API.
 * - loading: booleano que indica si los datos se est n obteniendo.
 * - complete: booleano que indica si la operación de obtención se ha completado.
 * - error: el error que se produjo durante la obtenci n de los datos.
 */

export default function useApiCall({
  url,
  type = "GET",
  skip = false,
}: useAxiosProps) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [complete, setComplete] = useState(false);

  const Initiated = useRef(false);

  useEffect(() => {
    function fetchData() {
      switch (type) {
        case "GET":
          axios
            .get(CorrsEvader + encodeURIComponent(url), {})
            .then((res: AxiosResponse) => {
              setData(JSON.parse(res.data.contents));
            })
            .catch((error: AxiosError) => {
              window.alert("error : " + url + ": " + error.message);
              setError(error);
            })
            .finally(() => {
              setLoading(false);
              setComplete(true);
            });

          break;
        case "POST": // no need to develop
          break;
        case "PUT": // no need to develop
          break;
        case "DELETE": // no need to develop
          break;
      }
    }
    if (!Initiated.current && !skip) {
      Initiated.current = true;
      setLoading(true);
      setComplete(false);
      fetchData();
    }
  }, [url, type, loading, complete, skip]);

  return { data, loading, complete, error };
}
