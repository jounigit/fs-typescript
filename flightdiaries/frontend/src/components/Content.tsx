import type { DiaryEntry } from "../types";

export const Content = ({ diaries }: { diaries: DiaryEntry[] }) => {

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
