"use client";

import { type AnimationControls, motion } from "motion/react";
import type { Transition, Variants } from "motion/react";

const defaultTransition: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 12,
  mass: 0.4,
};

const rockingVariants: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: [-5, 5, -5],
    transition: {
      repeat: Infinity,
      repeatType: "mirror" as const,
      duration: 1.2,
      ease: "easeInOut",
    },
  },
};

const RockingChairIcon = ({ controls }: { controls: AnimationControls }) => {
  return (
    <div className="flex cursor-pointer select-none items-center justify-center rounded-md transition-colors duration-200 hover:bg-accent">
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={rockingVariants}
        animate={controls}
        style={{ originX: "10%", originY: "90%" }}
      >
        <motion.polyline
          points="3.5 2 6.5 12.5 18 12.5"
          animate={controls}
          transition={defaultTransition}
        />
        <motion.line
          x1="9.5"
          x2="5.5"
          y1="12.5"
          y2="20"
          animate={controls}
          transition={defaultTransition}
        />
        <motion.line
          x1="15"
          x2="18.5"
          y1="12.5"
          y2="20"
          animate={controls}
          transition={defaultTransition}
        />
        <motion.path
          d="M2.75 18a13 13 0 0 0 18.5 0"
          animate={controls}
          transition={defaultTransition}
        />
      </motion.svg>
    </div>
  );
};

export { RockingChairIcon };
