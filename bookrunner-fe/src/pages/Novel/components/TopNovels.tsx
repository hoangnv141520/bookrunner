import React  from 'react'
import { FaStar } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { NovelData } from '../../../types/auth'

interface TopNovelsProps {
    novels: NovelData[]
}

const TopNovels: React.FC<TopNovelsProps> = ({ novels }) => {
    return (
        <div className="space-y-4">
            {novels.splice(0, 5).map((novel, i) => (
                <div key={i} className="flex items-start space-x-3">
                    <span className="font-bold text-lg text-purple-500/50 w-6">{i + 1}</span>
                    <div className="relative">
                        <div className={`absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-md blur opacity-${30 - i * 5} ${i > 2 ? 'hidden' : ''}`}></div>
                        <img
                            src={novel?.image}
                            alt={`Top Novel ${i + 1}`}
                            className="relative w-12 h-16 object-cover rounded shadow border border-purple-900/30"
                        />
                    </div>
                    <div>
                        <Link to={`/novel/${i}`} className="font-medium text-purple-300 hover:text-purple-200 transition-colors duration-300">
                            {i === 0 ? novel?.title : `Tên Truyện Nổi Bật ${i + 1}`}
                        </Link>
                        <div className="flex text-purple-400 text-xs mt-1">
                            {[...Array(5)].map((_, j) => (
                                <FaStar key={j} className={j < 5 - (i * 0.5) ? 'text-purple-400' : 'text-gray-700'} />
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TopNovels