import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import '../aluno/CadAlunoForm.css'

export const Login = () => {
    const navigate = useNavigate();
    const { setSigned, signed, setUsuario, setAuthToken } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleNavigateToCadastro = () => {
        navigate("/cadastro");
    }

    const handleLogin = () => {
        if (email && senha) {
            fetch('http://localhost:9001/auth/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    senha: senha,
                }),
            }).then((response) => response.json()).then((data) => {
                sessionStorage.setItem("@Auth:token", data.token);
                sessionStorage.setItem("@Auth:user", JSON.stringify(data.usuario));
                setAuthToken(data.token);
                setUsuario(data.usuario);
                setSigned(true);
                return <Navigate to="/aluno" />
            })
        } else {
            alert("Preenchar a email e a senha");
        }
    }


    return (
        signed ?
            <Navigate to="/aluno" />
            :
            <div className="form-container">
                <h2>Login Usuário</h2>
                <div className="form-row">
                    <Input id="email" label="Email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="form-row">
                    <Input password id="senha" label="Senha" name="senha" value={senha} onChange={e => setSenha(e.target.value)} />
                </div>
                <div className="form-row">
                    <Button name="Criar uma conta" onClick={() => handleNavigateToCadastro()} isSecondary />
                    <Button name="Entrar" onClick={() => handleLogin()} />
                </div>
            </div>
    )
}