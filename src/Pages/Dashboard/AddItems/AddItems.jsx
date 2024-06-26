import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTite/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItems = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    // imge upload to imgbb and then get an url
    console.log(data);

    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      // now sen the menu item data to the server with the image
      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: res.data.data.display_url,
      };
      const menuRes = await axiosSecure.post("/menu", menuItem);
      console.log(menuRes);
      if (menuRes.data.insertedId) {
        //  show success popup
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} is added to the menu.`,
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
      }
    }
    console.log(res.data);
  };

  return (
    <div>
      <SectionTitle
        subHeading={"---Whats new?---"}
        heading={"add an item"}
      ></SectionTitle>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="form-control w-full my-2">
            <div className="label">
              <span className="label-text">Recipe name*</span>
            </div>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Recipe name"
              className="input input-bordered w-full "
            />
          </label>
          <div className="flex w-full gap-4 my-2">
            {/* category */}

            <div className="flex-1">
              <div className="label">
                <span className="label-text">Category*</span>
              </div>
              <select
                {...register("category", { required: true })}
                className="select select-bordered w-full "
                placeholder="Selected Category"
                defaultValue="default"
              >
                <option disabled value="default">
                  Select a Category
                </option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">Desssert</option>
                <option value="drinks">Drinks</option>
              </select>
            </div>
            {/* price */}
            <div className="flex-1">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Price*</span>
                </div>
                <input
                  {...register("price", { required: true })}
                  type="text"
                  placeholder="Price"
                  className="input input-bordered w-full "
                />
              </label>
            </div>
          </div>
          {/* recipe details */}
          <div className="label">
            <span className="label-text">Recipe Details*</span>
          </div>
          <textarea
            {...register("recipe")}
            className="textarea textarea-bordered w-full"
            placeholder="Bio"
          ></textarea>

          {/* file input */}
          <div>
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input w-full"
            />
          </div>
          <button className="btn bg-gray-700 text-white">
            Add Item <FaUtensils></FaUtensils>{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
