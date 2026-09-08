import React, { useState } from 'react';
import type { DiaryEntry, Weather, Visibility } from '../types';
import * as diaryService from '../diaryService';

interface DiaryFormProps {
    setDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
}

const DiaryForm = ({ setDiaries }: DiaryFormProps) => {
    const [date, setDate] = useState('');
    const [weather, setWeather] = useState<Weather | ''>('');
    const [visibility, setVisibility] = useState<Visibility | ''>('');
    const [comment, setComment] = useState('');

    const onWeatherChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
        setWeather: React.Dispatch<React.SetStateAction<Weather | ''>>,
    ) => {
        const selectedWeather = event.target.value as Weather;
        setWeather(selectedWeather);
    };

    const onVisibilityChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
        setVisibility: React.Dispatch<React.SetStateAction<Visibility | ''>>,
    ) => {
        const selectedVisibility = event.target.value as Visibility;
        setVisibility(selectedVisibility);
    };

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        if (!weather || !visibility) return;
        const newDiaryEntry: Omit<DiaryEntry, 'id'> = {
            date,
            weather,
            visibility,
            comment,
        };

        diaryService.createDiary(newDiaryEntry)
            .then((createdEntry) => {
                console.log('Diary entry created:', createdEntry);
                setDate('');
                setWeather('');
                setVisibility('');
                setComment('');
                setDiaries((prevDiaries) => [...prevDiaries, createdEntry]);
            })
            .catch((error) => {
                console.error('Error creating diary entry:', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Add New Diary Entry</h3>
            <div>
                <label>Date:</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
            <br />
            <div>
                <label>Weather:</label>
                <select value={weather} onChange={(e) => onWeatherChange(e, setWeather)} required>
                    <option value="">Select weather</option>
                    <option value="sunny">Sunny</option>
                    <option value="rainy">Rainy</option>
                    <option value="cloudy">Cloudy</option>
                    <option value="stormy">Stormy</option>
                    <option value="windy">Windy</option>
                </select>
            </div>
            <br />
            <div>
                <label>Visibility:</label>
                <select value={visibility} onChange={(e) => onVisibilityChange(e, setVisibility)} required>
                    <option value="">Select visibility</option>
                    <option value="great">Great</option>
                    <option value="good">Good</option>
                    <option value="ok">Ok</option>
                    <option value="poor">Poor</option>
                </select>
            </div>
            <br />
            <div>
                <label>Comment:</label>
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
            </div>
            <button type="submit">Add Diary Entry</button>
        </form>
    );
};

export default DiaryForm;