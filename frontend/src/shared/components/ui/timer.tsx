"use client";

import type { AnimationControls, Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

const handVariants: Variants = {
  normal: {
    rotate: 0,
    originX: "12px",
    originY: "14px",
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  animate: {
    rotate: 300,
    transition: {
      delay: 0.1,
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const buttonVariants: Variants = {
  normal: {
    scale: 1,
    y: 0,
  },
  animate: {
    scale: [0.9, 1],
    y: [0, 1, 0],
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const TimerIcon = ({ controls }: { controls: AnimationControls }) => {
  return (
    <div className="flex cursor-pointer select-none items-center justify-center rounded-md transition-colors duration-200 hover:bg-accent">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.line
          x1="10"
          x2="14"
          y1="2"
          y2="2"
          animate={controls}
          variants={buttonVariants}
        />
        <motion.line
          x1="12"
          x2="15"
          y1="14"
          y2="11"
          initial="normal"
          animate={controls}
          variants={handVariants}
        />
        <circle cx="12" cy="14" r="8" />
      </svg>
    </div>
  );
};

export { TimerIcon };
