const defaultState = { isAuthenticated: false, email: '', name: '', nextPath: '', mfaRequired: false };

export default function authenticationReducer(state = defaultState, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        email: action.email,
        name: action.name,
      };
    case 'LOGIN_COMPLETE':
      return {
        ...state,
        mfaRequired: false,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        mfaRequired: false,
      };
    case 'LOGOUT_SUCCESS':
      return {
        ...state,
        isAuthenticated: false,
        email: '',
        name: '',
        mfaRequired: false,
      };
    case 'MFA_REQUIRED':
      return {
        ...state,
        isAuthenticated: false,
        mfaRequired: true,
      };
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        isAuthenticated: false,
        mfaRequired: false,
      };
    case 'REGISTER_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        mfaRequired: false,
      };
    case 'SET_NEXT_PATH':
      return {
        ...state,
        nextPath: action.path,
      };
    case 'CLEAR_NEXT_PATH':
      return {
        ...state,
        nextPath: '',
      };
    default:
      return state;
  }
}
