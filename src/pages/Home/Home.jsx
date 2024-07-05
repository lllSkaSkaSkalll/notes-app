import { MagnifyingGlass, XLogo } from "@phosphor-icons/react";
import Navbar from "../../Components/Navbar";
import CardNotes from "../../Components/Card/CardNotes";
import { useCallback, useMemo, useState } from "react";
import { useDebounch } from "../../libs/useDebounch";

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
                    return { ...data, isPinned: !data.isPinned };
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
                    return { ...data, completed: !data.completed, isPinned: false };
                }
                return data;
            });

            localStorage.setItem("datas", JSON.stringify(newDatas));
            return newDatas;
        });
    }, []);

    // const handleEdit = useCallback((id) => {
    //     console.log(id);
    // }, []);

    const datasSearch = useMemo(() => {
        return datas.filter((data) => {
            if (searchTerm !== "") {
                return data.search.toLowerCase().includes(searchTerm.toLowerCase());
            } else {
                return data;
            }
        });
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
                <header className="flex items-center justify-between flex-wrap gap-5 border-b-2 border-black py-5">
                    <h1 className="text-4xl font-podkova font-bold">Pinned Notes({categoryDatas.pinned.length})</h1>
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
                            onChange={(e) => setSearchApi(e.target.value)}
                            placeholder="Search..."
                            className="px-5 py-2 bg-slate-500 text-white rounded-r-xl focus:outline-none focus:border-none shadow-[5px_3px_0_0_#000] w-full md:w-80"
                        />
                        <XLogo size={24} onClick={() => setSearchApi("")} className="absolute right-5 text-white cursor-pointer hover:text-yellow-500" />
                    </div>
                </header>

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
                                    // onEdit={() => handleEdit(data.id)}
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
                                    // onEdit={() => handleEdit(data.id)}
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
                                    // onEdit={() => handleEdit(data.id)}
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
