import { ArrowUpRight } from 'lucide-react'

interface BlogCardProps {
  image: string
  title: string
  excerpt: string
  date: string
  category: string
  featured?: boolean
}

export default function BlogCard({
  image,
  title,
  excerpt,
  date,
  category,
  featured = false,
}: BlogCardProps) {
  if (featured) {
    return (
      <article className="group cursor-pointer col-span-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-grey-100">
            <img src={image} alt={title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
              <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-purple text-white text-[10px] sm:text-xs font-bold uppercase rounded-full">{category}</span>
            </div>
          </div>
          <div className="space-y-3 sm:space-y-4">
            <span className="text-xs sm:text-sm text-grey-400 font-medium">{date}</span>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-black group-hover:text-purple transition-colors leading-tight">
              {title}
            </h3>
            <p className="text-sm sm:text-base text-grey-400 leading-relaxed">{excerpt}</p>
            <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-purple group-hover:gap-3 transition-all">
              Read Article <ArrowUpRight size={14} />
            </span>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className="group cursor-pointer">
      <div className="relative aspect-[3/2] rounded-xl sm:rounded-2xl overflow-hidden mb-3 sm:mb-4 bg-grey-100">
        <img src={image} alt={title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
          <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-purple text-white text-[10px] sm:text-xs font-bold uppercase rounded-full">{category}</span>
        </div>
      </div>
      <div className="space-y-1.5 sm:space-y-2">
        <span className="text-xs sm:text-sm text-grey-400 font-medium">{date}</span>
        <h3 className="text-base sm:text-xl font-bold text-black group-hover:text-purple transition-colors leading-tight">{title}</h3>
        <p className="text-xs sm:text-sm text-grey-400 line-clamp-2">{excerpt}</p>
        <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-purple group-hover:gap-2 transition-all">
          Read More <ArrowUpRight size={14} />
        </span>
      </div>
    </article>
  )
}
