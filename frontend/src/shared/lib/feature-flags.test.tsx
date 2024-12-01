import { describe, expect, it } from "vitest";
import {
  FlattenedKeys,
  resolveNestedKey,
} from "@/shared/lib/feature-flags.tsx";

type Expect<T extends true> = T;
type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
    ? true
    : false;

describe("FlattenedKeys", () => {
  it("infers simple object", () => {
    type obj = {
      a: boolean;
      b: boolean;
    };

    type Keys = FlattenedKeys<obj>;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type _test = Expect<Equal<Keys, "a" | "b">>;
  });

  it("infers complex object", () => {});
  type obj = {
    a: {
      b: {
        c: boolean;
      };
    };
  };
  type Keys = FlattenedKeys<obj>;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type _test = Expect<Equal<Keys, "a.b.c">>;
});

describe("resolveNestedKey", () => {
  it("resolves simple key", () => {
    const obj = {
      a: "abcde",
      b: "efgh",
    };

    expect(resolveNestedKey(obj, "a")).toBe(obj.a);
  });

  it("resolves nested keys", () => {
    const obj = {
      a: {
        b: {
          c: "adcde",
        },
      },
    };

    expect(resolveNestedKey(obj, "a.b.c")).toBe(obj.a.b.c);
  });

  it("resolves keys with dots", () => {
    const obj = {
      a: {
        "b.c": {
          d: "adcde",
        },
      },
    };

    expect(resolveNestedKey(obj, "a.b.c.d")).toBe(obj.a["b.c"].d);
  });

  it("returns undefined for bad key", () => {
    const obj = {
      "a.b": {
        "c.d": {
          e: "false",
        },
      },
    };

    // @ts-expect-error on purpose
    const result = resolveNestedKey(obj, "a.b.c.d.f");

    expect(result).toBeUndefined();
  });
});
