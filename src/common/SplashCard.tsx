import { FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CgClose } from "react-icons/cg";

const container = {
  initial: {
    clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
    transition: { duration: 0.4 },
  },
  animate: {
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    transition: { duration: 0.4, staggerChildren: 0.1 },
  },
  exit: {
    clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
    transition: { duration: 0.4 },
  },
};

const SplashCard = () => {
  const [clicked, setClicked] = useState(false);

  return (
    <div className="h-48 w-96">
      <div className="relative w-full h-full bg-red-700 rounded-2xl">
        <AnimatePresence exitBeforeEnter initial={false}>
          {clicked ? (
            <motion.div
              key="squares"
              variants={container}
              initial="initial"
              animate="animate"
              exit="exit"
              className="relative w-full h-full rounded-2xl bg-gradient-to-r from-green-400 to-yellow-400"
            >
              <div className="flex items-center justify-center w-full h-full p-2">
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col items-center justify-center">
                    <img
                      src="https://cdna.artstation.com/p/assets/images/images/029/728/172/large/hoang-mai-anh-hao-341dbd12-076c-4d96-9ce6-2bcea99d962a.jpg?1598457444"
                      alt="avatar"
                      className="object-cover rounded-full w-14 h-14"
                    />
                    <span className="text-xl text-white">WhiteRose</span>
                  </div>
                  <div className="w-8/12">
                    <p className="text-white">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Ratione dolor quaerat ad labore molestias atque temporibus
                      quasi voluptatibus
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute top-3 right-7">
                <CgClose
                  className="text-xl font-bold text-white cursor-pointer"
                  onClick={() => setClicked(false)}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              variants={container}
              initial="initial"
              animate="animate"
              exit="exit"
              key="card"
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-violet-400 to-amber-400 rounded-2xl"
            >
              <button
                className="flex items-center justify-center w-full h-full p-2"
                onClick={() => setClicked(true)}
              >
                <span className="animate-bounce">Click me</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SplashCard;
