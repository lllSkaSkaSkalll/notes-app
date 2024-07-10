import { PencilSimple, PushPin, Trash } from "@phosphor-icons/react";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const CardNotes = ({ title, date, content, isPinned, tag, onClick, onDelete, onComplete, checkboxValue, id }) => {
    const [isOpen, setIsOpen] = useState(false);

    let dates;
    let dateClass = "";

    if (date !== null) {
        const newDate = new Date(date);
        if (!isNaN(newDate.getTime())) {
            dates = formatDistanceToNow(newDate, { addSuffix: true });

            if (dates.includes("hours")) {
                dateClass = "text-red-500";
            } else if (dates.includes("in 1 day")) {
                dateClass = "text-yellow-500";
            } else if (dates.includes("in 2 days")) {
                dateClass = "text-yellow-500";
            } else if (dates.includes("in 3 days")) {
                dateClass = "text-yellow-500";
            } else if (dates.includes("ago")) {
                dateClass = "text-red-500";
            } else {
                dateClass = "text-green-500";
            }
        }
    }

    useEffect(() => {
        if (dates && dates.includes("ago") && checkboxValue === false) {
            onComplete();
        }
    }, [checkboxValue, dates, onComplete]);

    return (
        <div
            className={`${checkboxValue === true ? "bg-slate-500 bg-opacity-50" : "bg-slate-800 bg-opacity-70"} ${
                isPinned ? "bg-slate-900 bg-opacity-70" : ""
            } text-white hover:bg-opacity-100 border-b group/parent border-slate-600 flex flex-col gap-1 font-semibold relative z-0`}
        >
            <div className="group/card px-5 py-2 relative">
                <div className="flex items-center justify-between">
                    <label className="flex items-center gap-3 cursor-pointer group w-full truncate">
                        <input type="checkbox" className="hidden checkbox" checked={checkboxValue} onChange={onComplete} />
                        <div className="min-w-5 min-h-5 max-w-5 max-h-5 rounded-full border-2 checkbox-custom group-hover/parent:border-yellow-500 flex items-center justify-center">
                            <span></span>
                        </div>
                        <div className="">
                            <h4 className={`${checkboxValue ? "line-through italic text-black" : ""} text-2xl font-podkova group-hover:text-yellow-500 truncate capitalize`}>{title}</h4>
                            <div className={`${isOpen ? "hidden" : "block"} flex items-center justify-between gap-5`}>
                                <p className={`${checkboxValue ? "line-through italic text-black" : ""} ${dateClass} text-xs`}>{date}</p>
                                <p className={`${checkboxValue ? "line-through italic text-black" : ""} ${dateClass} text-xs`}>{dates}</p>
                            </div>
                        </div>
                    </label>
                    <div className={`flex gap-3 items-center`}>
                        <span
                            onClick={() => setIsOpen(!isOpen)}
                            className={`${
                                isOpen ? "rotate-[225deg] translate-y-[4px]" : "rotate-45 -translate-y-[4px]"
                            } md:hidden block group-hover/card:block duration-300 w-4 h-4 cursor-pointer hover:border-yellow-500 hover:border-t-transparent hover:border-l-transparent border-[3px] border-t-transparent border-l-transparent `}
                        ></span>
                        <Trash size={18} onClick={onDelete} className="opacity-50 block md:hidden group-hover/card:block cursor-pointer hover:opacity-100 hover:text-red-500" />

                        <PushPin
                            onClick={checkboxValue ? null : onClick}
                            size={28}
                            className={`${isPinned ? "text-blue-700 bg-blue-300 hover:text-red-500 hover:bg-opacity-50 block" : "text-white bg-slate-700 hover:text-yellow-500 hover:bg-opacity-80 blcok md:hidden group-hover/card:block"} ${
                                checkboxValue ? "cursor-not-allowed" : "cursor-pointer"
                            } p-[6px] rounded-full`}
                        />
                    </div>
                </div>
                <div className={`${isOpen ? "block" : "hidden"} pl-8 duration-500`}>
                    <div className="flex items-center justify-between">
                        <p className={`${checkboxValue ? "line-through italic text-black" : ""} ${dateClass} text-xs`}>{date}</p>
                        <p className={`${checkboxValue ? "line-through italic text-black" : ""} ${dateClass} text-xs`}>{dates}</p>
                    </div>
                    <p className={`${checkboxValue ? "line-through italic text-black" : ""} text-xl py-1 font-poppins`}>{content}</p>
                    <div className={`flex items-center justify-between`}>
                        <p className={`${checkboxValue ? "line-through italic text-black" : ""}`}>{tag}</p>
                        <Link to={`/notes-app/edit/${id}/`}>
                            <PencilSimple size={18} className="opacity-50 cursor-pointer hover:opacity-100 hover:text-yellow-500" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardNotes;
