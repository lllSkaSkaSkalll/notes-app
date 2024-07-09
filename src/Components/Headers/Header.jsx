/* eslint-disable react/prop-types */
import { XLogo } from "@phosphor-icons/react";

const Header = ({ inCompleted, handleCompleteAll, searchApi, onChangeInput, onClickLogo }) => {
    return (
        <div className="flex items-center bg-white/70 font-poppins gap-7 border-2 border-transparent shadow-[inset_2px_2px_7px_1px_#000] px-5 py-2 rounded-xl relative w-full">
            <div className="">
                <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" checked={inCompleted === 0} onChange={handleCompleteAll} className="hidden checkbox" />
                    <div className="min-w-7 min-h-7 max-w-7 max-h-7 rounded-full border-[3px] border-black checkbox-custom group-hover:border-yellow-500 flex items-center justify-center">
                        <span></span>
                    </div>
                </label>
            </div>
            <input type="text" name="search" id="search" value={searchApi} onChange={onChangeInput} placeholder="Search..." className="px-5 py-3 text-xl bg-transparent text-black rounded-xl focus:outline-none focus:border-none  w-full" />
            <XLogo size={24} onClick={onClickLogo} className="absolute right-10 text-black cursor-pointer hover:text-red-700" />
        </div>
    );
};

export default Header;
