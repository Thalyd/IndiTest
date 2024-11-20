import { Episode } from "@Api/useGetPodcastSingle";
import dayFormat from "@Components/utils/dayFormat";
import timeFormat from "@Components/utils/timeFormat";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
interface TableProps {
  list: Episode[];
}

/**
 * Un componente de tabla que muestra una lista de episodios.
 *
 * El componente muestra el título, la fecha y la duración de cada episodio en una tabla.
 * El usuario puede navegar a la página del episodio haciendo clic en el título del episodio.
 *
 * @param {TableProps} props
 * - lista: una matriz de objetos Episode.
 *
 * @returns {JSX.Element} un elemento JSX que representa el componente.
 */
export default function Table({ list }: TableProps) {
  const { t } = useTranslation();

  return (
    <ol className="table">
      <li>
        <p>{t("table.title")}</p>
        <p>{t("table.date")}</p>
        <p>{t("table.duration")}</p>
      </li>
      {list.map((item, index) => (
        <li key={index}>
          <Link to={"./episode/" + item.id}>
            <p>{item.title}</p>
            <p>{dayFormat(item.date)}</p>
            <p>
              {item.duration !== null ?
                timeFormat(item.duration)
              : t("table.unknown")}
            </p>
          </Link>
        </li>
      ))}
    </ol>
  );
}
