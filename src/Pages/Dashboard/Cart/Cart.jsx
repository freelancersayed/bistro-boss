import React from "react";
import useCart from "../../../hooks/useCart";
import { FaDeleteLeft } from "react-icons/fa6";
import { MdOutlineDelete } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Cart = () => {
  const [cart, refetch] = useCart();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  const axiosSecure = useAxiosSecure();

  const handleDelete = id=>{

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
      
        axiosSecure.delete(`/carts/${id}`)
        .then(res=>{
          console.log(res.data);
          refetch()
          if(res.data.deletedCount > 0){
              Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
          }
        })
      }
    });
  }


  return (
    <div>
      <div className="flex justify-evenly ">
        <h2 className="text-3xl">Items: {cart.length}</h2>
        <h2 className="text-3xl">Total Price: $ {totalPrice}</h2>
        <button className="btn btn-primary btn-sm">Pay</button>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr className="font-bold text-black">
                <th>
                  SI:
                </th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>ACTION</th>
                <th></th>
              </tr>
            </thead>

        {
            cart.map((item, index) => 
                <tr key={item._id}>
                <th>
                  {index + 1}
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={item.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item.name}</div>
                    </div>
                  </div>
                </td>
                <td>
                 {item.price}
                </td>
                <th>
                  <button onClick={()=>handleDelete(item._id)} className="btn btn-ghost btn-xs"><MdOutlineDelete className="text-xl text-red-500" /></button>
                </th>
              </tr>
            )
        }
            <tbody>

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Cart;
