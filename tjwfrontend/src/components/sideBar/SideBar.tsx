import React from "react";
import './SideBar.css'
import { useLocation, useNavigate } from "react-router-dom";

const SideBar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const getRootPath = (path: string) => {
        let rootPath = path.split("/");
        if(rootPath[1] != "") {
            return rootPath[1];
        }
        return "/";
    }

    const navButton = (props: any) => {
        return (
            <a className={`nav-button ${getRootPath(location.pathname) == getRootPath(props.path) ? 'active' : ''}`}
            onClick={() => navigate(props.path)}>
                <i className={`fa ${props.icon}`} />
                {props.name}
            </a>
        )
    }

    return (
        <div className="sidebar">
            <h2>Sistema Acadêmico</h2>
            {navButton({ name: 'Aluno', icon: 'fa-home', path: '/aluno' })}
            {navButton({ name: 'Turma', icon: 'fa-users', path: '/turma' })}
            {navButton({ name: 'Disciplina', icon: 'fa-book', path: '/disciplina' })}
            {navButton({ name: 'Professor', icon: 'fa-briefcase', path: '/professor' })}

        </div>
    )
}

export default SideBar;