/* eslint-disable react/prop-types */
import { MagnifyingGlass, XLogo } from "@phosphor-icons/react";

const Header = ({ categoryDatas, searchApi, onChangeInput, onClick }) => {
    return (
        <header className="flex items-center justify-between flex-wrap gap-5 border-b-2 border-black py-5">
            <div className="">
                <p className="text-xl font-podkova font-bold">Pinned Notes({categoryDatas.pinned.length})</p>
                <p className="text-xl font-podkova font-bold">Completed Notes({categoryDatas.completed.length})</p>
            </div>
            <div className="flex items-center font-bold font-poppins relative">
                <div className="flex items-center gap-3 p-3 px-5 bg-slate-700 text-white border-r-4 border-slate-900 rounded-l-xl shadow-[5px_3px_0_0_#000]">
                    <MagnifyingGlass size={24} />
                    <p className="text-2xl hidden md:block">Search</p>
                </div>
                <input
                    type="text"
                    name="search"
                    id="search"
                    value={searchApi}
                    onChange={onChangeInput}
                    placeholder="Search..."
                    className="px-5 py-2 bg-slate-500 text-white rounded-r-xl focus:outline-none focus:border-none shadow-[5px_3px_0_0_#000] w-full md:w-80"
                />
                <XLogo size={24} onClick={onClick} className="absolute right-5 text-white cursor-pointer hover:text-yellow-500" />
            </div>
        </header>
    );
};

export default Header;
