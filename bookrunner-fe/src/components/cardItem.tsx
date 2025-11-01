const CardItem = ({ chapterTitle, name, image, id }: { chapterTitle: string, name: string, image: string, id: number }) => {
  return (
    <a href={`/chapter/${id}`} className="flex flex-col w-full ">
      <div className="relative">
        <img src={image} alt="Cover" className="object-cover aspect-[9/13] h-auto" />
        <div className="absolute bottom-0 w-full bg-black/50 p-1 text-xs">
          <p className="text-white truncate" title={chapterTitle}>{chapterTitle}</p>
        </div>
      </div>
      <p className="truncate text-sm mt-2 text-center" title={name}>{name}</p>
    </a>
  );
};

export default CardItem;
