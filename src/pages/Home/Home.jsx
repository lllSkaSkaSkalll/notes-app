import Navbar from "../../Components/Navbar";
import CardNotes from "../../Components/Card/CardNotes";
import { useCallback, useMemo, useState } from "react";
import { useDebounch } from "../../libs/useDebounch";
import Header from "../../Components/Headers/Header";
import HeaderCard from "../../Components/Card/HeaderCard";
import FooterCard from "../../Components/Card/FooterCard";

const Home = () => {
    const [datas, setDatas] = useState(() => {
        const data = localStorage.getItem("datas");
        return data ? JSON.parse(data) : [];
    });
    const [searchApi, setSearchApi] = useState("");
    const [isDescending, setIsDescending] = useState(true);
    const [filter, setFilter] = useState("all");

    const searchTerm = useDebounch(searchApi, 1000);

    const updatedDatas = (newDatas) => {
        localStorage.setItem("datas", JSON.stringify(newDatas));
        setDatas(newDatas);
    };

    const handlePinned = useCallback((id) => {
        setDatas((prevDatas) => {
            const newPinnedDatas = prevDatas.map((data) => {
                if (data.id === id) {
                    return { ...data, isPinned: !data.isPinned, updatedAt: new Date().toISOString() };
                }
                return data;
            });

            updatedDatas(newPinnedDatas);
            return newPinnedDatas;
        });
    }, []);

    const handleDelete = useCallback((id) => {
        setDatas((prevDatas) => {
            const newDatas = prevDatas.filter((data) => data.id !== id);

            updatedDatas(newDatas);
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

            updatedDatas(newDatas);
            return newDatas;
        });
    }, []);

    const handleDeleteComplete = useCallback(() => {
        setDatas((prevDatas) => {
            const newDatas = prevDatas.filter((data) => !data.completed);

            updatedDatas(newDatas);
            return newDatas;
        });
    }, []);

    const datasSearch = useMemo(() => {
        return datas
            .filter((data) => (searchTerm !== "" ? data.search.toLowerCase().includes(searchTerm.toLowerCase()) : data))
            .sort((a, b) => (isDescending ? new Date(b.updatedAt) - new Date(a.updatedAt) : new Date(a.updatedAt) + new Date(b.updatedAt)));
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
                return { ...data, completed: inCompleted > 0, isPinned: false, updatedAt: new Date().toISOString() };
            });

            updatedDatas(newDatas);
            return newDatas;
        });
    }, [inCompleted]);

    const renderNotes = (notes) => {
        return notes.map((data, index) => (
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
        ));
    };

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
                            <HeaderCard 
                                pinned={categoryDatas.pinned.length} 
                                completed={categoryDatas.completed.length} 
                                onClick={() => setIsDescending(!isDescending)} 
                            />
                        </div>
                        {datasSearch.length === 0 ? (
                            <div className="text-center border-2 hover:bg-opacity-80 py-5 text-4xl font-bold font-podkova bg-slate-800 text-white drop-shadow">Notes is empty</div>
                        ) : (
                            <div className="overflow-y-auto max-h-[350px] scroll-custom">
                                {filter === "all"
                                    ? renderNotes([...categoryDatas.pinned, ...categoryDatas.filltered, ...categoryDatas.completed])
                                    : filter === "active"
                                    ? renderNotes([...categoryDatas.pinned, ...categoryDatas.filltered])
                                    : renderNotes(categoryDatas.completed)}
                            </div>
                        )}
                        <div className="px-5 py-2 text-xl relative font-podkova gap-5 text-nowrap text-slate-500 backdrop-blur-[2px] flex items-center justify-between">
                            <FooterCard
                                filter={filter}
                                inCompleted={inCompleted}
                                filterAll={() => setFilter("all")}
                                filterActive={() => setFilter("active")}
                                filterCompleted={() => setFilter("completed")}
                                handleDeleteComplete={handleDeleteComplete}
                            />
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Home;
