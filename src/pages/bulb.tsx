import { PiLightbulbThin } from "react-icons/pi";
import { motion, useAnimation, useDragControls, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";
import Grid from "@/common/Background/Grid";

const LightBulb = () => {
    const controls = useDragControls();
    const y = useMotionValue(0);
    const scale = useTransform(y, [-150, 150], [1.5, 0.5]);
    const rotate = useTransform(y, [-150, 150], [-90, 90]);
    const anim = useAnimation()

    const [isLight, setIsLight] = useState(false)

    return (
        <motion.div
            className="flex items-center justify-center w-screen h-screen transition-all"
            animate={{
                backgroundColor: isLight ? "black" : "white",
                transition: {
                    duration: 0.6
                }
            }}
        >
            {
                isLight && <Grid />
            }
            <div className="text-9xl relative flex flex-col items-center">
                <motion.div initial={{
                    pathLength: 0
                }} 
                animate={{
                    color: isLight ? "yellow" : "black",
                    pathLength: 1
                }}>
                    <PiLightbulbThin />
                </motion.div>
                <motion.div
                    id="string"
                    className="w-1 h-40 bg-gray-200 absolute top-full"
                    drag="y"
                    dragControls={controls}
                    style={{
                        y,
                        scale,
                    }}
                    animate={anim}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
                    whileTap={{ cursor: "grabbing" }}
                    onDragEnd={async () => {
                        anim.start({
                            y: 0,
                            transition: {
                                bounceStiffness: 600,
                                bounceDamping: 20,
                                type: "spring"
                            }
                        })
                        setIsLight(!isLight)
                    }}
                    dragSnapToOrigin
                ></motion.div>
            </div>
        </motion.div>
    );
};

export default LightBulb;
