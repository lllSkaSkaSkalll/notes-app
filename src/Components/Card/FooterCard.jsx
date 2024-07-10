/* eslint-disable react/prop-types */

const FooterCard = ({ inCompleted, filter, filterAll, filterActive, filterCompleted, handleDeleteComplete }) => {
    return (
        <>
            <p className="">{inCompleted} Items Left</p>
            <div className="flex absolute top-[150%] backdrop-blur-[4px] left-0 md:static border-[3px] md:border-none border-white/50 justify-between items-center w-full px-5 md:px-0 py-2 md:py-0 bg-black/50 md:bg-transparent rounded-xl md:justify-center gap-5 text-2xl">
                <p onClick={filterAll} className={`${filter === "all" ? "text-teal-500" : "hover:text-yellow-500"} cursor-pointer `}>
                    All
                </p>
                <p onClick={filterActive} className={`${filter === "active" ? "text-teal-500" : "hover:text-yellow-500"} cursor-pointer `}>
                    Active
                </p>
                <p onClick={filterCompleted} className={`${filter === "completed" ? "text-teal-500" : "hover:text-yellow-500"} cursor-pointer `}>
                    Completed
                </p>
            </div>
            <p onClick={handleDeleteComplete} className="cursor-pointer hover:text-yellow-500">
                Clear Complete
            </p>
        </>
    );
};

export default FooterCard;
