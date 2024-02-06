import {Link} from "react-router-dom";
import React from "react";

const Nav = () => {
    return (
        <nav className="gnb">
            <ul>
                <li>
                    <Link to="/vision">비젼</Link>
                </li>
                <li>
                    <Link to="/media">미디어</Link>
                </li>
                <li>
                    <Link to="/notification">노티 테스트</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Nav;
