/* eslint-disable react/prop-types */
import { ArrowsDownUp } from "@phosphor-icons/react";

const HeaderCard = ({ pinned, completed, onClick }) => {
    return (
        <>
            <div className="rounded-t-xl overflow-hidden flex items-center gap-5">
                <p className="text-2xl font-bold font-podkova text-white drop-shadow">Pinned({pinned})</p>
                <p className="text-2xl font-bold font-podkova text-white drop-shadow">Completed({completed})</p>
            </div>
            <ArrowsDownUp onClick={onClick} size={28} className="text-white cursor-pointer hover:text-yellow-500" />
        </>
    );
};

export default HeaderCard;
