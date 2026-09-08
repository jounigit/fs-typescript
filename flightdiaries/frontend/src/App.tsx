import { Content } from "./components/Content";
import { Header } from "./components/Header";

function App() {
  const appName = "Flightdiaries";

  return (
    <div>
      <Header name={appName} />
      <Content />
    </div>
  )
}

export default App
