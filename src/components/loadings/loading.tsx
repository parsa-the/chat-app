"use client"

import { motion, Variants } from "motion/react"

function Loadingstate() {
    const dotVariants: Variants = {
        pulse: {
            scale: [1, 1.5, 1],
            transition: {
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
            },
        },
    }

    return (
        <motion.div
            animate="pulse"
            transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
            className="container"
        >
            <motion.div className="dot" variants={dotVariants} />
            <motion.div className="dot" variants={dotVariants} />
            <motion.div className="dot" variants={dotVariants} />
            <StyleSheet />
        </motion.div>
    )
}

function StyleSheet() {
    return (
        <style>
            {`
            .container {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 10px;
                margin-top:100px
            }

            .dot {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background-color: #8c8c8c;
                will-change: transform;
            }
            `}
        </style>
    )
}

export default Loadingstate
