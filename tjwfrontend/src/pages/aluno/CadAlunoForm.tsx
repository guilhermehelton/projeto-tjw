import React, { useState } from "react";
import './CadAlunoForm.css';
import Input from "../../components/input/Input";

const CadAlunoForm = () => {

    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');

    return (
        <div className="form-container">
            <h2>Cadastro de aluno</h2>

            <div className="form-row">
                <Input id="nome" name="nome" label="Nome" value={nome} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNome(e.target.value)} />
                <Input id="cpf" name="cpf" label="CPF" placeholder="###.###.###-##" value={cpf} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCpf(e.target.value)} />
            </div>
        </div>
    )
}

export default CadAlunoForm;