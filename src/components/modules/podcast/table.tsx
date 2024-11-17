import { Episode } from "@Api/useGetPodcastSingle";
import dayFormat from "@Components/utils/dayFormat";
import timeFormat from "@Components/utils/timeFormat";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
interface TableProps {
  list: Episode[];
}

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
            <p>{timeFormat(item.duration)}</p>
          </Link>
        </li>
      ))}
    </ol>
  );
}
