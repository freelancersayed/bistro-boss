import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';
import { MdShoppingCart } from 'react-icons/md';
import useCart from '../../../hooks/useCart';

const NavBar = () => {

const {user, logOut} = useContext(AuthContext);
const [cart] = useCart();


const handlelogOut = ()=>{
  logOut()
  .then(()=>{})
  .catch(error=> console.log(error))
}


    const navOptions = <>
    <li><Link>Home</Link></li>
    <li><Link to="/menu">Our Menu</Link></li>
    <li><Link to="/order/salad">Order Food</Link></li>
    <li><Link to="/secret">secret</Link></li>


    <li><Link to="/dashboard/cart">
    <button className="btn btn-sm">
    <MdShoppingCart />
  <div className="badge badge-secondary">+{cart.length}</div>
</button>
      </Link></li>

    </>

    const loginLogOut = <>
      {
    user? <>
    <span>{user.displayName}</span>
    <img className='w-10 rounded-full h-10 mx-2' src={user.photoURL} alt="" />
     <button onClick={handlelogOut} className="btn btn-sm">LogOut</button>
  </>
    :
    <li><Link to="/login">Login</Link></li>
  }

    </>



    return (
        <div>
           <div className="navbar fixed z-10 bg-opacity-30 max-w-screen-xl bg-black text-white">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-gray-800 rounded-box w-52">
     {
        navOptions
     }
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">Bistro Boss</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
 {
    navOptions
 }
    </ul>
  </div>
  <div className="navbar-end">
{
  loginLogOut
}
  </div>
</div> 
        </div>
    );
};

export default NavBar;