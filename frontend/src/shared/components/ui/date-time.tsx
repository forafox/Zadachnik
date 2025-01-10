import { useTranslation } from "react-i18next";

export function DateTime({
  value,
  showTime = true,
}: {
  value: Date;
  showTime?: boolean;
}) {
  const { i18n } = useTranslation();

  const locale = i18n.language || "en-US";

  const format = (date: Date) =>
    new Intl.DateTimeFormat(locale, {
      dateStyle: "long",
      timeStyle: showTime ? "short" : undefined,
    })
      .format(date)
      .replace(" at ", " ");

  return format(value);
}
