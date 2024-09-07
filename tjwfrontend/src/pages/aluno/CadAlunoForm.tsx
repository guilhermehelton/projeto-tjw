import React, { useState } from "react";
import './CadAlunoForm.css';
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";

const CadAlunoForm = () => {

    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');

    return (
        <div className="form-container">
            <h2>Cadastro de aluno</h2>

            <div className="form-row">
                <Input className="no-margin-left" id="nome" name="nome" label="Nome" value={nome}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNome(e.target.value)} />
                    <Input id="email" name="email" label="E-mail" value={nome}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNome(e.target.value)} />
            </div>
            <div className="form-row">
                <Input className="no-margin-left" id="cpf" name="cpf" label="CPF" placeholder="###.###.###-##" value={cpf}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCpf(e.target.value)} />
                <Input id="tel" name="telefone" label="Telefone" placeholder="(DD)xxxxx-xxxx" value={cpf}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCpf(e.target.value)} />
                <Input id="dataNascimento" name="dataNascimento" label="Data de nascimento" placeholder="dd/MM/yyyy" value={cpf}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCpf(e.target.value)} />
            </div>
            <div className="form-row">
                <Button className="no-margin-left" isSecondary name="Cancelar"/>
                <Button name="Confirmar"/>
            </div>
        </div>
    )
}

export default CadAlunoForm;