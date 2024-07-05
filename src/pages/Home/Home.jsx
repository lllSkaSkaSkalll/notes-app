import Navbar from "../../Components/Navbar";
import CardNotes from "../../Components/Card/CardNotes";
import { useCallback, useMemo, useState } from "react";
import { useDebounch } from "../../libs/useDebounch";
import Header from "../../Components/Header";

const Home = () => {
    const [datas, setDatas] = useState(() => {
        const data = localStorage.getItem("datas");
        return data ? JSON.parse(data) : [];
    });
    const [searchApi, setSearchApi] = useState("");

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

    const datasSearch = useMemo(() => {
        return datas
            .filter((data) => {
                if (searchTerm !== "") {
                    return data.search.toLowerCase().includes(searchTerm.toLowerCase());
                } else {
                    return data;
                }
            })
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    }, [datas, searchTerm]);

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

    return (
        <>
            <Navbar total={datas.length} />

            <div className="container">
                <Header searchApi={searchApi} onChangeInput={(e) => setSearchApi(e.target.value)} categoryDatas={categoryDatas} onClick={() => setSearchApi("")} />
                <section className="py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 border-b-2 border-black">
                    {datasSearch.length === 0 ? (
                        <div className="text-center col-span-3 border-2 h-40 rounded-xl leading-[10rem] text-4xl font-bold font-podkova bg-white drop-shadow">Notes is empty</div>
                    ) : (
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
                    )}
                </section>
            </div>
        </>
    );
};

export default Home;
