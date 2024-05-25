import { FaCalendar, FaComment, FaHome, FaList, FaSearch, FaShoppingCart } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import { FaBook, FaUsers, FaUtensils,  } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
  const [cart]= useCart();

  // TODO: get isAdmin value from the database
  const [isAdmin] = useAdmin();
  return (
    <div className="flex">
        {/* dashboar side bar */}
      <div className="w-60 min-h-screen bg-orange-300">
        <ul className="menu p-4">
         {
          isAdmin? <>
           <li>
            <NavLink to="/dashboard/adminHome"> <FaHome></FaHome>Admin Home</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/addItems"> <FaUtensils/>Add Items</NavLink>
          </li>
     
          <li>
            <NavLink to="/dashboard/manageItems"> <FaList></FaList> Manage Items</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/review"> <FaBook></FaBook>Manage Bookings</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/users"> <FaUsers></FaUsers> All Users</NavLink>
          </li>
          </>
          :
          <>
           <li>
            <NavLink to="/dashboard/userHome"> <FaHome></FaHome>User Home</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/reservation"> <FaCalendar></FaCalendar>Reservition</NavLink>
          </li>
     
          <li>
            <NavLink to="/dashboard/cart"> <FaShoppingCart></FaShoppingCart> My cart ({cart.length})</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/review"> <FaComment></FaComment>Review</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/booking"> <FaList></FaList>Booking</NavLink>
          </li>
          </>
         }

          {/* shard Menu */}
          <div className="divider"></div>
          <li>
            <NavLink to="/"> <FaHome></FaHome>Home</NavLink>
          </li>
          <li>
            <NavLink to="/order/salad"> <FaSearch></FaSearch>Menu</NavLink>
          </li>
          <li>
            <NavLink to="/order/salad"> <MdEmail/>Contact</NavLink>
          </li>
        </ul>
        
      </div>
      {/* dashboard content */}
      <div className="flex-1 p-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
