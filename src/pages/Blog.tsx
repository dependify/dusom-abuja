import { useState, useRef } from "react";
import { Layout } from "@/components/layout/Layout";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, User, ArrowRight, Tag, Search, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import headerBlogBg from "@/assets/header-blog.jpg";
import { blogPosts as newBlogPosts } from "@/data/blogPosts";

const categories = [
  { id: "all", name: "All Posts", count: 8 },
  { id: "Spiritual Growth", name: "Spiritual Growth", count: 6 },
  { id: "Spiritual Warfare", name: "Spiritual Warfare", count: 1 },
  { id: "Family", name: "Family", count: 1 },
];

// Transform new blog posts to match the format expected by the component
const blogPosts = newBlogPosts.map(post => ({
  id: post.id,
  title: post.title,
  excerpt: post.excerpt,
  content: post.content,
  category: post.category,
  author: post.author,
  date: new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
  readTime: post.readTime,
  image: post.featuredImage,
  featured: post.id <= 2, // First 2 posts are featured
  slug: post.slug,
}));

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroProgress, [0, 0.5], [1, 0]);

  const featuredRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: featuredProgress } = useScroll({
    target: featuredRef,
    offset: ["start end", "end start"],
  });
  const featuredY = useTransform(featuredProgress, [0, 1], ["3%", "-3%"]);

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = activeCategory === "all" || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter((post) => post.featured);

  return (
    <Layout>
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-24 overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${headerBlogBg})`,
            y: heroY,
            scale: 1.1,
          }}
        />
        {/* Gradient Overlay for blending */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary-dark/80 to-primary/75" />
        
        {/* Decorative Elements */}
        <motion.div 
          className="absolute inset-0"
          style={{ y: heroY }}
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
          <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-60 h-60 bg-accent-gold/20 rounded-full blur-3xl" />
        </motion.div>

        {/* Floating elements */}
        <motion.div
          className="absolute top-16 left-16 w-20 h-20 rounded-full bg-accent-gold/20 blur-xl"
          animate={{ y: [0, 20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-16 right-16 w-28 h-28 rounded-full bg-accent-green/20 blur-xl"
          animate={{ y: [0, -25, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div
          className="container mx-auto px-4 relative z-10"
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              className="inline-block px-4 py-2 bg-accent-gold/20 text-accent-gold rounded-full text-sm font-semibold mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              News & Updates
            </motion.span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              DUSOM Blog
            </h1>
            <p className="text-xl text-white/80">
              Stay updated with school events, spiritual insights, and inspiring stories
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Posts */}
      <section ref={featuredRef} className="py-16 bg-muted/30 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-40"
          style={{ y: featuredY }}
        >
          <div className="absolute top-20 left-20 w-40 h-40 bg-primary/10 rounded-full blur-2xl" />
          <div className="absolute bottom-20 right-20 w-60 h-60 bg-accent-gold/10 rounded-full blur-2xl" />
        </motion.div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.h2
            className="text-2xl font-bold text-foreground mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Featured Articles
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {featuredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                className="group bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-accent-gold text-primary-dark text-xs font-semibold rounded-full uppercase">
                    {categories.find(c => c.id === post.category)?.name}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {post.author}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                  >
                    Read More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* All Posts with Filter */}
      <section className="py-16 relative overflow-hidden">
        <motion.div
          className="absolute -top-20 -right-20 w-60 h-60 bg-primary/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <motion.aside
              className="lg:w-72 shrink-0"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {/* Search */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">Search</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="bg-card rounded-xl p-6 shadow-md">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-primary" />
                  Categories
                </h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <button
                        onClick={() => setActiveCategory(category.id)}
                        className={`w-full flex items-center justify-between px-4 py-2 rounded-lg transition-all ${
                          activeCategory === category.id
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted text-foreground"
                        }`}
                      >
                        <span>{category.name}</span>
                        <span className={`text-sm ${
                          activeCategory === category.id ? "text-primary-foreground/80" : "text-muted-foreground"
                        }`}>
                          ({category.count})
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter CTA */}
              <motion.div
                className="mt-8 bg-gradient-to-br from-primary to-primary-dark rounded-xl p-6 text-white"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-lg font-semibold mb-2">Subscribe to Updates</h3>
                <p className="text-white/80 text-sm mb-4">
                  Get the latest news and spiritual insights delivered to your inbox.
                </p>
                <Input
                  type="email"
                  placeholder="Your email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 mb-3"
                />
                <button className="w-full py-2 bg-accent-gold text-primary-dark font-semibold rounded-lg hover:bg-accent-gold/90 transition-colors">
                  Subscribe
                </button>
              </motion.div>
            </motion.aside>

            {/* Posts Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-foreground">
                  {activeCategory === "all" ? "All Articles" : categories.find(c => c.id === activeCategory)?.name}
                </h2>
                <span className="text-muted-foreground">
                  {filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""}
                </span>
              </div>

              <motion.div
                className="grid md:grid-cols-2 gap-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {filteredPosts.map((post) => (
                  <motion.article
                    key={post.id}
                    variants={itemVariants}
                    className="group bg-card rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                    whileHover={{ y: -3 }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <span className="absolute top-3 left-3 px-2 py-1 bg-accent-gold text-primary-dark text-xs font-semibold rounded uppercase">
                        {categories.find(c => c.id === post.category)?.name}
                      </span>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <Link
                        to={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 text-primary text-sm font-semibold hover:gap-3 transition-all"
                      >
                        Read More <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </motion.div>

              {filteredPosts.length === 0 && (
                <motion.div
                  className="text-center py-16"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p className="text-muted-foreground text-lg">No articles found matching your criteria.</p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
