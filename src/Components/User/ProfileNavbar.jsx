// import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

// const schema = z.object({
//     username: z.string().trim().min(1, { message: "Username can't empty" }).min(3, { message: "Username must be at least 3 characters" }).max(20, { message: "Username must be less than 20 characters" }),
// });

// eslint-disable-next-line react/prop-types
const ProfileNavbar = ({ total }) => {
    // const [username, setUsername] = useState("");

    // useEffect(() => {
    //     const storedUsername = localStorage.getItem("username");
    //     console.log("🚀 ~ useEffect ~ storedUsername:", storedUsername);

    //     if (!storedUsername && storedUsername === "") {
    //         const userPrompt = prompt("Enter your username: ");

    //         if (userPrompt && userPrompt !== "") {
    //             setUsername(userPrompt);
    //         }
    //     } else {
    //         setUsername(storedUsername);
    //     }
    // }, []);

    // useEffect(() => {
    //     localStorage.setItem("username", username);
    // }, [username]);

    // const username = "SkaSkaSka";
    // const initial = username.substring(0, 2).toUpperCase();
    return (
        <>
            <div className="flex gap-2 items-center justify-center">
                <div className="w-10 h-10 bg-slate-300 rounded-full flex items-center justify-center">
                    <p className="font-bold font-podkova text-xl" title="Total Notes">
                        {total}
                    </p>
                </div>
                <div className="flex flex-col justify-between">
                    {/* <p className="font-bold font-podkova text-lg max-w-28 truncate">{username}</p> */}
                    <Link to="/notes-app/newnotes" className="text-center bg-opacity-70 hover:bg-opacity-100 rounded-md bg-red-500 text-black border border-black hover:text-white px-2">
                        Add New Note
                    </Link>
                </div>
            </div>

            {/* {isOpen && (
                <div className="absolute top-0 left-0 w-screen h-screen bg-slate-700 flex justify-center items-center z-50">
                    <form onSubmit={handleSubmit((data) => setUsername(data.username))} className="flex flex-col gap-3 bg-white p-5 rounded-xl">
                        <div className="">
                            <input {...register("username")} type="text" placeholder="Username..." className="p-2 w-full border-2 border-black text-xl rounded-md" />
                            {errors.username && <p className="text-red-500">{errors.username.message}</p>}
                        </div>

                        <button type="submit" className="p-2 bg-blue-500 text-white rounded-md">
                            Login
                        </button>
                    </form>
                </div>
            )} */}
        </>
    );
};

export default ProfileNavbar;
