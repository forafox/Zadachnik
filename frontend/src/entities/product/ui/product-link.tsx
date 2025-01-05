import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Product } from "../api";

export type Section = "tasks" | "releases";

type Props = {
  product: Product;
  section?: Section;
  className?: string;
  before?: React.ReactNode;
};

export function ProductLink({ product, section, before, ...props }: Props) {
  const { t } = useTranslation("product");

  if (section == undefined) {
    return (
      <Link
        to="/products/$productId"
        params={{ productId: String(product.id) }}
        {...props}
      >
        {before}
        {product.title}
      </Link>
    );
  }

  return (
    <Link
      to={`/products/$productId/${section}`}
      params={{ productId: String(product.id) }}
      {...props}
    >
      {before}
      {t(`items.${section}.label`)}
    </Link>
  );
}
