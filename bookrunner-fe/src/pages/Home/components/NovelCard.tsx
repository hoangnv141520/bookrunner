import React from "react";
import { NovelDataNoUser } from "../../../types/auth";

interface Props {
    data: NovelDataNoUser;
}

const NovelCard: React.FC<Props> = ({ data }) => {
    return (
        <div className="flex w-full gap-4  overflow-hidden hover:bg-[#150C28]/40 p-3 rounded-md transition-colors">
            <img
                src={data.image}
                alt="Cover"
                className="w-[40%] aspect-[9/13] object-cover rounded-md border border-[#2A1245]/70 shadow-[0_0_15px_rgba(30,15,60,0.3)]"
            />


            <div className="flex flex-col justify-between w-full h-full overflow-hidden">
                <div className="flex flex-col overflow-hidden">
                    <a
                        href={`/novel/${data.id}`}
                        className="block mb-2 text-sm font-serif font-semibold text-[#D4B8FF] hover:text-[#9D71E8] transition-colors"
                        title={data.title}
                    >
                        {data.title}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default NovelCard;