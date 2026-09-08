import axios from "axios";
import type { DiaryEntry } from "./types";

const baseUrl = "http://localhost:3000/api/diaries/all";

export const getAllDiaries = () => {
    return axios
    .get<DiaryEntry[]>(baseUrl)
    .then((response) => response.data);
};
