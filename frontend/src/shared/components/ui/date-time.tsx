import { useTranslation } from "react-i18next";

export function DateTime({ value }: { value: Date }) {
  const { i18n } = useTranslation();

  const locale = i18n.language || "en-US";

  const format = (date: Date) =>
    new Intl.DateTimeFormat(locale, {
      dateStyle: "long",
      timeStyle: "short",
    })
      .format(date)
      .replace(" at ", " ");

  return format(value);
}
