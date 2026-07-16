import HeroPanel from '../components/landing/HeroPanel'
import StudioPreview from '../components/landing/StudioPreview'
import ProductCards from '../components/landing/ProductCards'
import FooterStrip from '../components/landing/FooterStrip'

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-page-glow soft-grid">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.03),transparent_40%)]" />

      <div className="relative mx-auto w-full max-w-[1400px] px-4 py-5 md:px-6 md:py-7">
        <div className="grid gap-4 xl:grid-cols-[320px_minmax(0,1fr)]">
          <div className="glass-panel overflow-hidden">
            <HeroPanel />
          </div>
          <StudioPreview />
        </div>

        <ProductCards />
        <FooterStrip />
      </div>
    </div>
  )
}
