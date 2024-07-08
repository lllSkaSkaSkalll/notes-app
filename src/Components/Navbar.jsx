import { Link } from "react-router-dom";
import ProfileNavbar from "./User/ProfileNavbar";

// eslint-disable-next-line react/prop-types
const Navbar = ({ total }) => {
    return (
        <header className="py-3 border-b-4 backdrop-blur-[2px] border-white/70 bg-white bg-opacity-50 ">
            <div className="container flex items-center justify-between flex-wrap gap-5">
                <Link to="/notes-app/" className="text-4xl font-podkova font-bold border-b-4 border-black px-2 rounded-xl hover:text-yellow-500 hover:border-yellow-500">
                    Notes-App
                </Link>
                <ProfileNavbar total={total} />
            </div>
        </header>
    );
};

export default Navbar;
