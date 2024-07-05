import React from "react";
import ClipLoader from 'react-spinners/ClipLoader';
import './App.css'; 

const Loading = () => {
    return (
        <div className="loading-container">
            <ClipLoader color={"#ffffff"} size={50} />
        </div>
    );
};

export default Loading;
