const CardRecent = ({ vol, chapterTitle, name }: { vol: string, chapterTitle: string, name: string }) => {
  return (
    <div className="flex w-full gap-3 items-center overflow-hidden hover:bg-[#150C28]/40 p-2 rounded-md transition-colors">
      <img src="/public/nocover.png" alt="Cover" className="w-[60px] h-20 object-cover rounded-md border border-[#2A1245]/70 shadow-[0_0_10px_rgba(30,15,60,0.3)]" />

      <div className="flex flex-col justify-between w-full h-full overflow-hidden">
        <div className="flex flex-col overflow-hidden">
          <a
            href="#"
            className="block truncate text-sm font-semibold text-[#D4B8FF] hover:text-[#9D71E8] transition-colors"
            title={name}
          >
            {name}
          </a>
          <p className="truncate text-xs text-[#8A6CB8]/70" title={vol}>{vol}</p>
        </div>
        <a href="#" className="truncate text-xs hover:underline text-[#9D71E8] transition-colors" title={chapterTitle}>
          {chapterTitle}
        </a>
      </div>
    </div>
  );
};

export default CardRecent;