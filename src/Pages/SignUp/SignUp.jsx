import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocailLogin from "../../components/SocialLogin/SocailLogin";

const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { createUser, updateUserProfile } = useContext(AuthContext);

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);
      updateUserProfile(data.name, data.photoURL)
        .then(() => {
          // create user entry in the database

          const userInfo = {
            name: data.name,
            email: data.email
          };

          axiosPublic.post('/users', userInfo)
          .then(res => {
            if (res.data.insertedId) {
              console.log('user check database');
              reset();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "SignUp Successfully",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/");
            }
          });
        })
        .catch((error) => console.log(error));
    });
  };

  return (
    <div>
      <Helmet>
        <title>Bistro Boss | SignUp</title>
      </Helmet>

      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sign Up now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="my-2">
                <label htmlFor="">Name</label>
                <input
                  {...register("name", { required: true })}
                  className="input input-bordered w-full my-2"
                  placeholder="Name"
                />
                {errors.name && (
                  <span className="text-red-400">This field is required</span>
                )}
              </div>

              <div className="my-2">
                <label htmlFor="">Photo URL</label>
                <input
                  {...register("photoURL", { required: true })}
                  className="input input-bordered w-full my-2"
                  placeholder="Photo URL"
                />
                {errors.photoURL && (
                  <span className="text-red-400">Photo URL is required</span>
                )}
              </div>

              <div className="my-2">
                <label htmlFor="">Email</label>
                <input
                  {...register("email", { required: true })}
                  className="input input-bordered w-full my-2"
                  placeholder="Email"
                />
                {errors.email && (
                  <span className="text-red-400">This field is required</span>
                )}
              </div>

              <div className="my-2">
                <label htmlFor="">Password</label>
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])/,
                  })}
                  className="input input-bordered w-full my-2"
                  placeholder="Password"
                />
                {errors.password?.type === "required" && (
                  <span className="text-red-400">Password is required</span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="text-red-400">
                    Password must be 6 characters
                  </span>
                )}
                {errors.password?.type === "maxLength" && (
                  <span className="text-red-400">
                    Password must be less 20 characters
                  </span>
                )}
                {errors.password?.type === "pattern" && (
                  <span className="text-red-400">
                    Password must have one uppercase, one lower case, one number
                    and one spacial characters
                  </span>
                )}
              </div>

              <div className="form-control mt-6">
                <button className="btn btn-primary">SingUp</button>
              </div>
            </form>
            <p className="px-5">
              Already have an account <Link to="/login">Login</Link>
            </p>
            <div className="p-5 bg-ga">
              <SocailLogin ></SocailLogin>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
