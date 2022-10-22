let nextTodoId = 0
export const createUsuario = (params) => ({
  type: 'CREATE_USUARIO',
  id: ++nextTodoId,
  params
})

export const updateUsuario = (params) => ({
    type: 'UPDATE_USUARIO',
    params
})

export const loginUsuario = (params) => ({
    type: 'LOGIN_USUARIO',
    params
})

export const logoutUsuario = (params) => ({
    type: 'LOGOUT_USUARIO'
})