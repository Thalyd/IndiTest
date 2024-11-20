import "./noResults.scss";
import { useTranslation } from "react-i18next";

/**
 * Un componente funcional que muestra un mensaje cuando no se encuentran resultados.
 *
 * El componente utiliza la internacionalización para mostrar un mensaje traducido
 * dentro de un elemento div con estilo. Se basa en la clave de traducción "list.noResults"
 * para obtener el mensaje apropiado.
 *
 * @returns {JSX.Element} Un div con un mensaje que indica que no hay resultados.
 */
export default function NoResults() {
  const { t } = useTranslation();

  return (
    <div className="noResults">
      <p>{t("list.noResults")}</p>
    </div>
  );
}
