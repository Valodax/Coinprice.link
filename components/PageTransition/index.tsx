"use client";
import React, { useContext, forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { NavigationDirectionContext } from "@/context/NavigationContext";

type PageTransitionProps = HTMLMotionProps<"div">;
type PageTransitionRef = React.ForwardedRef<HTMLDivElement>;

function PageTransition({ children, ...rest }: PageTransitionProps, ref: PageTransitionRef) {
    const onTheRight = { x: "100%" };
    const inTheCenter = { x: 0 };
    const onTheLeft = { x: "-100%" };

    const { navigationDirection } = useContext(NavigationDirectionContext);
    console.log("navigation direction transition", navigationDirection);
    const transition = { duration: 0.6, ease: "easeInOut" };

    const initial = navigationDirection === "left" ? onTheLeft : onTheRight;
    const exit = navigationDirection === "left" ? onTheRight : onTheLeft;

    return (
        <motion.div ref={ref} initial={initial} animate={inTheCenter} exit={exit} transition={transition} {...rest}>
            {children}
        </motion.div>
    );
}

export default forwardRef(PageTransition);
