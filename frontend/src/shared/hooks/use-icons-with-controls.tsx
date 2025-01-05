import { AnimationControls, useAnimation } from "motion/react";

type Icon = React.FC<{ controls: AnimationControls }>;
type Icons<T extends string> = Record<T, Icon>;
type IconWithControls = {
  icon: Icon;
  controls: AnimationControls;
};
type Result<T extends string> = Record<T, IconWithControls>;

export function useIconsWithControls<T extends string>(
  icons: Icons<T>,
): Result<T> {
  const keys = Object.keys(icons) as T[];
  const controls: AnimationControls[] = new Array(keys.length).fill(0);
  for (let i = 0; i < controls.length; i++) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    controls[i] = useAnimation();
  }

  const result = controls
    .map((control, index) => {
      const key = keys[index];
      const Icon = icons[key] as Icon;
      return {
        [key]: {
          icon: Icon,
          controls: control,
        } as IconWithControls,
      };
    })
    .reduce((a, b) => ({ ...a, ...b }), {});

  return result as Result<T>;
}
