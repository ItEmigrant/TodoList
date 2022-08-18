import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {

    const title = "What to learn111"
    const title2 = "What to learn222"

    const task1 = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "ReactJS", isDone: false}
    ]

    const task2 = [
        {id: 1, title: "Hello word", isDone: true},
        {id: 2, title: "I am happy", isDone: false},
        {id: 3, title: "Yo", isDone: false}
    ]

    return (
        <div className="App">
            <Todolist title={title} titleNEW={100200}
                      tasks={task1}/>
            <Todolist title={title2}
                      tasks={task2}/>

        </div>
    );
}

export default App;
