import { FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import classNames from "classnames";
import { BsMoon, BsSun } from "react-icons/bs";

type Props = {
    width: string;
    height: string;
    onSwitchChange: (state: boolean) => void
}

const Switch: FC<Props> = ({ width, height, onSwitchChange }) => {
  const [isSwitched, setIsSwitched] = useState(false);

  const switchState = () => {
    setIsSwitched(!isSwitched);
    onSwitchChange(!isSwitched)
  };

  return (
    <div
      className={classNames(
        "flex flex-row items-center p-1 py-3 rounded-full cursor-pointer transition-all relative",
        isSwitched ? "justify-end bg-green-400" : "justify-start bg-gray-400"
      )}
      style={{ width, height }}
      onClick={switchState}
    >
      <motion.div layout className="overflow-hidden">
        <AnimatePresence exitBeforeEnter initial={false}>
          <motion.div
            key={isSwitched ? "moon" : "sun"}
            className="p-1 bg-white rounded-full"
          >
            <motion.div
              key={isSwitched ? "moon-icon" : "sun-icon"}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isSwitched ? (
                <BsMoon className="overflow-hidden" key="moon-icon" />
              ) : (
                <BsSun className="overflow-hidden" key="sun-icon" />
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Switch;
