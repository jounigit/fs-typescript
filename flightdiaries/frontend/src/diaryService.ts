import axios from "axios";
import type { DiaryEntry, NewDiaryEntry, ValidationError } from "./types";

const baseUrl = "http://localhost:3000/api/diaries";

const getAllDiaries = () => {
    return axios
    .get<DiaryEntry[]>(baseUrl+"/all")
    .then((response) => response.data);
};

const createDiary = async (newDiaryEntry: NewDiaryEntry) => {
    try {
        const response = await axios.post<DiaryEntry>(baseUrl, newDiaryEntry);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
            console.log(error.status);
            console.error(error.response);
            throw error.response?.data ?? new Error("Error: Validation failed");
        } else {
            console.error(error);
            throw new Error("Error.", { cause: error });
        }
    }
};
    


export { getAllDiaries, createDiary };