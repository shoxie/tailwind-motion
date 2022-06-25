import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AiOutlineLoading as LoadingIcon,
  AiOutlineInfoCircle as InfoIcon,
  AiOutlineClose as CloseIcon,
} from "react-icons/ai";
import { BiErrorCircle as ErrorIcon } from "react-icons/bi";
import { BsCheckCircle as CheckIcon } from "react-icons/bs";

type Notification = {
  id: string;
  title: string;
  content: string;
  type: "loading" | "info" | "error" | "complete" | string;
  action?: () => void;
  actionText?: string;
};

const NotificationItem = (item: Notification) => {
  const [progress, setProgress] = useState<number>(0);
  const getIcon = (type: string) => {
    switch (type) {
      case "complete":
        return <CheckIcon className="text-2xl text-green-400" />;
      case "loading":
        return <LoadingIcon className="text-2xl animate-spin" />;
      case "info":
        return <InfoIcon className="text-2xl text-yellow-400" />;
      case "error":
        return <ErrorIcon className="text-2xl text-red-400" />;
    }
  };

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (progress + 1 < 100) {
        setProgress(progress + 2.2);
      }
    }, 100);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <>
      <motion.div
        className="h-2 bg-white"
        animate={{
          width: `${progress}%`,
        }}
      />
      <div className="flex flex-row px-3 py-2 space-x-6">
        <div className="flex items-center justify-center">
          {getIcon(item.type)}
        </div>
        <div className="flex flex-col items-start">
          <span>{item.id}</span>
          <p className="line-clamp-3">{item.content}</p>
        </div>
      </div>
      {item.action && (
        <div className="py-1 mt-3 text-center text-white bg-blue-400">
          <button className="font-bold">{item.actionText}</button>
        </div>
      )}

      <div className="absolute cursor-pointer top-3 right-3">
        <CloseIcon />
      </div>
    </>
  );
};

const NotificationContainer = () => {
  const [notis, setNotis] = useState<Notification[]>([]);
  const [shouldExpand, setShouldExpand] = useState<boolean>(false);
  const [shouldUpdateExpand, setShouldUpdateExpand] = useState<boolean>(false);

  const handleAddNoti = () => {
    const types = ["loading", "info", "error", "complete"];
    const newItem = {
      title: "test",
      content: "test",
      id: Math.floor(Math.random() * 999).toString(),
      type: types[Math.floor(Math.random() * types.length)] as string,
      action: () => console.log("hello"),
      actionText: "lmao",
    };
    const temp = [...notis, newItem];
    setNotis(temp);
    setTimeout(() => {
      setNotis((prev) => {
        const newArr = prev.filter((item, idx) => item !== newItem);
        return newArr;
      });
    }, 5000);
  };

  const handleRemove = (id: string) => {
    const newArr = [...notis];
    newArr.shift();
    setNotis(newArr);
  };

  useEffect(() => {
    if (shouldExpand && shouldUpdateExpand) {
      setTimeout(() => {
        setShouldExpand(false);
      }, 3000);
    }
  }, [shouldExpand, shouldUpdateExpand]);

  return (
    <>
      <div className="pb-20">
        <button type="button" onClick={handleAddNoti}>
          click me to add
        </button>
      </div>
      <motion.div layout className="flex flex-col space-y-5">
        <AnimatePresence exitBeforeEnter={false}>
          {notis.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{
                opacity: 0,
                y: 100,
              }}
              animate={{
                opacity: 1,
                y: 0,
                marginTop: shouldExpand ? "0px" : "-35px",
                marginBottom: shouldExpand ? "10px" : "0px",
                transition: {
                  duration: 0.25,
                },
              }}
              exit={{
                opacity: 0,
                x: 100,
                transition: {
                  duration: 0.15,
                },
              }}
              onMouseEnter={() => {
                setShouldExpand(true);
                setShouldUpdateExpand(false);
              }}
              onMouseLeave={() => setShouldUpdateExpand(true)}
              onClick={() => handleRemove(item.id)}
              layout
              className="relative w-80 bg-white dark:bg-[#393552] dark:border-[#EE7057] shadow-xl rounded-md border-t"
            >
              <NotificationItem {...item} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default NotificationContainer;
