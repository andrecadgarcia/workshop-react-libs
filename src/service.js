function encrypt(senha) {
    return btoa(senha);
}

function decrypt(senha) {
    return atob(senha);
}

function getTimeout() {
    return 1000;
}
function setUsuarios(usuarios) {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function fetchUsuarios() {
    const usuariosSTR = localStorage.getItem('usuarios');
    return (usuariosSTR && JSON.parse(usuariosSTR)) || [];
}

function setLoggedUser(usuario) {
    if (!usuario) {
        localStorage.removeItem("token");
    }
    else {
        localStorage.setItem("token", JSON.stringify(encrypt(usuario)));
    }
}

function logDate(usuario) {
    const usuarios = fetchUsuarios();
    const index = usuarios.findIndex(item => item.usuario === usuario);
    if (index === -1) {
        return {
            success: false,
            message: "Usuário não encontrado"
        }
    }

    usuarios[index].logged_at = Date();
    setUsuarios(usuarios);
}

function validateLogin(usuario, senha) {
    const usuarios = fetchUsuarios();
    const index = usuarios.findIndex(item => `${item.usuario}`.toUpperCase() === `${usuario}`.toUpperCase() && item.senha === encrypt(senha)); 
    return index;
}

function createUsuario(usuario, senha) {
    const usuarios = fetchUsuarios();
    const index = usuarios.findIndex(item => `${item.usuario}`.toUpperCase() === `${usuario}`.toUpperCase()); 
    if (index > -1) {
        return {
            success: false,
            message: 'Usuário já cadastrado'
        }
    }

    const maxId = Math.max(usuarios.map(item => item.id)) || 0;

       
    usuarios.push({ 
        id: maxId + 1,
        usuario, 
        senha: encrypt(senha), 
        created_at: Date(), 
        updated_at: Date(), 
        logged_at: Date() 
    });
    setUsuarios(usuarios);

    return {
        success: true,
        message: 'Usuário cadastrado'
    }
}

function updateUsuario(usuario, senha) {
    const usuarios = fetchUsuarios();
    const index = usuarios.findIndex(item => `${item.usuario}`.toUpperCase() === `${usuario}`.toUpperCase());
    if (index === -1) {
        return {
            success: false,
            message: 'Usuário não encontrado'
        }
    }
    usuarios[index].senha = encrypt(senha);
    usuarios[index].updated_at = Date();
    
    setUsuarios(usuarios);
    return {
        success: true,
        message: 'Usuário atualizado'
    }
}

export function login(usuario, senha) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (validateLogin(usuario, senha) === -1) {
                reject("Usuário e/ou senha inválidos");
            }
            else {
                logDate(usuario);
                setLoggedUser(usuario);
                resolve(`${usuario} entrou`);
                const event = new CustomEvent("login");
                document.dispatchEvent(event);
            }
        }, getTimeout());
    });
}

export function sigin(usuario, senha) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const result = createUsuario(usuario, senha);
            if (result.success) {
                resolve(result.message);
            }
            else {
                reject(result.message);
            }
        }, getTimeout());
    });
}

export function update(usuario, senha, nova_senha) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const result = updateUsuario(usuario, senha, nova_senha);
            if (result.success) {
                resolve(result.message);
            }
            else {
                reject(result.message);
            }
        }, getTimeout());
    });
}

export function logout() {
    return new Promise((resolve) => {
        setTimeout(() => {
            setLoggedUser(null);
            const event = new CustomEvent("logout");
            document.dispatchEvent(event);
            resolve();
        }, getTimeout());
    });
    
}

export function getLoggedUser() {
    const tokenSTR = localStorage.getItem('token');
    return (tokenSTR && decrypt(JSON.parse(tokenSTR))) || null;
}

export function getUsuarios() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(fetchUsuarios());
        }, getTimeout());
    });
}