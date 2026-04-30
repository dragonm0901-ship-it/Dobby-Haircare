import ScrollReveal from '@/components/ScrollReveal'
import BlogCard from '@/components/BlogCard'
import { blogPosts } from '@/data/blog'

export default function Blog() {
  return (
    <section id="blog" className="relative section-padding bg-bg">
      <div className="section-container">
        <ScrollReveal direction="up" className="text-center mb-10 sm:mb-16">
          <span className="section-label mb-4 sm:mb-6 inline-block">From The Journal</span>
          <h2 className="section-heading mb-3 sm:mb-4">
            Latest
            <br />
            Stories
          </h2>
          <p className="text-base sm:text-lg text-grey-400 max-w-xl mx-auto">
            Expert tips, ingredient deep-dives, and haircare wisdom from our team.
          </p>
        </ScrollReveal>

        {/* Featured */}
        <ScrollReveal direction="up" className="mb-8 sm:mb-12">
          <BlogCard {...blogPosts[0]} featured />
        </ScrollReveal>

        {/* Grid */}
        <ScrollReveal direction="up" stagger={0.12}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
            {blogPosts.slice(1).map((post) => (
              <BlogCard key={post.id} {...post} />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
