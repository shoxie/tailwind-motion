import SplashCard from "@/common/SplashCard"
import Switch from "@/common/Switch"
import UndelinedLinks from "@/common/UnderlinedLinks"
import CallToAction from "@/common/CallToAction"

const Home = () => {
  return (
    <div className="flex flex-col px-10 space-y-5">
      <div className="flex flex-col space-y-2">
        <span>Switch</span>
        <Switch width="5rem" height="1.75rem" />
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
    </div>
  )
}

export default Home