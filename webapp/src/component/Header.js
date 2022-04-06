import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            //정통 리액트 컴포넌트로 만들기
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-2 border-white" id='nav'>
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Shinil's Portfolio</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                            <a className="nav-link about" aria-current="page" href="#">About</a>
                            </li>
                            <li className="nav-item">
                            <a className="nav-link" href="#">Project</a>
                            </li>
                            <li className="nav-item">
                            <a className="nav-link" href="#">Contact</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Header;