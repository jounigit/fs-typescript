import { useEffect, useState } from "react";
import type { DiaryEntry } from "../types";
import * as diaryService from "../diaryService";


export const Content = () => {
    const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

    useEffect(() => {
        diaryService.getAllDiaries().then((data) => {
            setDiaries(data);
        });
    }, []);
    console.log(diaries);
    return (
        <div>
            <h3>Diary entries:</h3>
            {diaries.map((diary) => (
                <div key={diary.id}>
                    <p><b>Date: {diary.date}</b><br />
                    <b>Weather: </b> {diary.weather}<br />
                    <b>Visibility: </b> {diary.visibility}<br />
                    <b>Comment: </b> {diary.comment}</p>
                </div>
            ))}
        </div>
    );
}
