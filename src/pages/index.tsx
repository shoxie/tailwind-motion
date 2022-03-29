import SplashCard from "@/common/SplashCard"
import Switch from "@/common/Switch"
import UndelinedLinks from "@/common/UnderlinedLinks"

const Home = () => {
  return (
    <div className="flex flex-col space-y-5 px-10">
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
    </div>
  )
}

export default Home