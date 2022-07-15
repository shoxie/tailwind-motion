import { motion, useAnimation } from "framer-motion";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillInfoCircle,
  AiFillCloseCircle
} from "react-icons/ai";
import { useState } from "react";

const ShareButton = () => {
  const instagramControls = useAnimation();
  const facebookControls = useAnimation();
  const linkedinControls = useAnimation();
  const [isAnimating, setIsAnimating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const animateOpen = async () => {
    setIsAnimating(true);
    setIsOpen(true);
    await facebookControls.start({
      left: 50,
      transition: { duration: 0.3 },
    });
    await instagramControls.start({
      top: -50,
      transition: { duration: 0.3 },
    });
    await linkedinControls.start({
      left: -50,
      transition: { duration: 0.3 },
    });
    setIsAnimating(false);
  };
  
  const animateClose = async () => {
    setIsAnimating(true);
    setIsOpen(false);
    await facebookControls.start({
      left: 0,
      transition: { duration: 0.3 },
    });
    await instagramControls.start({
      top: 0,
      transition: { duration: 0.3 },
    });
    await linkedinControls.start({
      left: 0,
      transition: { duration: 0.3 },
    });
    setIsAnimating(false);
  };

  const handleClick = () => {
    if (isAnimating) return;
    if (isOpen) {
      animateClose();
    } else {
      animateOpen();
    }
  };
  return (
    <div className="relative">
      <div className="absolute z-[2] bg-white p-3 px-4 border rounded-full w-12 h-12">
        <button type="button" onClick={handleClick}>
          {!isOpen ? <AiFillInfoCircle /> : <AiFillCloseCircle/>}
        </button>
      </div>
      <motion.div
        animate={facebookControls}
        className="bg-red-400 absolute p-3 px-4 border rounded-full z-[1] max-w-max w-12 h-12"
      >
        <div className="flex items-center justify-center w-full h-full">
          <AiFillFacebook />
        </div>
      </motion.div>
      <motion.div
        animate={instagramControls}
        className="bg-green-400 absolute p-3 px-4 border rounded-full z-[1] max-w-max w-12 h-12"
      >
        <div className="flex items-center justify-center w-full h-full">
          <AiFillInstagram />
        </div>
      </motion.div>
      <motion.div
        animate={linkedinControls}
        className="bg-blue-400 absolute p-3 px-4 border rounded-full z-[1] max-w-max w-12 h-12"
      >
        <div className="flex items-center justify-center w-full h-full">
          <AiFillLinkedin />
        </div>
      </motion.div>
    </div>
  );
};

export default ShareButton;
