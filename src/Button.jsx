import React from "react";
import { Link } from "react-router-dom";

export default function Button({handleSubmit}) {
    return (
        <div className='submit'>
            <nav>
                <Link to='/printpage'>
                    <button className="sub" id="sub" onClick={handleSubmit}>Submit</button>
                </Link>
            </nav>
            <button className='clear' id='clear' onClick={() => window.location.reload()}>Clear</button>
        </div>
    );
}
