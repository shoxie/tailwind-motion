import { AnimationOptions, MotionValue, animate, motion, useMotionTemplate, useMotionValue, useTransform, useVelocity } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const CELL_SIZE = 60;


const Cell = ({ mouseX, mouseY }: { mouseX: MotionValue<number>, mouseY: MotionValue<number> }) => {
    const [position, setPosition] = useState([0, 0]);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        // center x coordinate
        const x = rect.left + CELL_SIZE / 2;
        // center y coordinate
        const y = rect.top + CELL_SIZE / 2;
        setPosition([x, y]);
    }, [ref.current]);

    const direction = useTransform<number, number>(
        [mouseX, mouseY],
        ([newX, newY]) => {
            const diffY = newY - position[1];
            const diffX = newX - position[0];
            const angleRadians = Math.atan2(diffY, diffX);
            const angleDegrees = Math.floor(angleRadians * (180 / Math.PI));
            return angleDegrees;
        }
    );

    return (
        <div
            style={{
                width: `${CELL_SIZE}px`,
                height: `${CELL_SIZE}px`,
                border: "1px dashed #555",
                color: "#777",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                userSelect: "none",
            }}
            ref={ref}
        >
            <motion.div style={{ rotate: direction }}>→</motion.div>

        </div>
    );
};

function Grid() {
    const [columns, setColumns] = useState(0);
    const [rows, setRows] = useState(0);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const mouseXEased = useMotionValue(0);
    const mouseYEased = useMotionValue(0);
    // mouse velocity
    const mouseXVelocity = useVelocity(mouseXEased);
    const mouseYVelocity = useVelocity(mouseYEased);
    const mouseVelocity = useTransform<number, number>(
        [mouseXVelocity, mouseYVelocity],
        ([latestX, latestY]) => Math.abs(latestX) + Math.abs(latestY)
    );
    // map mouse velocity to an opacity value
    const opacity = useTransform(mouseVelocity, [0, 1000], [0, 1]);


    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // animate mouse x and y
            animate(mouseX, e.clientX);
            animate(mouseY, e.clientY);
            // animate eased mouse x and y
            const transition: AnimationOptions<number> = {
                ease: 'easeOut',
                duration: 1,
            };
            animate(mouseXEased, e.clientX, transition);
            animate(mouseYEased, e.clientY, transition);
        };
        // recalculate grid on resize
        window.addEventListener('mousemove', handleMouseMove);
        // cleanup
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);
    // determine rows and columns
    useEffect(() => {
        const calculateGrid = () => {
            const columnCount = Math.ceil(window.innerWidth / CELL_SIZE);
            setColumns(columnCount);
            const rowCount = Math.ceil(window.innerHeight / CELL_SIZE);
            setRows(rowCount);
        };
        // calculate the grid on load
        calculateGrid();
        // recalculate grid on resize
        window.addEventListener('resize', calculateGrid);
        // cleanup
        return () => {
            window.removeEventListener('resize', calculateGrid);
        };
    }, []);

    const centerMouseX = useTransform<number, number>(mouseX, (newX) => {
        return typeof window !== "undefined" ? newX - window.innerWidth / 2 : 0;
    });
    const centerMouseY = useTransform<number, number>(mouseY, (newY) => {
        return typeof window !== "undefined" ? newY - window.innerHeight / 2 : 0;
    });
    const WebkitMaskPosition = useMotionTemplate`${centerMouseX}px ${centerMouseY}px`;

    return (
        <motion.div
            //  columns={columns}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                overflow: "hidden",
                display: "grid",
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                maskImage: `radial-gradient(
                    300px 300px,
                    rgba(0, 0, 0, 1),
                    rgba(0, 0, 0, 0.4),
                    transparent
                )`,
                maskRepeat: "no-repeat",
                WebkitMaskPosition,
                opacity
            }}
        >
            {Array.from({ length: columns * rows }).map((_, i) => (
                <Cell key={i} mouseX={mouseX} mouseY={mouseY} />
            ))}
        </motion.div>
    );
}

export default Grid;