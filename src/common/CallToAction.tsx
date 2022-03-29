import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { MdOutlineFileUpload } from "react-icons/md";
import { BiLoaderAlt } from "react-icons/bi";
import { GoCheck } from "react-icons/go";

const CallToAction = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  const uploadControls = useAnimation();
  const loadingControls = useAnimation();
  const doneControls = useAnimation();
  const loadingBarControls = useAnimation();

  const animate = async () => {
    setIsAnimating(true);
    uploadControls.start({
      zIndex: 1,
    });
    await loadingControls.start({
      top: 0,
      transition: { duration: 0.3 },
    });
    loadingBarControls.start({
      width: "100%",
      transition: { duration: 1.35 },
    });
    uploadControls.start({
      top: "-100%",
      transition: { duration: 0 },
    });
    await doneControls.start({
      top: 0,
      transition: { delay: 1.5, duration: 0.3 },
    });
    loadingControls.start({
      top: "-100%",
      transition: { duration: 0 },
    });
    loadingBarControls.start({
      width: "0%",
    });
    await uploadControls.start({
      top: 0,
      zIndex: 4,
      transition: { delay: 2, duration: 0.3 },
    });
    doneControls.start({
      top: "-100%",
      transition: { duration: 0 },
    });
    setIsAnimating(false);
  };

  return (
    <div className="p-10 bg-gradient-to-tr from-purple-400 to-violet-700 max-w-max rounded-[8px]">
      <div
        className="relative h-10 overflow-hidden cursor-pointer w-28 min-w-max"
        onClick={() => !isAnimating && animate()}
      >
        <motion.div
          className="absolute left-0 w-full h-full rounded-[8px] overflow-hidden bg-white z-[1] top-0"
          animate={uploadControls}
          whileHover="hovered"
        >
          <div className="flex flex-row items-center justify-center w-full h-full space-x-2">
            <MdOutlineFileUpload />
            <div>Upload</div>
          </div>
        </motion.div>
        <motion.div
          className="relative left-0 w-full h-full rounded-[8px] overflow-hidden bg-[#f0759e] z-[2] -top-full"
          animate={loadingControls}
        >
          <div className="flex flex-row items-center justify-center w-full h-full space-x-3 text-white">
            <BiLoaderAlt className="animate-spin" />
            <div>
              <span className="font-md">Loading</span>
            </div>
          </div>
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-white"
            animate={loadingBarControls}
          />
        </motion.div>

        <motion.div
          className="absolute left-0 w-full h-full rounded-[8px] overflow-hidden bg-[#eb417b] z-[3] -top-full"
          animate={doneControls}
        >
          <div className="flex flex-row items-center justify-center w-full h-full space-x-3 text-white">
            <GoCheck />
            <div>
              <span className="font-md">done</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CallToAction;
