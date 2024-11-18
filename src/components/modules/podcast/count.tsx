import { useTranslation } from "react-i18next";

interface CountProps {
  amount: number;
}

/**
 * Un componente funcional que muestra un recuento numérico.
 *
 * @param {CountProps} props
 * - amount: un número que representa la cantidad a mostrar.
 *
 * @returns {JSX.Element} Un elemento JSX que muestra el recuento formateado.
 */
export default function Count({ amount }: CountProps) {
  const { t } = useTranslation();
  return (
    <div className="count">
      <p>
        {t("generics.count")} : {amount}
      </p>
    </div>
  );
}
