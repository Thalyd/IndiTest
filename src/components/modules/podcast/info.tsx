import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
interface InfoProps {
  podcast: any;
  clear?: boolean;
}
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
