import { useParams, Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { getBlogPostBySlug, BlogPost } from "@/data/blogPosts";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Clock, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/SEOHead";
import { useEffect } from "react";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  useEffect(() => {
    if (!post) {
      navigate("/blog");
    }
  }, [post, navigate]);

  if (!post) {
    return null;
  }

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = post.title;
    
    switch (platform) {
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
        break;
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, "_blank");
        break;
      case "linkedin":
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank");
        break;
      default:
        navigator.clipboard.writeText(url);
    }
  };

  return (
    <Layout>
      <SEOHead
        title={post.title}
        description={post.excerpt}
        image={post.featuredImage}
      />
      
      {/* Hero Section */}
      <section className="relative bg-primary py-20 md:py-28">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="container-content relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Button
              variant="ghost"
              className="text-white/80 hover:text-white mb-6 -ml-4"
              asChild
            >
              <Link to="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
            </Button>
            
            <span className="inline-block px-4 py-1 bg-accent-gold/20 text-accent-gold rounded-full text-sm font-medium mb-4">
              {post.category}
            </span>
            
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 max-w-4xl">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="relative -mt-10">
        <div className="container-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl"
          >
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-content">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-8"
            >
              <div 
                className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-blockquote:border-accent-gold prose-blockquote:bg-accent-gold/5 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg"
                dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>').replace(/## (.*)/, '<h2 class="text-3xl font-bold mt-12 mb-6">$1</h2>').replace(/### (.*)/, '<h3 class="text-2xl font-bold mt-8 mb-4">$1</h3>').replace(/> "(.*)"/, '<blockquote class="border-l-4 border-accent-gold pl-4 italic my-6">$1</blockquote>').replace(/\*\*(.*)\*\*/, '<strong>$1</strong>').replace(/\*(.*)\*/, '<em>$1</em>') }}
              />

              {/* Images Grid */}
              {post.images.length > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-12">
                  {post.images.slice(1).map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="rounded-xl overflow-hidden"
                    >
                      <img
                        src={image}
                        alt={`${post.title} - Image ${index + 2}`}
                        className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Share Section */}
              <div className="border-t border-border mt-12 pt-8">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Share this article</h4>
                    <p className="text-sm text-muted-foreground">Help spread the message</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleShare("facebook")}
                      className="rounded-full"
                    >
                      <Facebook className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleShare("twitter")}
                      className="rounded-full"
                    >
                      <Twitter className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleShare("linkedin")}
                      className="rounded-full"
                    >
                      <Linkedin className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleShare("copy")}
                      className="rounded-full"
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.article>

            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-4 space-y-8"
            >
              {/* Author Box */}
              <div className="bg-secondary/30 rounded-2xl p-6">
                <h3 className="font-bold text-foreground mb-4">About the Author</h3>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{post.author}</p>
                    <p className="text-sm text-muted-foreground">DUSOM Ministry Team</p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mt-4">
                  Dedicated to equipping believers with the knowledge and tools they need to fulfill their divine calling.
                </p>
              </div>

              {/* CTA Box */}
              <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-6 text-white">
                <h3 className="font-bold text-xl mb-3">Ready to Go Deeper?</h3>
                <p className="text-white/80 text-sm mb-6">
                  Join DUSOM's School of Ministry and experience transformative teaching that will equip you for your calling.
                </p>
                <Button asChild className="w-full bg-accent-gold hover:bg-accent-orange text-white">
                  <Link to="/apply">Apply Now</Link>
                </Button>
              </div>

              {/* Category */}
              <div className="bg-secondary/30 rounded-2xl p-6">
                <h3 className="font-bold text-foreground mb-4">Category</h3>
                <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {post.category}
                </span>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPostPage;
