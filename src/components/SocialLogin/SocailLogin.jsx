
import { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa6';
import { AuthContext } from '../../providers/AuthProvider';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';

const SocailLogin = () => {

    const {googleLogin} = useContext(AuthContext)
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate()

    const handleGoogle=()=>{
        googleLogin()
        .then(result=>{
            console.log(result.user);
            const userInfo ={
                email: result.user?.email,
                name: result.user?.displayName
            }
            axiosPublic.post('/users', userInfo)
            .then(res=>{
                console.log(res.data);
                navigate('/')
            })
        })
    }

    return (
        <div>
            <button onClick={handleGoogle} ><FaGoogle></FaGoogle></button>
        </div>
    );
};

export default SocailLogin;