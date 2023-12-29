'use client'
import { motion, useAnimation } from "framer-motion";
import { useState } from "react";

const PageTransition = () => {
    const [open, setOpen] = useState(false);
    const control = useAnimation();

    const toggle = () => {
        setOpen(prev => !prev)
        animate(open)
    }

    const animate = async (isInitial: boolean) => {
        if (!isInitial) {
            await control.start({
                height: "100vh",
                width: "100vw",
                transition: {
                    duration: 1
                }
            })
    
            await control.start({
                background: "green",
                transition: {
                    duration: 1,
                    type: "spring",
                    
                },
            })
        } else {
            await control.start({
                height: "auto",
                width: "50vw",
                transition: {
                    duration: 1
                }
            })
    
            await control.start({
                background: "red",
                transition: {
                    duration: 1,
                    type: "spring"
                }
            })
        }
    }

    return (
        <div className="relative w-screen h-screen">
            <motion.div
                key={"page"}
                layout
                initial={{
                    height: "auto",
                    // top: "100%"
                }}
                // animate={{
                //     height: open ? "100vh" : "auto",
                //     top: open ? 0 : "90%",
                //     background: open ? "green" : "red",
                //     transition: {
                //         duration: 1.7
                //     }
                // }}
                animate={control}
                className="absolute left-0 bg-red-200">
                <button onClick={toggle}>click me to show</button>
            </motion.div>
        </div>
    )
}

export default PageTransition