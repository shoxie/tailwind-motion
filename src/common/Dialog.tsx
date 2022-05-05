import {
    FC,
    useContext,
    useEffect,
    useRef,
    useState,
  } from "react"
  import {
    AnimatePresence,
    motion,
  } from "framer-motion"
  import classNames from "classnames"
  import * as DialogPrimitive from "@radix-ui/react-dialog"
  import StakedBg from "public/assets/staked.svg"
  import NonStakedBg from "public/assets/nonstaked.svg"
  
  const fadeInUp = {
    initial: {
      opacity: 0,
      translateY: 100,
      transition: {
        delay: 0.5,
      },
    },
    animate: {
      opacity: 1,
      translateY: 0,
      transition: {
        delay: 0.5,
      },
    },
  }
  
  
  const Dialog: FC<{}> = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const handleOpenModal = (state: boolean) => {
      setIsOpen(state)
    }
  
    return (
      <>
        <DialogPrimitive.Root onOpenChange={handleOpenModal}>
          <DialogPrimitive.Trigger asChild className="relative">
            <motion.button variants={fadeInUp} initial="initial" animate="animate">
              <span>Click me</span>
            </motion.button>
          </DialogPrimitive.Trigger>
          <AnimatePresence exitBeforeEnter>
            {
              isOpen ? (
                <DialogPrimitive.Portal forceMount>
                  <DialogPrimitive.Overlay asChild forceMount>
                    <div
                      className="fixed inset-0 z-[2] cursor-pointer bg-black/50 backdrop-blur-[10px]"
                    />
                  </DialogPrimitive.Overlay>
                  <DialogPrimitive.Content asChild forceMount>
                    <div className="fixed z-[3] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 70,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: 0.4,
                          },
                        }}
                        exit={{
                          opacity: 0,
                          y: 70,
                        }}
                        transition={{
                          delay: 0.3,
                        }}
                        className="z-[3] p-10 bg-center bg-no-repeat bg-cover px-14"
                      >
                        <div className="flex flex-col max-w-md p-10 space-y-5 bg-white rounded-md">
                            <div>
                                <span>TKT do you love me ?</span>
                            </div>
                            <div className="flex flex-row items-center justify-center space-x-5">
                                <button className="px-5 py-1 bg-purple-500 rounded-md">Yes</button>
                                <button className="px-5 py-1 bg-red-400 rounded-md">No</button>
                            </div>
                        </div>
                      </motion.div>
                    </div>
                  </DialogPrimitive.Content>
                </DialogPrimitive.Portal>
              ) : null
            }
          </AnimatePresence>
        </DialogPrimitive.Root>
      </>
    )
  }
  
  export default Dialog
  