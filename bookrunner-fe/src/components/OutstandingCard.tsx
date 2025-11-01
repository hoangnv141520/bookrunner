import { Link } from "react-router-dom";
import { NovelData } from "../types/auth";

interface Props {
  data: NovelData;
}

const OutstandingCard: React.FC<Props> = ({ data }) => {
  return (
    <Link to={`/novel/${data.id}`}className="flex flex-col w-full">
      <div className="relative">
        <img src={data.image} alt="Cover" className="object-cover w-full h-[300px] rounded-md" />
        <div className="absolute bottom-0 w-full bg-black/50 p-2 text-xs">
          <p className="text-white text-center text-[18px] truncate" title={data.title}>{data.title}</p>
        </div>
      </div>
    </Link>
  );
};

export default OutstandingCard;
