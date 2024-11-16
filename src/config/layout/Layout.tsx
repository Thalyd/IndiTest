import "./layout.scss";
import { useTranslation } from "react-i18next";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { t } = useTranslation();
  return (
    <div className="layout">
      <header>{t("title")} </header>
      <div id="content">{children}</div>
    </div>
  );
}
