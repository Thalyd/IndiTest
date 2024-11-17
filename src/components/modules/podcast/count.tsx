import { useTranslation } from "react-i18next";

interface CountProps {
  amount: number;
}

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
