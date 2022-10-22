const usuarioReducer = (state = [], action) => {
    const _state = [ ...state ];
    let index;
    switch (action.type) {
      case 'CREATE_USUARIO':
        _state.push({
            id: action.id,
            created_at: new Date(),
            updated_at: new Date(),
            ...action.params
        });
        return _state;
      case 'UPDATE_USUARIO':
        index = _state.findIndex(item => item.usuario = action.params.usuario);
        _state[index] = { ..._state[index], updated_at: new Date(), ...action.params }
        return _state;
      case 'LOGIN_USUARIO':
        index = _state.findIndex(item => item.usuario = action.params.usuario);
        for(let i = 0; i < _state.length; i++) {
            if (i === index) {
                _state[i] = { ..._state[i], logged_at: new Date(), loggedIn: true }
            }
            else {
                _state[i] = { ..._state[i], loggedIn: false }
            }
        }
        return _state;
      case 'LOGOUT_USUARIO':
        for(let i = 0; i < _state.length; i++) {
            _state[i] = { ..._state[i], loggedIn: false }
        }
        return _state;
      default:
        return _state
    }
  }
  
  export default usuarioReducer