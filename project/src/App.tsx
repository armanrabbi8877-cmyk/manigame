import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, ChevronDown, Boxes } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { ParticleField } from "@/components/ParticleField";
import { FloatingBlocks } from "@/components/FloatingBlocks";
import { RewardChest } from "@/components/RewardChest";
import { RewardCard } from "@/components/RewardCard";
import { StepCard } from "@/components/StepCard";
import { NeonButton } from "@/components/NeonButton";
import { CountdownTimer } from "@/components/CountdownTimer";
import { StatsBar } from "@/components/StatsBar";
import { FAQ } from "@/components/FAQ";
import { LiveActivityFeed } from "@/components/LiveActivityFeed";
import { TrustBadges } from "@/components/TrustBadges";

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [showStickyCta, setShowStickyCta] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      setShowStickyCta(window.scrollY > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goToLocker = () => {
    // AdBlueMedia content locker — trigger the locker overlay
    // The locker script loaded in <head> exposes a global trigger function.
    // Try calling it; if unavailable, fall back to the configured URL.
    const w = window as unknown as { VGIzP_eZo_wvFOAc?: { fire?: () => void } };
    if (w.VGIzP_eZo_wvFOAc?.fire) {
      w.VGIzP_eZo_wvFOAc.fire();
    } else if (siteConfig.CONTENT_LOCKER_URL) {
      window.open(siteConfig.CONTENT_LOCKER_URL, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0a0e14] text-white">
      {/* ===== Global background layers ===== */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#0d1a2e_0%,#0a0e14_55%,#06080c_100%)]" />
        {/* Accent glows */}
        <div className="absolute left-[-10%] top-[-5%] h-[45vh] w-[45vh] rounded-full bg-green-500/12 blur-[130px]" />
        <div className="absolute right-[-10%] top-[15%] h-[45vh] w-[45vh] rounded-full bg-blue-500/10 blur-[130px]" />
        <div className="absolute bottom-[-5%] left-[25%] h-[45vh] w-[45vh] rounded-full bg-purple-500/8 blur-[130px]" />
        <div className="absolute right-[20%] bottom-[10%] h-[30vh] w-[30vh] rounded-full bg-amber-500/8 blur-[120px]" />
        {/* Grid overlay — pixel block style */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <FloatingBlocks count={12} />
      </div>

      {/* ===== Nav bar ===== */}
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-white/10 bg-[#0a0e14]/85 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-green-400/30 bg-gradient-to-br from-green-500/25 to-blue-500/20 shadow-[0_0_15px_-3px_rgba(95,211,95,0.5)]">
              <Boxes className="h-5 w-5 text-green-400" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-black tracking-wider text-white">
                {siteConfig.nav.brand}
              </span>
              <span className="text-[9px] font-bold tracking-[0.2em] text-green-400/70">
                {siteConfig.nav.tagline}
              </span>
            </div>
          </div>
          <div className="hidden items-center gap-2 text-xs text-white/50 md:flex">
            <ShieldCheck className="h-4 w-4 text-green-400" />
            <span>Not affiliated with Mojang or Microsoft</span>
          </div>
          <button
            onClick={goToLocker}
            className="rounded-lg border border-green-400/40 bg-green-400/10 px-4 py-2 text-xs font-bold text-green-400 transition-all hover:bg-green-400/20 hover:shadow-[0_0_15px_-3px_rgba(95,211,95,0.6)] md:hidden"
          >
            UNLOCK
          </button>
        </nav>
      </header>

      {/* ===== Hero ===== */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5 pt-24 pb-16 text-center">
        <ParticleField count={50} className="opacity-50" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex flex-col items-center"
        >
          {/* Badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-[11px] font-bold tracking-widest text-amber-400 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"
                style={{ animation: "ping 2s cubic-bezier(0,0,0.2,1) infinite" }}
              />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
            </span>
            {siteConfig.hero.badge}
          </div>

          {/* Title */}
          <h1 className="mb-4 max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl">
            <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(95,211,95,0.3)]">
              {siteConfig.hero.title}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mb-8 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
            {siteConfig.hero.subtitle}
          </p>

          {/* Countdown */}
          <div className="mb-8">
            <CountdownTimer
              minutes={siteConfig.countdown.minutes}
              label={siteConfig.countdown.label}
            />
          </div>

          {/* 3D Chest */}
          <div className="mb-8">
            <RewardChest />
          </div>

          {/* CTA */}
          <NeonButton onClick={goToLocker} className="text-lg">
            {siteConfig.hero.ctaText}
          </NeonButton>
          <p className="mt-3 max-w-sm text-xs text-white/40">{siteConfig.hero.ctaSubtext}</p>

          {/* Trust badges */}
          <div className="mt-8">
            <TrustBadges badges={siteConfig.trustBadges} />
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-6 text-white/30"
        >
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </motion.div>
      </section>

      {/* ===== Stats Bar ===== */}
      <section className="relative z-10 px-5 py-8">
        <div className="mx-auto max-w-3xl">
          <StatsBar stats={siteConfig.stats} />
        </div>
      </section>

      {/* ===== Reward Cards ===== */}
      <section className="relative z-10 px-5 py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white/50">
            <Sparkles className="h-3 w-3 text-green-400" />
            Today's Options
          </div>
          <h2 className="mb-3 text-3xl font-black sm:text-4xl">
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Available Reward Options
            </span>
          </h2>
          <p className="text-white/50">
            Explore the promotional opportunities featured on today's page.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.rewardCards.map((card, i) => (
            <RewardCard key={card.title} {...card} index={i} />
          ))}
        </div>
      </section>

      {/* ===== How It Works ===== */}
      <section className="relative z-10 px-5 py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white/50">
            <ShieldCheck className="h-3 w-3 text-blue-400" />
            Quick Process
          </div>
          <h2 className="mb-3 text-3xl font-black sm:text-4xl">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
          <p className="text-white/50">Three simple steps to continue.</p>
        </motion.div>

        <div className="mx-auto grid max-w-4xl gap-10 sm:grid-cols-3">
          {siteConfig.steps.map((step, i) => (
            <StepCard
              key={step.title}
              number={i + 1}
              title={step.title}
              description={step.description}
              icon={step.icon}
              index={i}
            />
          ))}
        </div>
      </section>

      {/* ===== Main CTA ===== */}
      <section className="relative z-10 px-5 py-20 sm:py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl"
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/8 via-white/5 to-white/0 p-8 text-center backdrop-blur-2xl sm:p-16">
            {/* Inner glows */}
            <div className="pointer-events-none absolute -top-20 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-green-400/25 blur-[80px]" />
            <div className="pointer-events-none absolute -bottom-20 right-0 h-60 w-60 rounded-full bg-purple-400/20 blur-[80px]" />
            <div className="pointer-events-none absolute -bottom-10 left-0 h-40 w-40 rounded-full bg-amber-400/15 blur-[60px]" />

            <div className="relative z-10">
              <h2 className="mb-4 text-3xl font-black tracking-tight sm:text-4xl">
                <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {siteConfig.mainCta.title}
                </span>
              </h2>
              <p className="mb-8 text-white/60">{siteConfig.mainCta.subtitle}</p>
              <NeonButton onClick={goToLocker} className="text-lg">
                {siteConfig.mainCta.buttonText}
              </NeonButton>
              <p className="mt-4 text-xs text-white/40">{siteConfig.mainCta.trustText}</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== Live Activity Feed ===== */}
      <section className="relative z-10 flex justify-center px-5 pb-16">
        <LiveActivityFeed
          title={siteConfig.liveActivity.title}
          messages={siteConfig.liveActivity.messages}
        />
      </section>

      {/* ===== FAQ ===== */}
      <section className="relative z-10 px-5 py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-10 max-w-2xl text-center"
        >
          <h2 className="mb-3 text-3xl font-black sm:text-4xl">
            <span className="bg-gradient-to-r from-green-400 to-amber-400 bg-clip-text text-transparent">
              Frequently Asked Questions
            </span>
          </h2>
          <p className="text-white/50">Everything you need to know about this promotion.</p>
        </motion.div>
        <FAQ items={siteConfig.faq} />
      </section>

      {/* ===== Final CTA ===== */}
      <section className="relative z-10 px-5 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-xl text-center"
        >
          <NeonButton onClick={goToLocker} className="text-base">
            {siteConfig.hero.ctaText}
          </NeonButton>
          <p className="mt-3 text-xs text-white/40">{siteConfig.hero.ctaSubtext}</p>
        </motion.div>
      </section>

      {/* ===== Disclaimer / Footer ===== */}
      <footer className="relative z-10 border-t border-white/5 px-5 py-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mx-auto max-w-2xl text-xs leading-relaxed text-white/30">
            {siteConfig.disclaimer}
          </p>
          <p className="mt-4 text-xs text-white/20">
            © {new Date().getFullYear()} BlockRush Rewards. Independent promotional page.
          </p>
        </div>
      </footer>

      {/* ===== Sticky Mobile CTA ===== */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: showStickyCta ? 0 : 100 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#0a0e14]/90 p-3 backdrop-blur-xl md:hidden"
      >
        <button
          onClick={goToLocker}
          className="relative w-full overflow-hidden rounded-xl border-2 border-green-400/50 bg-gradient-to-br from-green-500/30 via-emerald-500/25 to-green-600/30 px-6 py-3.5 text-base font-bold text-white shadow-[0_0_25px_-3px_rgba(95,211,95,0.6)] transition-all active:scale-95"
        >
          {siteConfig.hero.ctaText}
        </button>
      </motion.div>
    </div>
  );
}

export default App;
