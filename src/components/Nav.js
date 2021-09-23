import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Nav.css';

export default function Nav(){
    return(
        <nav>
            <div className="table">
                <ul id="horizontal-list">
                    <Link to="/">
                        <li className="txt">Home</li>
                        <u></u>
                    </Link>
                    <Link to="/dodawanie">
                        <li className="txt">Add gist</li>
                    </Link>
                </ul>
            </div>
        </nav>
    )
}