import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
interface InfoProps {
  podcast: any;
  clear?: boolean;
}
/**
 * Un componente que muestra la información del podcast seleccionado.
 *
 * El componente recibe un objeto con la información del podcast
 * y un booleano para mostrar la imagen del podcast como enlace.
 *
 * @param {{podcast: ITunesListItem, clear: boolean}} props
 *    - podcast: el objeto con la información del podcast
 *    - clear: un booleano para mostrar la imagen como enlace
 *
 * @returns {JSX.Element} un div que contiene la información del
 * podcast
 */
export default function Info({ podcast, clear }: InfoProps) {
  const { t } = useTranslation();
  return (
    <div className={"info"}>
      <div>
        {clear ?
          <Link to="../">
            <img src={podcast.image} alt={podcast.name} />
          </Link>
        : <img src={podcast.image} alt={podcast.name} />}
      </div>
      <div>
        <p>
          {clear ?
            <Link to="../">{podcast.name}</Link>
          : podcast.name}
        </p>
        <p>
          {t("generics.by")} {podcast.author}
        </p>
      </div>

      <div>
        <p>{t("generics.description")}:</p>
        <p>{podcast.description ?? t("noDescription")}</p>
      </div>
    </div>
  );
}
