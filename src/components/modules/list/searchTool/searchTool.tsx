import "./searchTool.scss";
import { useTranslation } from "react-i18next";

interface SearchToolProps {
  UpdateParent: (value: string) => void;
  Count: number;
}

/**
 * Un componente funcional que muestra una herramienta de búsqueda con una entrada de texto
 * y una pantalla de recuento.
 *
 * El componente utiliza la internacionalización para el marcador de posición de entrada
 * y actualiza el componente principal con el valor de entrada.
 *
 * @param {SearchToolProps} props
 * - UpdateParent: una función para actualizar el componente principal con el valor de entrada.
 * - Count: un número que representa el recuento que se mostrará.
 *
 * @returns {JSX.Element} Un div que contiene la entrada de búsqueda y la pantalla de recuento.
 */
export default function SearchTool({ UpdateParent, Count }: SearchToolProps) {
  const { t } = useTranslation();

  return (
    <div className="searchTool">
      <span>{Count}</span>
      <input
        placeholder={t("list.placeholder")}
        type="text"
        onChange={e => {
          UpdateParent(e.target.value);
        }}
      />
    </div>
  );
}
