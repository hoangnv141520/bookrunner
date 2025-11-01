import CardRecent from './CardRecent'

const RecentNovels = () => {
  return (
    <div className='flex flex-col bg-zinc-950 text-zinc-200 p-6'>
      <a href='' className='flex items-center gap-3 mb-4'>
        <div className='px-3 py-1.5 bg-zinc-900 text-zinc-300 font-medium rounded-sm border-l-2 border-indigo-600'>
          Truyện
        </div>
        <div className='font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-300 relative'>
          vừa đọc
          <span className="absolute -bottom-1 left-0 w-full h-px bg-indigo-800/60"></span>
        </div>
      </a>
      
      <div className='w-full space-y-3'>
        {[...Array(4)].map((_, index) => (
          <div 
            key={index} 
            className="transition-all duration-300 hover:bg-zinc-800/20 rounded group"
          >
            <div className="p-2 relative">
              <CardRecent 
                vol='One shot' 
                chapterTitle='chương 1: mặt trời chân lý' 
                name='that time i recained as a slime sd ds sd dvgsv r'
              />
              
              {/* Subtle border highlight */}
              <div className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 border border-indigo-800/30 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 h-px w-full bg-gradient-to-r from-zinc-800 via-zinc-800/50 to-transparent"></div>
    </div>
  )
}

export default RecentNovels