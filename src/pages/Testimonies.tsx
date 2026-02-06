import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Quote, ArrowLeft, Sparkles, Heart, BookOpen, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Testimony {
  id: number;
  name: string;
  role: string;
  category: "healing" | "transformation" | "calling" | "provision";
  fullTestimony: string;
  highlight: string;
}

const allTestimonies: Testimony[] = [
  {
    id: 1,
    name: "Innocent Power",
    role: "DUSOM Student",
    category: "transformation",
    highlight: "The mantle of the commission visited me in a dream",
    fullTestimony: "I want to appreciate God for the privilege to be here. During our induction program, I contacted fire and something left me. Our community pastor mentioned that God was set to visit some people, and I claimed it. That Sunday night at the Night of Encounter, I had a dream where the mantle of the commission visited me. A group of persons appeared to block me from meeting with Daddy, but power came upon me and I flew to greet him. He opened his chest and asked me to lay on it. This encounter has transformed my life completely."
  },
  {
    id: 2,
    name: "Blessing Okonkwo",
    role: "DUSOM Student",
    category: "provision",
    highlight: "From discouragement to retentive memory",
    fullTestimony: "I really want to appreciate God for His mercy upon my life. My husband faced some challenges recently, and I was discouraged about being able to meet up with lectures and the demands of school. But after Monday's prayer meeting, something shifted. From that day, I started having retentive memory - something I had been struggling with. God has been faithful to me and my family through this season."
  },
  {
    id: 3,
    name: "Olamide Israel",
    role: "DUSOM Student",
    category: "calling",
    highlight: "From Italy to DUSOM - led by the Spirit",
    fullTestimony: "I was in Italy but now I am Olamide Israel. I had health problems that started in year 2000, and they took me to church. In 2001, I had a contact with Jesus Christ in a dream - I saw Him and accepted Him as my Savior. In 2019, my pastor in Lagos told me I had a call to ministry. I decided to come home and enroll in Bible school. I wanted to enter Winners Bible School, but at the gate, the Spirit led me to DUSOM instead. This is where God wanted me to be."
  },
  {
    id: 4,
    name: "Sunday Oluwaseun",
    role: "DUSOM Student",
    category: "transformation",
    highlight: "God gave me understanding to comprehend the Bible",
    fullTestimony: "God has given me understanding to understand the Bible and a retentive memory to assimilate and keep what is taught. I am happy to join the School of Ministry because one of our fathers in the Lord encouraged us to go to school. Last year I wanted to apply but things didn't work out. This year, I made up my mind to apply, and God made it possible. God is going to open your eyes to see things you have never seen before."
  },
  {
    id: 5,
    name: "Grace Adeyemi",
    role: "DUSOM Student",
    category: "provision",
    highlight: "God came through on the first day of the year",
    fullTestimony: "I was angry about missing the Communion on the first Sunday of this year. I told God I wasn't happy about it. I wanted to share this testimony because God came through for me. When I called the landlord about a house, he told me to go check it first. When I got there and called back to express interest, he said the rent was ₦80,000 for 6 months. I made the payment by faith. When I got back to work, my boss was upset and threatened me, but I told him my God had answered me. That was on the first day of the year!"
  }
];

const categoryConfig = {
  healing: {
    icon: Heart,
    label: "Healing",
    gradient: "from-rose-500/10 to-pink-500/10",
    border: "border-rose-200",
    iconBg: "bg-rose-100",
    iconColor: "text-rose-600"
  },
  transformation: {
    icon: Flame,
    label: "Transformation",
    gradient: "from-amber-500/10 to-orange-500/10",
    border: "border-amber-200",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600"
  },
  calling: {
    icon: BookOpen,
    label: "Divine Calling",
    gradient: "from-blue-500/10 to-indigo-500/10",
    border: "border-blue-200",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600"
  },
  provision: {
    icon: Sparkles,
    label: "Divine Provision",
    gradient: "from-emerald-500/10 to-teal-500/10",
    border: "border-emerald-200",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600"
  }
};

const Testimonies = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-primary py-20 md:py-28 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent-gold/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
        
        <div className="container-content relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center justify-center w-16 h-16 bg-accent-gold/20 rounded-full mb-6"
            >
              <Quote className="w-8 h-8 text-accent-gold" />
            </motion.div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Stories of <span className="text-accent-gold">Faith</span> & <span className="text-accent-gold">Transformation</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl leading-relaxed">
              Real testimonies from our students about God's faithfulness, 
              healing, provision, and divine encounters at DUSOM
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonies Grid */}
      <section className="section-padding bg-gradient-to-b from-secondary/30 to-white">
        <div className="container-content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {allTestimonies.map((testimony, index) => {
              const config = categoryConfig[testimony.category];
              const CategoryIcon = config.icon;
              
              return (
                <motion.article
                  key={testimony.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={cn(
                    "group relative bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-500",
                    "border border-border/50 hover:border-accent-gold/30",
                    "overflow-hidden"
                  )}
                >
                  {/* Background gradient on hover */}
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                    config.gradient
                  )} />
                  
                  <div className="relative z-10">
                    {/* Header with category and quote icon */}
                    <div className="flex items-start justify-between mb-6">
                      <div className={cn(
                        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium",
                        config.iconBg,
                        config.iconColor
                      )}>
                        <CategoryIcon className="w-3.5 h-3.5" />
                        {config.label}
                      </div>
                      
                      <Quote className="w-10 h-10 text-accent-gold/20 group-hover:text-accent-gold/40 transition-colors" />
                    </div>

                    {/* Highlight quote */}
                    <blockquote className="mb-4">
                      <p className="text-lg md:text-xl font-heading font-semibold text-foreground leading-snug">
                        "{testimony.highlight}"
                      </p>
                    </blockquote>

                    {/* Divider */}
                    <div className="w-12 h-0.5 bg-accent-gold/30 group-hover:w-20 group-hover:bg-accent-gold transition-all duration-300 mb-4" />

                    {/* Full testimony */}
                    <p className="text-foreground/70 leading-relaxed mb-6 text-sm md:text-base">
                      {testimony.fullTestimony}
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-primary-foreground font-heading font-bold text-lg shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all">
                        {testimony.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors">
                          {testimony.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {testimony.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* Scripture quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center max-w-2xl mx-auto"
          >
            <div className="bg-primary/5 rounded-2xl p-8 md:p-10 border border-primary/10">
              <Quote className="w-8 h-8 text-accent-gold/40 mx-auto mb-4" />
              <p className="text-lg md:text-xl text-foreground/80 italic leading-relaxed font-heading">
                "They triumphed over him by the blood of the Lamb and by the word of their testimony"
              </p>
              <p className="text-accent-gold font-medium mt-4">— Revelation 12:11</p>
            </div>
          </motion.div>

          {/* Back to Home */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link to="/">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Testimonies;
