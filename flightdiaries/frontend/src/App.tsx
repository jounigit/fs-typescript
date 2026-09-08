import DiaryForm from "./components/AddNewDiaryForm";
import { Content } from "./components/Content";
import { Header } from "./components/Header";

function App() {
  const appName = "Flightdiaries";

  return (
    <div>
      <Header name={appName} />
      <DiaryForm />
      <hr />
      <Content />
    </div>
  )
}

export default App
