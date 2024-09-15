import { useState } from "react";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import { useNavigate } from "react-router-dom";
import "../aluno/CadAlunoForm.css"

type RegisterUserType ={
    email: string,
    senha: string,
}

export const Cadastrar = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    const handleCancelar = () => {
        navigate("/");
    }

    const handleConfirmar = () => {
        const usuario: RegisterUserType = {
            email,
            senha,
        }

        fetch('http://localhost:9001/auth/register', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(usuario),
        }).then((response) => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            return response.json();
        }).then(() => {
            navigate("/");
        })
    }

    return (
        <div className="form-container">
            <h2>Cadastre-se</h2>
            <div className="form-row">
                <Input id="email" label="Email" name="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
            </div>
            <div className="form-row">
                <Input id="senha" label="Senha" name="senha" onChange={(e) => setSenha(e.target.value)} value={senha}/>
            </div>
            <div className="form-row">
                <Button name="Cancelar" isSecondary onClick={() => handleCancelar()}/>
                <Button name="Confirmar" onClick={() => handleConfirmar()}/>
            </div>
        </div>
    )
}