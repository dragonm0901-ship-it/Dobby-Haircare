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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-grey-100">
            <img src={image} alt={title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-purple text-white text-xs font-bold uppercase rounded-full">{category}</span>
            </div>
          </div>
          <div className="space-y-4">
            <span className="text-sm text-grey-400 font-medium">{date}</span>
            <h3 className="text-2xl lg:text-3xl font-black text-black group-hover:text-purple transition-colors leading-tight">
              {title}
            </h3>
            <p className="text-grey-400 leading-relaxed">{excerpt}</p>
            <span className="inline-flex items-center gap-2 text-sm font-bold text-purple group-hover:gap-3 transition-all">
              Read Article <ArrowUpRight size={14} />
            </span>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className="group cursor-pointer">
      <div className="relative aspect-[3/2] rounded-2xl overflow-hidden mb-4 bg-grey-100">
        <img src={image} alt={title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-purple text-white text-xs font-bold uppercase rounded-full">{category}</span>
        </div>
      </div>
      <div className="space-y-2">
        <span className="text-sm text-grey-400 font-medium">{date}</span>
        <h3 className="text-xl font-bold text-black group-hover:text-purple transition-colors leading-tight">{title}</h3>
        <p className="text-sm text-grey-400 line-clamp-2">{excerpt}</p>
        <span className="inline-flex items-center gap-1 text-sm font-bold text-purple group-hover:gap-2 transition-all">
          Read More <ArrowUpRight size={14} />
        </span>
      </div>
    </article>
  )
}
