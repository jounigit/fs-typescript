import { useEffect, useState } from "react";
import DiaryForm from "./components/AddNewDiaryForm";
import { Content } from "./components/Content";
import { Header } from "./components/Header";
import type { DiaryEntry } from "./types";
import * as diaryService from "./diaryService";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const appName = "Flightdiaries";

    useEffect(() => {
      diaryService.getAllDiaries().then((data) => {
          setDiaries(data);
      });
    }, []);

  return (
    <div>
      <Header name={appName} />
      <DiaryForm setDiaries={setDiaries} />
      <hr />
      <Content diaries={diaries} />
    </div>
  )
}

export default App
