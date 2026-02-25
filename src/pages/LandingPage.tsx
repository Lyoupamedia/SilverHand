import { motion } from "framer-motion";
import heroImage from "@/assets/hero-image.png";
import { ArrowRight, Shield, Zap, Globe, QrCode, Wallet, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const features = [
  {
    icon: Zap,
    title: "Instant Settlement",
    description: "Powered by Solana. Sub-second transactions with near-zero fees.",
  },
  {
    icon: Shield,
    title: "Non-Custodial",
    description: "Your keys, your coins. Full control with enterprise-grade security.",
  },
  {
    icon: QrCode,
    title: "Scan to Pay",
    description: "Pay anywhere with a simple QR scan. Like Apple Pay, but stablecoins.",
  },
  {
    icon: Globe,
    title: "Borderless",
    description: "Send USD-stable value anywhere in the world in seconds.",
  },
  {
    icon: Wallet,
    title: "Multi-Stablecoin",
    description: "USDC, USDT, and future EUR-backed stablecoins supported.",
  },
  {
    icon: TrendingUp,
    title: "Merchant Tools",
    description: "Payment links, analytics, and API access for businesses.",
  },
];

const stats = [
  { value: "<0.01¢", label: "Transaction Fee" },
  { value: "400ms", label: "Settlement Time" },
  { value: "99.9%", label: "Uptime" },
  { value: "0.3%", label: "Merchant Fee" },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="dark min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 glass-strong">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg gradient-silver" />
            <span className="font-display text-xl font-bold tracking-tight">SilverHand</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#how" className="hover:text-foreground transition-colors">How it Works</a>
            <a href="#merchants" className="hover:text-foreground transition-colors">Merchants</a>
          </div>
          <Button variant="secondary" size="sm" onClick={() => navigate("/dashboard")}>
            Launch App
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-glow/5 blur-[120px]" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <motion.div custom={0} variants={fadeUp}>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-muted-foreground font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-glow" />
                  Built on Solana
                </span>
              </motion.div>
              <motion.h1
                custom={1}
                variants={fadeUp}
                className="font-display text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight"
              >
                The Stablecoin
                <br />
                <span className="text-gradient-silver">Payment Layer</span>
                <br />
                for Everyday Life
              </motion.h1>
              <motion.p
                custom={2}
                variants={fadeUp}
                className="text-lg text-muted-foreground max-w-md leading-relaxed"
              >
                Pay for coffee, groceries, and subscriptions with stablecoins.
                Instant. Borderless. Near-zero fees.
              </motion.p>
              <motion.div custom={3} variants={fadeUp} className="flex gap-4">
                <Button size="lg" onClick={() => navigate("/dashboard")} className="gap-2">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg">
                  Read Docs
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden glow-border">
                <img
                  src={heroImage}
                  alt="SilverHand - Silver hand holding a glowing stablecoin"
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-border/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-3xl md:text-4xl font-bold text-gradient-silver">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl font-bold mb-4">
              Everything you need to pay with stablecoins
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Built for speed, security, and simplicity. SilverHand hides the complexity of crypto
              behind a beautiful, intuitive interface.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group p-6 rounded-xl glass hover:glow-border transition-all duration-300"
              >
                <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center mb-4 group-hover:bg-glow/20 transition-colors">
                  <feature.icon className="h-5 w-5 text-foreground" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="relative rounded-2xl glass-strong p-12 md:p-20 text-center overflow-hidden">
            <div className="absolute inset-0 bg-glow/5 blur-[80px] rounded-full mx-auto w-1/2 h-1/2 top-1/4" />
            <div className="relative z-10">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
                Ready to start paying
                <br />
                with stablecoins?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Join thousands already using SilverHand for everyday payments.
              </p>
              <Button size="lg" onClick={() => navigate("/dashboard")} className="gap-2">
                Launch App <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 py-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md gradient-silver" />
            <span className="font-display font-semibold">SilverHand</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 SilverHand. The Stablecoin Payment Layer.
          </p>
        </div>
      </footer>
    </div>
  );
}
