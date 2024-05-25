import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTite/SectionTitle";

const AddItems = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <div>
      <SectionTitle
        subHeading={"---Whats new?---"}
        heading={"add an item"}
      ></SectionTitle>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("name")} />
          <select
            {...register("name")}
            className="select select-bordered w-full max-w-xs"
          >
            <option disabled selected>
              Select a Category
            </option>
            <option value="salad">Salad</option>
            <option value="salad">Pizza</option>
            <option value="soup">Soup</option>
            <option value="dessert">Desssert</option>
            <option value="drinks">Drinks</option>
          </select>
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

export default AddItems;
