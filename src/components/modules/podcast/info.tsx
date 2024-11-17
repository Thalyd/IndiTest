import { useTranslation } from "react-i18next";
interface InfoProps {
  podcast: any;
}
export default function Info({ podcast }: InfoProps) {
  const { t } = useTranslation();
  return (
    <div className="info">
      <div>
        <img src={podcast.image} alt={podcast.name} />
      </div>
      <div>
        <p>{podcast.name}</p>
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
