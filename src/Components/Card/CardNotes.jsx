import { PencilSimple, PushPin, Trash } from "@phosphor-icons/react";
import { formatDistanceToNow } from "date-fns";
import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
const CardNotes = ({ title, date, content, isPinned, tag, onClick, onDelete, onComplete, checkboxValue }) => {
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
        <div className={`${checkboxValue === true ? "bg-slate-500 bg-opacity-50" : "bg-white"} p-5 border rounded-xl flex flex-col gap-1 font-semibold relative z-0 shadow-[0_0_10px_0_rgba(0,0,0,0.5)]`}>
            <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="hidden checkbox" checked={checkboxValue} onChange={onComplete} />
                <div className="min-w-5 min-h-5 max-w-5 max-h-5 rounded-full border-2 checkbox-custom group-hover:border-yellow-500 flex items-center justify-center">
                    <span></span>
                </div>
                <h4 className={`${checkboxValue ? "line-through italic text-slate-500" : ""} text-3xl font-podkova font-bold truncate capitalize`}>{title}</h4>
            </label>
            <div className="flex items-center justify-between">
                <p className={`${checkboxValue ? "line-through italic text-slate-500" : ""} ${dateClass} text-sm`}>{date}</p>
                <p className={`${checkboxValue ? "line-through italic text-slate-500" : ""} ${dateClass} text-sm`}>{dates}</p>
            </div>
            <p className={`${checkboxValue ? "line-through italic text-slate-500" : ""} text-lg truncate`}>{content}</p>
            <div className="flex items-center justify-between">
                <p className={`text-lg font-bold`}>{tag}</p>
                <div className="flex gap-3">
                    <PencilSimple size={18} className="opacity-50 cursor-pointer hover:opacity-100 hover:text-blue-500" />
                    <Trash size={18} onClick={onDelete} className="opacity-50 cursor-pointer hover:opacity-100 hover:text-red-500" />
                </div>
            </div>
            <PushPin
                onClick={onClick}
                size={28}
                className={`${isPinned ? "text-blue-700 bg-blue-300 hover:text-red-500 hover:bg-opacity-50" : "text-white bg-slate-700 hover:text-yellow-500 hover:bg-opacity-80"} absolute top-1 right-1 p-[6px] rounded-full cursor-pointer`}
            />
        </div>
    );
};

export default CardNotes;
