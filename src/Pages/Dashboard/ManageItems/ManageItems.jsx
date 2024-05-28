import { MdCabin, MdDelete, MdOutlineDelete } from "react-icons/md";
import SectionTitle from "../../../components/SectionTite/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const ManageItems = () => {
  const [menu, loading, refetch] = useMenu();
const axiosSecure = useAxiosSecure()


  const handleDeleteMenu = (item) =>{
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axiosSecure.delete(`/menu/${item._id}`)
          .then(res=>{
            console.log(res.data);
            refetch()
            if(res.data.deletedCount > 0){
                Swal.fire({
            title: `${item.name} has been deleted`,
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
      <SectionTitle
        heading="Manage All Items"
        subHeading={"Hurry Up"}
      ></SectionTitle>
      <div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th>
                  <label>
                    #
                  </label>
                </th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
           {
            menu.map((item, index)=>
                <tr key={item._id}>
            <th>
                {index+ 1}
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
              
              </div>
            </td>
            <td>
            <div className="font-bold">{item.name}</div>
            </td>
            <td>{item.price}</td>
            <th>
             <Link to={`/dashboard/updateItem/${item._id}`}>
             <button className="btn btn-ghost btn-sm bg-orange-400"><FaEdit></FaEdit></button>
             </Link>
            </th>
            <th>
              <button  onClick={()=>handleDeleteMenu(item)} className="btn btn-ghost btn-xs"><MdDelete className="text-xl text-red-400"/></button>
              {/* <button className="btn btn-sm "><MdOutlineDelete className="text-xl text-red-500" /></button> */}
            </th>
          </tr>
            )
           }
            </tbody>
           
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageItems;
