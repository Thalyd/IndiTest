import { Link } from "react-router-dom";
import "./layout.scss";
import { useTranslation } from "react-i18next";

interface LayoutProps {
  children: React.ReactNode;
}
/**
 * Un componente de diseño que envuelve a sus hijos con un encabezado y una sección de contenido.
 *
 * El encabezado contiene un enlace que lleva a la página de inicio, con el texto
 * traducido usando la biblioteca i18next.
 *
 * @param {LayoutProps} props: los props para el componente.
 * @param {React.ReactNode} props.children: los componentes secundarios que se van a representar
 * dentro del diseño.
 *
 * @returns {JSX.Element} Un elemento JSX que incluye un encabezado y una sección de contenido.
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
