import React, { useContext } from "react";
import './SideBar.css'
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext, Usuario } from "../../contexts/AuthContext";

const SideBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { usuario, setUsuario, setSigned } = useContext(AuthContext);

    const getRootPath = (path: string) => {
        let rootPath = path.split("/");
        if (rootPath[1] != "") {
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

    const handleSair = () => {
        sessionStorage.removeItem("@Auth:token")
        sessionStorage.removeItem("@Auth:user")
        setSigned(false);
        setUsuario({} as Usuario);

        navigate("/");
    }

    return (
        <div className="sidebar">
            <h2>Sistema Acadêmico</h2>
            {navButton({ name: 'Aluno', icon: 'fa-home', path: '/aluno' })}
            {navButton({ name: 'Turma', icon: 'fa-users', path: '/turma' })}
            {navButton({ name: 'Disciplina', icon: 'fa-book', path: '/disciplina' })}
            {navButton({ name: 'Professor', icon: 'fa-briefcase', path: '/professor' })}
            <a className="nav-button" onClick={() => handleSair()}>
                Sair
            </a>
        </div>
    )
}

export default SideBar;