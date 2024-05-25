import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { MdOutlineDelete } from "react-icons/md";
import { FaUser, FaUsers } from "react-icons/fa6";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();


  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users" );
      return res.data;
    },
  });

  const handleMakeAdmin= (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`)
    .then(res =>{
      console.log(res.data);
      if(res.data.modifiedCount > 0){
        refetch()
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is an Admin Now`,
          showConfirmButton: false,
          timer: 1500
        });
      }
    })
  }

  const handleDeleteUser = (user)=>{
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
      
        axiosSecure.delete(`/users/${user._id}`)
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
      <div className="flex justify-evenly text-xl ">
        <h1>All Users</h1>
        <h1>Total Users: {users.length}</h1>
      </div>


      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Rool</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
           { user.role === 'admin' ?<span className="text-green-500 font-bold"> Admin</span> :   <button onClick={()=>handleMakeAdmin(user)} className="btn btn-sm bg-orange-400"><FaUsers className="text-xl text-red-500 text-white" /></button>}
                </td>
                <th>
                  <button onClick={()=>handleDeleteUser(user)} className="btn btn-sm "><MdOutlineDelete className="text-xl text-red-500" /></button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
