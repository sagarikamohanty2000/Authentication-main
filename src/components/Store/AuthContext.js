import React,{ useState} from 'react';

const AuthContext = React.createContext({

    token: '',
    isLoggedIn: false,
    login: (token) => {},
    logout : ()=> {}
});


export const AuthProvider = (props) => {
 const [token, setToken] = useState(false);

 const isloggedin = !!token;
 
 const loginHandler = (token) => {
    setToken(token);
 }

 const logoutHandler = () => {
    setToken('');
 }

const context = {
    token: token,
    isLoggedIn: isloggedin,
    login: loginHandler,
    logout: logoutHandler
}

return(
    <AuthContext.Provider value={context}>{props.children}</AuthContext.Provider>
)
}




export default AuthContext;