import Navbar from "../../Components/Navbar";
import CardNotes from "../../Components/Card/CardNotes";
import { useCallback, useMemo, useState } from "react";
import { useDebounch } from "../../libs/useDebounch";
// import Header from "../../Components/Header";
import { ArrowsDownUp } from "@phosphor-icons/react";
import Header from "../../Components/Headers/Header";

const Home = () => {
    const [datas, setDatas] = useState(() => {
        const data = localStorage.getItem("datas");
        return data ? JSON.parse(data) : [];
    });
    const [searchApi, setSearchApi] = useState("");
    const [isDescending, setIsDescending] = useState(true);
    const [filter, setFilter] = useState("all");

    const searchTerm = useDebounch(searchApi, 1000);

    const handlePinned = useCallback((id) => {
        setDatas((prevDatas) => {
            const newPinnedDatas = prevDatas.map((data) => {
                if (data.id === id) {
                    return { ...data, isPinned: !data.isPinned, updatedAt: new Date().toISOString() };
                }
                return data;
            });

            localStorage.setItem("datas", JSON.stringify(newPinnedDatas));
            return newPinnedDatas;
        });
    }, []);

    const handleDelete = useCallback((id) => {
        setDatas((prevDatas) => {
            const newDatas = prevDatas.filter((data) => data.id !== id);

            localStorage.setItem("datas", JSON.stringify(newDatas));
            return newDatas;
        });
    }, []);

    const handleComplete = useCallback((id) => {
        setDatas((prevDatas) => {
            const newDatas = prevDatas.map((data) => {
                if (data.id === id) {
                    return { ...data, completed: !data.completed, isPinned: false, updatedAt: new Date().toISOString() };
                }
                return data;
            });

            localStorage.setItem("datas", JSON.stringify(newDatas));
            return newDatas;
        });
    }, []);

    const handleDeleteComplete = useCallback(() => {
        setDatas((prevDatas) => {
            const newDatas = prevDatas.filter((data) => !data.completed);

            localStorage.setItem("datas", JSON.stringify(newDatas));
            return newDatas;
        });
    }, []);

    const datasSearch = useMemo(() => {
        return datas
            .filter((data) => {
                if (searchTerm !== "") {
                    return data.search.toLowerCase().includes(searchTerm.toLowerCase());
                } else {
                    return data;
                }
            })
            .sort((a, b) => {
                if (isDescending) {
                    return new Date(b.updatedAt) - new Date(a.updatedAt);
                } else {
                    return new Date(a.updatedAt) + new Date(b.updatedAt);
                }
            });
    }, [datas, searchTerm, isDescending]);

    const categoryDatas = useMemo(() => {
        const pinned = [];
        const filltered = [];
        const completed = [];

        datasSearch.forEach((data) => {
            if (data.isPinned && !data.completed) {
                pinned.push(data);
            } else if (data.completed) {
                completed.push(data);
            } else {
                filltered.push(data);
            }
        });

        return { pinned, filltered, completed };
    }, [datasSearch]);

    const inCompleted = useMemo(() => {
        return datas.filter((data) => !data.completed).length;
    }, [datas]);

    const handleCompleteAll = useCallback(() => {
        setDatas((prevDatas) => {
            const newDatas = prevDatas.map((data) => {
                if (inCompleted > 0) {
                    return { ...data, completed: true, isPinned: false, updatedAt: new Date().toISOString() };
                } else {
                    return { ...data, completed: false, isPinned: false, updatedAt: new Date().toISOString() };
                }
            });

            localStorage.setItem("datas", JSON.stringify(newDatas));
            return newDatas;
        });
    }, [inCompleted]);

    return (
        <div className="min-h-screen pb-20 md:pb-0 bg-image">
            <Navbar total={datas.length} />

            <div className="max-w-3xl m-auto pb-5 p-5 max-h-screen">
                <header className="flex items-center justify-between flex-wrap gap-5 w-full py-5">
                    <Header categoryDatas={categoryDatas} searchApi={searchApi} handleCompleteAll={handleCompleteAll} inCompleted={inCompleted} onChangeInput={(e) => setSearchApi(e.target.value)} onClickLogo={() => setSearchApi("")} />
                </header>
                <div className="border-[3px] border-white/60 rounded-xl bg-black/50 mx-auto overflow-hidden">
                    <section className="">
                        <div className="flex items-center justify-between w-full border-b border-slate-600 py-2 px-5 backdrop-blur-[2px]">
                            <div className="rounded-t-xl overflow-hidden flex items-center gap-5">
                                <p className="text-2xl font-bold font-podkova text-white drop-shadow">Pinned({categoryDatas.pinned.length})</p>
                                <p className="text-2xl font-bold font-podkova text-white drop-shadow">Completed({categoryDatas.completed.length})</p>
                            </div>
                            <ArrowsDownUp onClick={() => setIsDescending(!isDescending)} size={28} className="text-white cursor-pointer hover:text-yellow-500" />
                        </div>
                        {datasSearch.length === 0 ? (
                            <div className="text-center border-2 hover:bg-opacity-80 py-5 text-4xl font-bold font-podkova bg-slate-800 text-white drop-shadow">Notes is empty</div>
                        ) : (
                            <div className="overflow-y-auto max-h-[350px] scroll-custom">
                                {filter === "all" ? (
                                    <>
                                        {categoryDatas.pinned.map((data, index) => (
                                            <CardNotes
                                                id={data.id}
                                                key={index}
                                                tag={data.tag}
                                                date={data.date}
                                                title={data.title}
                                                content={data.content}
                                                isPinned={data.isPinned}
                                                checkboxValue={data.completed}
                                                onClick={() => handlePinned(data.id)}
                                                onDelete={() => handleDelete(data.id)}
                                                onComplete={() => handleComplete(data.id)}
                                            />
                                        ))}
                                        {categoryDatas.filltered.map((data, index) => (
                                            <CardNotes
                                                id={data.id}
                                                key={index}
                                                tag={data.tag}
                                                date={data.date}
                                                title={data.title}
                                                content={data.content}
                                                isPinned={data.isPinned}
                                                checkboxValue={data.completed}
                                                onClick={() => handlePinned(data.id)}
                                                onDelete={() => handleDelete(data.id)}
                                                onComplete={() => handleComplete(data.id)}
                                            />
                                        ))}
                                        {categoryDatas.completed.map((data, index) => (
                                            <CardNotes
                                                id={data.id}
                                                key={index}
                                                tag={data.tag}
                                                date={data.date}
                                                title={data.title}
                                                content={data.content}
                                                isPinned={data.isPinned}
                                                checkboxValue={data.completed}
                                                onClick={() => handlePinned(data.id)}
                                                onDelete={() => handleDelete(data.id)}
                                                onComplete={() => handleComplete(data.id)}
                                            />
                                        ))}
                                    </>
                                ) : filter === "active" ? (
                                    <>
                                        {categoryDatas.pinned.map((data, index) => (
                                            <CardNotes
                                                id={data.id}
                                                key={index}
                                                tag={data.tag}
                                                date={data.date}
                                                title={data.title}
                                                content={data.content}
                                                isPinned={data.isPinned}
                                                checkboxValue={data.completed}
                                                onClick={() => handlePinned(data.id)}
                                                onDelete={() => handleDelete(data.id)}
                                                onComplete={() => handleComplete(data.id)}
                                            />
                                        ))}
                                        {categoryDatas.filltered.map((data, index) => (
                                            <CardNotes
                                                id={data.id}
                                                key={index}
                                                tag={data.tag}
                                                date={data.date}
                                                title={data.title}
                                                content={data.content}
                                                isPinned={data.isPinned}
                                                checkboxValue={data.completed}
                                                onClick={() => handlePinned(data.id)}
                                                onDelete={() => handleDelete(data.id)}
                                                onComplete={() => handleComplete(data.id)}
                                            />
                                        ))}
                                    </>
                                ) : (
                                    categoryDatas.completed.map((data, index) => (
                                        <CardNotes
                                            id={data.id}
                                            key={index}
                                            tag={data.tag}
                                            date={data.date}
                                            title={data.title}
                                            content={data.content}
                                            isPinned={data.isPinned}
                                            checkboxValue={data.completed}
                                            onClick={() => handlePinned(data.id)}
                                            onDelete={() => handleDelete(data.id)}
                                            onComplete={() => handleComplete(data.id)}
                                        />
                                    ))
                                )}
                            </div>
                        )}
                        <div className="px-5 py-2 text-xl relative font-podkova gap-5 text-nowrap text-slate-500 backdrop-blur-[2px] flex items-center justify-between">
                            <p className="">{inCompleted} Items Left</p>
                            <div className="flex absolute top-[150%] backdrop-blur-[2px] left-0 md:static justify-between items-center w-full px-5 md:px-0 py-2 md:py-0 bg-black/50 md:bg-transparent rounded-xl md:justify-center gap-5 text-2xl">
                                <p onClick={() => setFilter("all")} className={`${filter === "all" ? "text-teal-500" : "hover:text-yellow-500"} cursor-pointer `}>
                                    All
                                </p>
                                <p onClick={() => setFilter("active")} className={`${filter === "active" ? "text-teal-500" : "hover:text-yellow-500"} cursor-pointer `}>
                                    Active
                                </p>
                                <p onClick={() => setFilter("completed")} className={`${filter === "completed" ? "text-teal-500" : "hover:text-yellow-500"} cursor-pointer `}>
                                    Completed
                                </p>
                            </div>
                            <p onClick={handleDeleteComplete} className="cursor-pointer hover:text-yellow-500">
                                Clear Complete
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Home;
