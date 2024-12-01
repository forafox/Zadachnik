import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Product } from "../api";

export type Section = "issues" | "releases";

type Props = {
  product: Product;
  section?: Section;
  className?: string;
};

export function ProductLink({ product, section, ...props }: Props) {
  const { t } = useTranslation("product");

  if (section == undefined) {
    return (
      <Link
        to="/products/$productId"
        params={{ productId: String(product.id) }}
        {...props}
      >
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
      {t(`items.${section}.label`)}
    </Link>
  );
}
