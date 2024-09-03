import React from "react";
import './SideBar.css'
import { useNavigate } from "react-router-dom";

const SideBar = () => {
    const navigate = useNavigate();

    const navButton = (props: any) => {
        return (
            <a className="nav-button" onClick={() => navigate(props.path)}><i className={`fa ${props.icon}`}/>{props.name}</a>
        )
    }

    return (
        <div className="sidebar">
            <h2>Sistema Acadêmico</h2>
            {navButton({name: 'Aluno', icon: 'fa-home', path: '/'})}
            {navButton({name: 'Turma', icon:'fa-briefcase'})}
            {navButton({name: 'Professor', icon:'fa-briefcase', path: '/professor'})}
            
        </div>
    )   
}

export default SideBar;