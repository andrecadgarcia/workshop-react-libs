import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './Home.css';
import { getLoggedUser, getUsuarios, logout } from '../service';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';
import { connect } from 'react-redux';

function Home({ usuarios }) {
    const [loading, setLoading] = useState(false);

    console.log(usuarios);
    const navigate = useNavigate();

    const columns = [
        { field: 'id', headerName: 'ID', type: 'number'  },
        { field: 'usuario', headerName: 'Usuário', type: 'string', width: 160  },
        { field: 'senha', headerName: 'Senha', type: 'string', width: 160  },
        { field: 'logged_at', headerName: 'Último Login', type: 'string', width: 160, valueGetter: params => localeDate(params.logged_at) },
        { field: 'created_at', headerName: 'Criado Em', type: 'string', width: 160, valueGetter: params => localeDate(params.logged_at) },
        { field: 'updated_at', headerName: 'Atualizado Em', type: 'string', width: 160, valueGetter: params => localeDate(params.logged_at) }
    ]

    const localeDate = (date) => {
        return moment(date).format('DD/MM/YYYY hh:mm:ss');
    }

    useEffect(() => {
        return () => { }
    }, []);

    const logoutHandler = () => {
        setLoading(true);
        logout().then(() => {
            navigate('/login');
        }).catch(() => {

        }).finally(() => {
            setLoading(false);
        });
    }
    
    return (
        <div className='page-home'>
            <div style={{ display: 'flex',padding: 16 }}>
                <p style={{ marginRight: 8 }}>Bem Vindo {getLoggedUser()}</p>
                <Button
                    variant="contained"
                    color="info"
                    onClick={logoutHandler}
                >
                    <span>{loading ? 'Carregando...' : 'Sair'}</span>
                </Button>
            </div>
            <div style={{ width: '100%', flex: 1 }}>
                <DataGrid
                    rows={usuarios || []}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </div>
        </div>
    );
}

const mapStateToProps = store => ({
    usuarios: store.usuarioState
});

export default connect(mapStateToProps)(Home);