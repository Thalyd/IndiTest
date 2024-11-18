import Icon from "@Components/icon/icon";
import "./searchTool.scss";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

interface SearchToolProps {
  UpdateParent: (value: string) => void;
  Count: number;
  debounce?: boolean;
}

/**
 * Un componente funcional que muestra una herramienta de búsqueda con una entrada de texto y una pantalla de recuento.
 *
 * Este componente utiliza la internacionalización para el marcador de posición de entrada y actualiza el componente padre
 * con el valor de entrada. Admite debounce para limitar la frecuencia de las actualizaciones.
 *
 * @param {SearchToolProps} props
 * - UpdateParent: una función para actualizar el componente padre con el valor de entrada.
 * - Count: un número que representa el recuento que se mostrar .
 * - debounce: un booleano opcional para habilitar debounce de los cambios de entrada. El valor predeterminado es true.
 *
 * @returns {JSX.Element} Un div que contiene la entrada de búsqueda y la pantalla de recuento.
 */
export default function SearchTool({
  UpdateParent,
  Count,
  debounce = true,
}: SearchToolProps) {
  const { t } = useTranslation();
  const [value, setValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, 500); // Delay in milliseconds

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  useEffect(() => {
    UpdateParent(debouncedValue);
  }, [debouncedValue, UpdateParent]);

  function Update(newValue: string) {
    setValue(newValue);
    UpdateParent(newValue);
  }

  return (
    <div className="searchTool">
      <span>{Count}</span>
      <input
        placeholder={t("list.placeholder")}
        type="text"
        value={value}
        onChange={e => {
          debounce ? setValue(e.target.value) : Update(e.target.value);
        }}
      />
      {value !== "" && (
        <div
          className="clear"
          onClick={() => {
            debounce ? setValue("") : Update("");
          }}
        >
          <Icon name="Close" />
        </div>
      )}
    </div>
  );
}
