import React from "react";

const featureFlags = {
  teams: {
    meetings: false,
    sprints: false,
  },
  products: {
    issues: false,
    releases: false,
  },
};

type FlattenedKeys<T, Prefix extends string = ""> =
  T extends Record<string, Record<string, unknown>>
    ? {
        [K in keyof T]: FlattenedKeys<T[K], `${Prefix}${K & string}.`>;
      }[keyof T]
    : T extends Record<string, unknown>
      ? {
          [K in keyof T]: FlattenedKeys<T[K], `${Prefix}${K & string}`>;
        }[keyof T]
      : Prefix extends ""
        ? never
        : Prefix;

type FeatureFlagKey = FlattenedKeys<typeof featureFlags>;

type Props = React.PropsWithChildren<{
  flag: FeatureFlagKey;
  fallback?: React.ReactNode;
}>;

function resolveFeatureFlag(flag: FeatureFlagKey) {
  const keys = flag.split(".");
  return keys.reduce(
    // @ts-expect-error TODO: define keys
    (acc, key) => acc[key],
    featureFlags,
  );
}

export function FeatureFlag({ children, flag, fallback }: Props) {
  const enabled = resolveFeatureFlag(flag);

  if (enabled) {
    return children;
  }

  return fallback;
}
