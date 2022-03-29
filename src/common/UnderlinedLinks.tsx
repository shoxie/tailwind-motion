import { motion, AnimateSharedLayout } from "framer-motion";
import { FC, useState } from "react";

const menuItems = ['Lorem', 'ipsum', 'dolor', 'sit'];

type LinkProps = {
    selected: boolean;
    text: string;
    onClick: () => void
}

const Link: FC<LinkProps> = ({ selected, onClick, text }) => {
    return (
      <motion.div
        className="relative"
        onClick={onClick}
        animate={{ opacity: selected ? 1 : 0.5 }}
      >
        {text}
        {selected && <motion.div className="absolute top-full left-0 w-full h-0.5 rounded-2xl bg-red-700" layoutId="underline" />}
      </motion.div>
    );
}

const UndelinedLinks = () => {
    const [current, setCurrent] = useState(0);
    
    return (
      <div className="grid w-full">
        <div className="flex flex-row space-x-5">
          <AnimateSharedLayout>
            {menuItems.map((item, idx) => (
              <Link
                text={item}
                key={idx}
                selected={current === idx}
                onClick={() => setCurrent(idx)}
              />
            ))}
          </AnimateSharedLayout>
        </div>
      </div>
    );
}

export default UndelinedLinks;
