import SplashCard from "@/common/SplashCard";
import Switch from "@/common/Switch";
import UndelinedLinks from "@/common/UnderlinedLinks";
import CallToAction from "@/common/CallToAction";
import Dialog from "@/common/Dialog";
import NotificationContainer from "@/common/Notification/Container";
import classNames from "classnames";
import { useState } from "react";

const Home = () => {
  const [isDark, setIsDark] = useState<boolean>(false);

  const onSwitchChange = (state: boolean) => {
    console.log(state);
    setIsDark(state);
  };

  return (
    <div className={classNames(
      "",
      isDark ? "dark" : "")}>
      <div
        className={classNames(
          "transition-all flex flex-col px-10 space-y-5 dark:bg-[#232136] dark:text-[#e0def4] min-h-screen"
        )}
      >
        <div className="flex flex-col space-y-2">
          <span>Switch</span>
          <Switch
            width="5rem"
            height="1.75rem"
            onSwitchChange={onSwitchChange}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <span>Underlined links</span>
          <UndelinedLinks />
        </div>
        <div className="flex flex-col space-y-2">
          <span>Splash card animation</span>
          <SplashCard />
        </div>
        <div className="flex flex-col space-y-2">
          <span>Call To Action</span>
          <CallToAction />
        </div>
        <div className="flex flex-col space-y-2">
          <span>Modal animation with RadixUI</span>
          <div className="w-1/12">
            <Dialog />
          </div>
        </div>
        <div className="fixed top-5 right-5 w-96">
          <div className="flex flex-col space-y-2">
            <span>Notification UI</span>
            <NotificationContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
