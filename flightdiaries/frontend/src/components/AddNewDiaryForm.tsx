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
    const [error, setError] = useState('');

    const onWeatherChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        setWeather: React.Dispatch<React.SetStateAction<Weather | ''>>,
    ) => {
        const selectedWeather = event.target.value as Weather;
        setWeather(selectedWeather);
    };

    const onVisibilityChange = (
        event: React.ChangeEvent<HTMLInputElement>,
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
                setError('');
                setDate('');
                setWeather('');
                setVisibility('');
                setComment('');
                setDiaries((prevDiaries) => (
                    createdEntry ? [...prevDiaries, createdEntry] : prevDiaries
                ));
            })
            .catch((error) => {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError(`Error: ${String(error.message)}`);
                }
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Add New Diary Entry</h3>
            {/* get thrown errors here */}
            {error && <p style={{color: 'red'}}>{error}</p>}
            <div>
                <label>Date:</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
            <br />
                <label>Weather:</label>
                <input
                    type="radio"
                    name="weather"
                    value="sunny"
                    checked={weather === 'sunny'}
                    onChange={(e) => onWeatherChange(e, setWeather)}
                />
                Sunny
                <input
                    type="radio"
                    name="weather"
                    value="rainy"
                    checked={weather === 'rainy'}
                    onChange={(e) => onWeatherChange(e, setWeather)}
                />
                Rainy
                <input
                    type="radio"
                    name="weather"
                    value="cloudy"
                    checked={weather === 'cloudy'}
                    onChange={(e) => onWeatherChange(e, setWeather)}
                />
                Cloudy
                <input
                    type="radio"
                    name="weather"
                    value="stormy"
                    checked={weather === 'stormy'}
                    onChange={(e) => onWeatherChange(e, setWeather)}
                />
                Stormy
                <input
                    type="radio"
                    name="weather"
                    value="windy"
                    checked={weather === 'windy'}
                    onChange={(e) => onWeatherChange(e, setWeather)}
                />
                Windy
            
            <br />
            <div>
                <label>Visibility:</label>
                <input
                    type="radio"
                    name="visibility"
                    value="great"
                    checked={visibility === 'great'}
                    onChange={(e) => onVisibilityChange(e, setVisibility)}
                />
                Great
                <input
                    type="radio"
                    name="visibility"
                    value="good"
                    checked={visibility === 'good'}
                    onChange={(e) => onVisibilityChange(e, setVisibility)}
                />
                Good
                <input
                    type="radio"
                    name="visibility"
                    value="ok"
                    checked={visibility === 'ok'}
                    onChange={(e) => onVisibilityChange(e, setVisibility)}
                />
                Ok
                <input
                    type="radio"
                    name="visibility"
                    value="poor"
                    checked={visibility === 'poor'}
                    onChange={(e) => onVisibilityChange(e, setVisibility)}
                />
                Poor
            </div>
            <br />
            <div>
                <label>Comment:</label>
                <input 
                    type="text"
                    name="comment"
                    value={comment} 
                    onChange={(e) => setComment(e.target.value)} 
                />
            </div>
            <button 
            style={{backgroundColor: 'lightgray'}} 
            type="submit">
                Add
            </button>
        </form>
    );
};

export default DiaryForm;