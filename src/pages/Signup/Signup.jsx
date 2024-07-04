import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeSlash } from "@phosphor-icons/react";

const namePattern = /^[A-Za-z\s]+$/;

const schema = z
    .object({
        username: z
            .string()
            .trim()
            .min(1, { message: "Username can't empty" })
            .min(3, { message: "Username must be at least 3 characters" })
            .max(20, { message: "Username must be less than 20 characters" })
            .regex(namePattern, { message: "Username must contain only letters" }),
        email: z.string().trim().min(1, { message: "Please enter a valid email" }).email().max(50, { message: "Email must be less than 50 characters" }),
        password: z.string().trim().min(1, { message: "Password can't empty" }).min(8, { message: "Password must be at least 8 characters" }).max(20, { message: "Maximum password must be less than 20 characters" }),
        confirmPassword: z.string().trim().min(1, { message: "Please confirm your password" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    });

const Signup = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(schema) });

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        console.log(data);
        setTimeout(() => {
            setIsSubmitting(false);
        }, 1000);
    };
    return (
        <>
            <Navbar />

            <div className="container pt-10">
                <div className="max-w-[800px] m-auto p-5">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex m-auto flex-col gap-5 px-5 py-5 md:px-10 border w-fit rounded-xl drop-shadow-xl bg-white">
                        <h4 className="text-3xl text-center py-5 font-podkova font-bold">Sign Up</h4>
                        <div className="flex flex-col gap-5 w-[500px] m-auto justify-between flex-wrap border p-5 rounded-xl bg-slate-300">
                            <div className="">
                                <input {...register("username")} type="text" placeholder="Username..." className="p-2  w-full border-2 border-black text-xl rounded-md" />
                                {errors.username && <p className="text-red-500">{errors.username.message}</p>}
                            </div>
                            <div className="">
                                <input {...register("email")} type="text" placeholder="Email..." className="p-2  w-full border-2 border-black text-xl rounded-md" />
                                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                            </div>
                            <div className="">
                                <div className="flex items-center justify-center border-2 border-black rounded-md relative">
                                    <input {...register("password")} type={isShowPassword ? "text" : "password"} placeholder="Password..." className="p-2 text-xl  w-full bg-white rounded-md focus:outline-none focus:border-none" />

                                    {!isShowPassword ? (
                                        <Eye size={28} className="absolute right-3 cursor-pointer" onClick={() => setIsShowPassword(!isShowPassword)} />
                                    ) : (
                                        <EyeSlash size={28} className="absolute right-3 cursor-pointer" onClick={() => setIsShowPassword(!isShowPassword)} />
                                    )}
                                </div>
                                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                            </div>
                            <div className="">
                                <div className="flex items-center justify-center border-2 border-black rounded-md relative">
                                    <input
                                        {...register("confirmPassword")}
                                        type={isShowConfirmPassword ? "text" : "password"}
                                        placeholder="Re-enter your Password..."
                                        className="p-2 text-xl  w-full bg-white rounded-md focus:outline-none focus:border-none"
                                    />

                                    {!isShowConfirmPassword ? (
                                        <Eye size={28} className="absolute right-3 cursor-pointer" onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)} />
                                    ) : (
                                        <EyeSlash size={28} className="absolute right-3 cursor-pointer" onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)} />
                                    )}
                                </div>
                                {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
                            </div>
                            <button
                                className={`${
                                    isSubmitting ? "cursor-progress" : ""
                                } border-2 font-bold mt-5 font-podkova text-xl border-black rounded-md bg-violet-500 text-black shadow-[0_5px_0px_0_rgba(0,0,0,0.5)] hover:shadow-[0px_0px_0px_0_rgba(0,0,0,0.5)] hover:translate-y-2 duration-300 hover:bg-opacity-60 group relative hover:scale-95`}
                                type="submit"
                                disabled={isSubmitting}
                            >
                                <span className="w-full py-2 flex items-center gap-2 border-2 border-transparent justify-center group-hover:-translate-y-4 group-hover:bg-white group-hover:scale-105 group-hover:bg-opacity-50 duration-300 rounded-md group-hover:border-2 group-hover:border-white group-hover:border-opacity-50 backdrop-blur-sm">
                                    {isSubmitting ? (
                                        <>
                                            <span className="w-5 h-5 border-[3px] border-lime-500 border-t-violet-900 animate-spin rounded-full"></span>
                                            <p>Loading...</p>
                                        </>
                                    ) : (
                                        "Sign Up"
                                    )}
                                </span>
                            </button>
                        </div>
                        <p className="text-center">
                            Already have an account?
                            <Link to="/login" className="underline text-blue-500">
                                Login here!
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Signup;
