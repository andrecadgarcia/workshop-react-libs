import { Button, TextField, Card } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './Login.css';
import { login, sigin, update, getLoggedUser } from '../service';

export default function Login() {

    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const [sigingIn, setSigningIn] = useState(false);
    const [resettingPassword, setResettingPassword] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (getLoggedUser()) {
            navigate('/home');
        }
        return () => { }
    }, []);

    const loginHandler = () => {
        setLoading(true);
        login(usuario, senha).then(result => {
            navigate('/home');
        }).catch(result => {
            alert(result);
        }).finally(() => {
            restoreLoginForm();
        });
    }

    const resetPasswordHandler = () => {
        if (!resettingPassword) {
            setResettingPassword(true);
        }
        else {
            setLoading(true);
            update(usuario, senha).then(result => {
                alert(result);
            }).catch(result => {
                alert(result);
            }).finally(() => {
                restoreLoginForm();
            });
        }
    }

    const siginHandler = () => {
        if (!sigingIn) {
            setSigningIn(true);
        }
        else {
            setLoading(true);
            sigin(usuario, senha).then(result => {
                alert(result);
            }).catch(result => {
                alert(result);
            }).finally(() => {
                restoreLoginForm();
            });
        }
    }

    const restoreLoginForm = () => {
        setResettingPassword(false);
        setSigningIn(false);
        setSenha('')
        setLoading(false);
    }

    const isFormValid = (usuario && senha && !loading) || false;

    return (
        <div className='page-login'>
            <Card className='container'>
                  
                <TextField 
                    variant="outlined"
                    label="Usuário"
                    value={usuario}
                    onChange={(event) => setUsuario(event.target.value)}>
                </TextField >
                <TextField 
                    variant="outlined"
                    label={resettingPassword ? "Nova Senha": "Senha"}
                    value={senha}
                    onChange={(event) => setSenha(event.target.value)}>
                </TextField >

                {!sigingIn && !resettingPassword && (
                    <Button
                        variant="contained"
                        color="success"
                        onClick={loginHandler}
                        disabled={!isFormValid}
                    >
                        <span>{loading ? 'Carregando...' : 'Entrar'}</span>
                    </Button>
                )}

                {!sigingIn && (
                    <Button
                        variant="contained"
                        color="warning"
                        onClick={resetPasswordHandler}
                        disabled={resettingPassword && !isFormValid}
                    >
                        {resettingPassword && <span>{loading ? 'Carregando...' : 'Atualizar Senha'}</span>}
                        {!resettingPassword && <span>Esqueci minha senha</span>}
                    </Button>
                )}

                {!resettingPassword && (
                    <Button
                        variant="contained"
                        color="info"
                        onClick={siginHandler}
                        disabled={sigingIn && !isFormValid}
                    >
                        {sigingIn && <span>{loading ? 'Carregando...' : 'Cadastrar'}</span>}
                        {!sigingIn && <span>Não é cadastrado?</span>}
                    </Button>
                )}

                {(sigingIn || resettingPassword) && (
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={restoreLoginForm}
                        disabled={loading}
                    >
                        <span>Voltar</span>
                    </Button>
                )}
            </Card>
        </div>
    )
}