/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom
import { toast } from "sonner"; // Notification library, replace with your preferred one
import { useLoginMutation } from "../redux/features/auth/authApi";
import { verifyToken } from "../utils/verifyToken";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [login, { isLoading }] = useLoginMutation(); // Hook from RTK Query

  const onSubmit = async (data: LoginFormInputs) => {
    
    const toastId = toast.loading("loggin in");
    try {
      const userInfo = {
        email: data?.email,
        password: data?.password,
      };
      console.log(userInfo);
      const res = await login(userInfo).unwrap();
      console.log("res.data", res)
      const user = verifyToken(res.token) as unknown as TUser;
      console.log("first user", user)
      dispatch(setUser({ user: user, token: res.token }));
      toast.success("logged in", { id: toastId, duration: 2000 });
      console.log(res);
      navigate("/");
    } catch (err : any) {
      toast.error("something went wrong", { id: toastId, duration: 2000 });
    }
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center h-[80vh] bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white shadow-md rounded-lg">
        <h2 className="mb-6 text-2xl font-bold text-center">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Email Field */}
          <div className="mb-4 ">
            <label
              htmlFor="email"
              className="block text-xl font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-xl font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            New here?{" "}
            <Link
              to="/signup"
              className="text-indigo-600 hover:text-indigo-700"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
