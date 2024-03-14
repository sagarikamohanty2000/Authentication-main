import React,{ useState} from 'react';

const AuthContext = React.createContext({

    token: '',
    isLoggedIn: false,
    login: (token) => {},
    logout : ()=> {}
});


export const AuthProvider = (props) => {
 
    const prevToken = localStorage.getItem('token');
    const [token, setToken] = useState(prevToken);

    
 const isloggedin = !!token;
 
 const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem('token',token);
    setTimeout(() => {
    localStorage.removeItem('token');
    setToken('')
    }, 50000)
 }

 const logoutHandler = () => {
    setToken('');
    localStorage.removeItem('token');
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