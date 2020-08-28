import React from 'react';
import Header from "./components/header"
import Rules from "./components/rules"
import Grid from "./components/grid"
import './App.css';

function App() {
    return (
        <div className="App">
            <Header />
            <Rules />
            <Grid />
        </div>
    );
}

export default App;
