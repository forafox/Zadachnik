import React from "react";

const featureFlags = {
  teams: {
    meetings: import.meta.env.DEV,
    sprints: import.meta.env.DEV,
  },
  products: {
    issues: import.meta.env.DEV,
    releases: import.meta.env.DEV,
  },
};

export type FlattenedKeys<T, Prefix extends string = ""> =
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

export type FeatureFlagKey = FlattenedKeys<typeof featureFlags>;

type Props = React.PropsWithChildren<{
  flag: FeatureFlagKey;
  fallback?: React.ReactNode;
}>;

// eslint-disable-next-line react-refresh/only-export-components
export function resolveNestedKey<T extends Record<string, unknown>>(
  object: T,
  key: FlattenedKeys<T>,
) {
  const keys = key.split(".");
  let current = object;

  for (let i = 0; i < keys.length; i++) {
    let currentKey = keys[i];
    while (!(currentKey in current) && i < keys.length) {
      i++;
      currentKey += "." + keys[i];
    }

    // @ts-expect-error can't type that
    current = current[currentKey];
  }

  return current;
}

function resolveFeatureFlag(flag: FeatureFlagKey) {
  return resolveNestedKey(featureFlags, flag);
}

export function FeatureFlag({ children, flag, fallback }: Props) {
  const enabled = resolveFeatureFlag(flag);

  if (enabled) {
    return children;
  }

  return fallback;
}
