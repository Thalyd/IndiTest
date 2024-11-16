import { Link } from "react-router-dom";
import "./layout.scss";
import { useTranslation } from "react-i18next";

interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Un componente de diseño que representa un header y un área de contenido.
 * El header es actualmente está diseñado para que su fuente se haga mas grande mientras mas pequeña sea la pantalla.
 *
 * @param {React.ReactNode} children: el contenido que se representará en el área de contenido.
 *
 * @returns {JSX.Element} Un elemento JSX que representa el componente.
 */
export default function Layout({ children }: LayoutProps) {
  const { t } = useTranslation();
  return (
    <div className="layout">
      <header>
        <Link to="/">{t("title")}</Link>
      </header>
      <div id="content">{children}</div>
    </div>
  );
}
