import { ITunesListItem } from "../../../../api/useGetPodcasts";
import "./card.scss";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
interface CardProps {
  item: ITunesListItem;
}

/**
 * Un componente de lista que muestra una tarjeta de podcast.
 *
 * El componente recibe un objeto con la información del podcast y
 * devuelve un item de lista que contiene la imagen, el nombre y el
 * autor del podcast. El componente también está suscrito a la
 * internacionalización y utiliza el hook de navegación para abrir
 * la página del podcast al hacer clic en la tarjeta.
 *
 * @param {{item: ITunesListItem}} props
 *    - item: el objeto con la informaci n del podcast
 *
 * @returns {JSX.Element} el item de lista con la tarjeta del
 * podcast
 */
export default function Card({ item }: CardProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  function openPodcast() {
    navigate("/podcast/" + item.id);
  }

  return (
    <li className="card" onClick={openPodcast}>
      <img src={item.image} alt={item.name} />
      <p>{item.name}</p>
      <p>
        {t("list.author")} : {item.author}
      </p>
    </li>
  );
}
