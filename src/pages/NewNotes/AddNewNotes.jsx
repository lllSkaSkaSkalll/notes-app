import { useState } from "react";
import Navbar from "../../Components/Navbar";
import { getDate } from "../../libs/getDate";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
    title: z.string().trim().min(1, { message: "Title can't empty" }).min(3, { message: "Title must be at least 3 characters" }).max(20, { message: "Title must be less than 20 characters" }),
    content: z.string().trim().min(1, { message: "Content can't empty" }).min(3, { message: "Content must be at least 3 characters" }).max(50, { message: "Content must be less than 50 characters" }),
    tag: z.string().trim().min(1, { message: "Tag can't empty" }).min(3, { message: "Tag must be at least 3 characters" }).max(10, { message: "Tag must be less than 10 characters" }),
    date: z.string().min(1, { message: "Date can't empty" }).date("Please enter a valid date"),
});

const AddNewNotes = () => {
    const [datas, setDatas] = useState(() => {
        const data = localStorage.getItem("datas");
        return data ? JSON.parse(data) : [];
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm({ resolver: zodResolver(schema) });

    const { todayDate, nextYearDate } = getDate();

    const datasId = datas.map((data) => data.id);
    const newBigestId = datasId ? Math.max(...datasId) + 1 : 1;

    const onSubmit = (data) => {
        setIsSubmitting(true);

        const newData = {
            id: newBigestId,
            title: data.title,
            completed: false,
            date: data.date,
            content: data.content,
            isPinned: false,
            tag: data.tag,
            search: data.title + " " + data.content + " " + data.tag,
        };

        setDatas((prevDatas) => [...prevDatas, newData]);
        localStorage.setItem("datas", JSON.stringify([...datas, newData]));

        setTimeout(() => {
            setIsSubmitting(false);
            reset();
        }, 1000);
    };

    return (
        <>
            <Navbar />

            <section className="container py-20">
                <div className="">
                    <form onSubmit={handleSubmit(onSubmit)} className="max-w-[600px] m-auto bg-slate-600 p-5 rounded-xl">
                        <h1 className="text-3xl font-podkova text-center pb-5 border-b-2 font-bold">Add New Notes</h1>
                        <div className="pt-5">
                            <input type="text" {...register("title")} className="px-2 py-3 w-full text-xl border-2 border-black rounded-xl bg-slate-500 text-white" placeholder="Title..." />
                            {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                        </div>
                        <div className="pt-5">
                            <input type="text" {...register("content")} className="px-2 py-3 w-full text-xl border-2 border-black rounded-xl bg-slate-500 text-white" placeholder="Content..." />
                            {errors.content && <p className="text-red-500">{errors.content.message}</p>}
                        </div>
                        <div className="pt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="">
                                <input type="text" {...register("tag")} className="px-2 py-3 w-full text-xl border-2 border-black rounded-xl bg-slate-500 text-white" placeholder="Tags..." />
                                {errors.tag && <p className="text-red-500">{errors.tag.message}</p>}
                            </div>
                            <div className="">
                                <input type="date" {...register("date")} defaultValue={todayDate} min={todayDate} max={nextYearDate} className="px-2 py-3 w-full text-xl border-2 border-black rounded-xl bg-slate-500 text-white" />
                                {errors.date && <p className="text-red-500">{errors.date.message}</p>}
                            </div>
                        </div>
                        <div className="pt-10">
                            <button type="submit" disabled={isSubmitting} className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded">
                                {isSubmitting ? "Loading..." : "Submit"}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};

export default AddNewNotes;
