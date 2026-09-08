import axios from "axios";
import type { DiaryEntry, NewDiaryEntry } from "./types";

const baseUrl = "http://localhost:3000/api/diaries";

const getAllDiaries = () => {
    return axios
    .get<DiaryEntry[]>(baseUrl+"/all")
    .then((response) => response.data);
};

const createDiary = (newDiaryEntry: NewDiaryEntry) => {
    return axios
    .post<DiaryEntry>(baseUrl, newDiaryEntry)
    .then((response) => response.data);
};

export { getAllDiaries, createDiary };