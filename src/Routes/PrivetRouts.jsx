
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PrivetRouts = ({children}) => {
    const {user, loading} = useAuth()
    const location = useLocation();

    if(loading){
        return <span className="loading loading-bars loading-lg min-h-screen"></span>
    
    }
if(user){
    return children;
}
return <Navigate to="/login" state={{from: location}} replace></Navigate>
}

export default PrivetRouts;