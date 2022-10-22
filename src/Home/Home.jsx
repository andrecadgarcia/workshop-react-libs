import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import './Home.css';
import { getLoggedUser, getUsuarios, logout } from '../service';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';

export default function Home() {
    const [loading, setLoading] = useState(false);
    const [usuarios, setUsuarios] = useState([]);

    const columns = [
        { field: 'id', headerName: 'ID', type: 'number'  },
        { field: 'usuario', headerName: 'Usuário', type: 'string', width: 160  },
        { field: 'logged_at', headerName: 'Último Login', type: 'string', width: 160, valueGetter: params => localeDate(params.logged_at) },
        { field: 'created_at', headerName: 'Criado Em', type: 'string', width: 160, valueGetter: params => localeDate(params.logged_at) },
        { field: 'updated_at', headerName: 'Atualizado Em', type: 'string', width: 160, valueGetter: params => localeDate(params.logged_at) }
    ]

    const localeDate = (date) => {
        return moment(date).format('DD/MM/YYYY hh:mm:ss');
    }

    useEffect(() => {
        loadUsuarios();
        return () => { }
    }, []);

    const logoutHandler = () => {
        setLoading(true);
        logout().then(() => {

        }).catch(() => {

        }).finally(() => {
            setLoading(false);
        });
    }

    const loadUsuarios = () => {
        setLoading(true);
        
        getUsuarios().then((usuarios) => {
            setUsuarios(usuarios);
        }).catch((result) => {
            alert(result);
        }).finally(() => {
            setLoading(false);
        });
    }
    
    return (
        <div className='page'>
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
                    rows={usuarios}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </div>
        </div>
    );
}