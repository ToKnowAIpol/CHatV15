"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useThemeContext } from "@/contexts/ThemeContext";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  const { theme } = useThemeContext();
  
  // Different background colors for light and dark modes
  const backgroundColors = {
    light: [
      "rgb(241 245 249)", // slate-100
      "rgb(255 255 255)", // white
      "rgb(248 250 252)", // slate-50
    ],
    dark: [
      "rgb(15 23 42)", // slate-900
      "rgb(0 0 0)", // black
      "rgb(23 23 23)", // neutral-900
    ]
  };

  // Different gradient colors for light and dark modes
  const linearGradients = {
    light: [
      "linear-gradient(to bottom right, rgb(6 182 212), rgb(16 185 129))", // cyan-500 to emerald-500
      "linear-gradient(to bottom right, rgb(236 72 153), rgb(99 102 241))", // pink-500 to indigo-500
      "linear-gradient(to bottom right, rgb(249 115 22), rgb(234 179 8))", // orange-500 to yellow-500
    ],
    dark: [
      "linear-gradient(to bottom right, rgb(6 182 212), rgb(16 185 129))", // cyan-500 to emerald-500
      "linear-gradient(to bottom right, rgb(236 72 153), rgb(99 102 241))", // pink-500 to indigo-500
      "linear-gradient(to bottom right, rgb(249 115 22), rgb(234 179 8))", // orange-500 to yellow-500
    ]
  };

  const [backgroundGradient, setBackgroundGradient] = useState(
    linearGradients[theme][0]
  );

  useEffect(() => {
    setBackgroundGradient(linearGradients[theme][activeCard % linearGradients[theme].length]);
  }, [activeCard, theme]);

  return (
    <motion.div
      animate={{
        backgroundColor: backgroundColors[theme][activeCard % backgroundColors[theme].length],
      }}
      className="h-screen overflow-y-auto flex flex-col lg:flex-row justify-center relative lg:space-x-10"
      ref={ref}
    >
      <div className="div relative flex items-start px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-20">
              <motion.h2
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-2xl font-bold text-slate-900 dark:text-slate-100"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-kg text-slate-700 dark:text-slate-300 max-w-sm mt-4 mb-6"
              >
                {item.description}
              </motion.p>
              
              {/* Mobile content - shown only on small screens */}
              <div 
                className={`lg:hidden rounded-md overflow-hidden h-48 w-full mt-4 mb-8 ${activeCard === index ? 'block' : 'hidden'}`}
                style={{ 
                  background: index % 2 === 0 ? linearGradients[theme][index % linearGradients[theme].length] : undefined 
                }}
              >
                {item.content}
              </div>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      
      {/* Desktop sticky content - hidden on small screens */}
      <div
        style={{ background: backgroundGradient }}
        className={cn(
          "hidden lg:block h-80 w-96 rounded-md bg-white sticky top-1/4 overflow-hidden",
          contentClassName
        )}
      >
        {content[activeCard].content ?? null}
      </div>
    </motion.div>
  );
};
