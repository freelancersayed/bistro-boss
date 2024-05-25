import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";


const FoodCard = ({item}) => {

const {name, image, price, recipe, category, _id} = item;
  const {user}= useAuth();
const navigate = useNavigate();
const location = useLocation();
const axiosSecure = useAxiosSecure();
const [ , refetch] = useCart();

const handleAddCard = food =>{

    if(user && user.email){
      // send cart item to the database

      const cartItem = {
        menuId: _id,
        email: user.email,
        name,
        image,
        price
      }
      axiosSecure.post('/carts', cartItem)
      .then(res =>{
        console.log(res.data);
        if(res.data.acknowledged){
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${name}, 'to added your cart'`,
            showConfirmButton: false,
            timer: 2000
          });
          // refetch cart to update the cart items counts
          refetch()
        }
      })

    }else{
      Swal.fire({
        title: "You are Not Logged It?",
        text: "Please login to add to the cart?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, login!"
      }).then((result) => {
        if (result.isConfirmed) {
        // send the user login page
        navigate("/login", {state: {from: location}})
        }
      });
    }
}



    return (
        <div>
        <div className="card w-96 bg-base-100 shadow-xl">
  <figure><img src={image} alt="Shoes" />
  <p className="bg-gray-900 text-white absolute right-0 top-0 mr-4 mt-4 px-2">${price}</p>
  </figure>
  <div className="card-body">
    <h2 className="card-title">{name}</h2>
    <p>{recipe}</p>
    <p>{category}</p>
    <div className="card-actions justify-end flex flex-col items-center">
      <button
      onClick={handleAddCard}
       className="btn btn-outline border-0 border-orange-400 border-b-2 mt-4">Add to Cart</button>
    </div>
  </div>
</div>
        </div>
    );
};

export default FoodCard;