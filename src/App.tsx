import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag, Menu, X, Instagram, Twitter, ChevronRight, ArrowRight, ArrowLeft, Heart, MessageCircle } from "lucide-react";
import { useState, useEffect, ReactNode, useMemo } from "react";

// Símbolos calcados de las imágenes con alta fidelidad para bordado
const WingsIcon = () => (
  <svg viewBox="0 0 100 100" className="w-28 h-28 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
    <path fill="currentColor" d="M50 40c-5-10-20-15-35-5-10 10-5 30 5 40l30-35c0 0 0 0 0 0z" />
    <path fill="currentColor" d="M50 40c5-10 20-15 35-5 10 10-5 30-5 40l-30-35z" />
    <path fill="white" d="M25 45c-2-2-5-2-7 0-3 3-2 8 2 12l5-12zM75 45c2-2 5-2 7 0 3 3 2 8-2 12l-5-12z" opacity="0.4" />
  </svg>
);

const RoseIcon = ({ color, stemColor = "text-green-700" }: { color: string, stemColor?: string }) => (
  <svg viewBox="0 0 100 100" className="w-28 h-28">
    <path className={color} fill="currentColor" d="M50 20c-5 0-10 5-10 10 0 5 10 15 10 15s10-10 10-15c0-5-5-10-10-10zM40 30c-5-5-15-5-15 5 0 10 15 20 25 25-10-5-25-15-25-25zM60 30c5-5 15-5 15 5 0 10-15 20-25 25 10-5 25-15 25-25z" />
    <path className={stemColor} fill="none" stroke="currentColor" strokeWidth="2" d="M50 50v30m-5-15s-5-2-8 0m13-5s5-2 8 0" />
    <path className={stemColor} fill="currentColor" d="M42 65c-3-1-6 1-4 4 2 3 5 2 4-4zM58 60c3-1 6 1 4 4-2 3-5 2-4-4z" />
  </svg>
);

const CrownIcon = () => (
  <svg viewBox="0 0 100 100" className="w-28 h-28 text-[#ffff00]">
    <path fill="currentColor" d="M20 70l-5-35 20 15 15-25 15 25 20-15-5 35h-60zM20 75h60v5h-60v-5z" />
  </svg>
);

const ChessKingIcon = () => (
  <svg viewBox="0 0 100 100" className="w-24 h-24 text-black">
    <path fill="currentColor" d="M50 10h2v4h4v2h-4v4h-2v-4h-4v-2h4v-4zM35 30h30v5H35v-5zM38 35l2 35h20l2-35H38zM30 75h40v5H30v-5zM25 85h50v5H25v-5z" />
  </svg>
);

const CrossGothicIcon = () => (
  <svg viewBox="0 0 100 100" className="w-28 h-28 text-black opacity-95">
    {/* Chrome Hearts Style Cross */}
    <path fill="currentColor" d="M50 10c2 0 4 2 4 4v16c2 0 14 6 14 16s-12 16-14 16v28c0 2-2 4-4 4s-4-2-4-4V62c-2 0-14-6-14-16s12-16 14-16V14c0-2 2-4 4-4z" />
    <path fill="currentColor" d="M10 50c0-2 2-4 4-4h18c0-2 6-14 16-14s16 12 16 14h18c2 0 4 2 4 4s-2 4-4 4H64c0 2-6 14-16 14s-16-12-16-14H14c-2 0-4-2-4-4z" />
    <path fill="currentColor" d="M46 50a4 4 0 1 0 8 0 4 4 0 1 0-8 0z" />
  </svg>
);

interface Product {
  id: string;
  bgColor: string;
  textColor: string;
  icon: ReactNode;
  label: string;
  description: string;
  images: string[];
}

const PRODUCTS: Product[] = [
  { 
    id: "01", 
    bgColor: "bg-[#2c333d]", 
    textColor: "text-white", 
    label: "Archangel", 
    icon: <WingsIcon />, 
    description: "Alas de libertad bordadas en hilo cyan brillante. El modelo más icónico de la colección S.",
    images: [
      "https://r2.erweima.ai/ai_image/1740953681467beidit5p.png",
      "https://r2.erweima.ai/ai_image/1740953696803l791z4b.png",
      "https://r2.erweima.ai/ai_image/17409538350171v2lsc4.png",
      "https://r2.erweima.ai/ai_image/1740953874052re79h16.png",
      "https://r2.erweima.ai/ai_image/174095389643444498cl.png",
      "https://r2.erweima.ai/ai_image/1740953920959i2st459.png"
    ]
  },
  { 
    id: "02", 
    bgColor: "bg-[#465384]", 
    textColor: "text-red-700", 
    label: "Crimson", 
    icon: <RoseIcon color="text-red-800" />, 
    description: "Una rosa roja clásica sobre azul marino profundo. Sofisticación urbana con un toque de pasión.",
    images: [
      "https://r2.erweima.ai/ai_image/174095364801127027p7.png",
      "https://r2.erweima.ai/ai_image/17409539454157uacbe6.png",
      "https://r2.erweima.ai/ai_image/1740953974418uxtvaxv.png",
      "https://r2.erweima.ai/ai_image/1740954003290bax09i9.png"
    ]
  },
  { 
    id: "03", 
    bgColor: "bg-[#386b33]", 
    textColor: "text-[#ffff00]", 
    label: "Empire", 
    icon: <CrownIcon />, 
    description: "El poder reflejado en oro. Corona real para aquellos que dominan las calles de cemento.",
    images: [
      "https://r2.erweima.ai/ai_image/1740953047230491p187.png",
      "https://r2.erweima.ai/ai_image/1740953118949x008i8b.png",
      "https://r2.erweima.ai/ai_image/174095420377488v50r7.png",
      "https://r2.erweima.ai/ai_image/174095426117565r5d6s.png",
      "https://r2.erweima.ai/ai_image/1740954283838oeb9m99.png"
    ]
  },
  { 
    id: "04", 
    bgColor: "bg-[#ffffff]", 
    textColor: "text-black", 
    label: "Checkmate", 
    icon: <ChessKingIcon />, 
    description: "Estrategia y calma. El Rey del tablero llevado a la moda urbana más pura.",
    images: [
      "https://r2.erweima.ai/ai_image/1740952945037n15y06b.png",
      "https://r2.erweima.ai/ai_image/17409529949987y6z36p.png",
      "https://r2.erweima.ai/ai_image/1740954045582v9f2z89.png",
      "https://r2.erweima.ai/ai_image/174095413346986x352p.png",
      "https://r2.erweima.ai/ai_image/1740954170366unrxe9b.png"
    ]
  },
  { 
    id: "05", 
    bgColor: "bg-[#fef4d1]", 
    textColor: "text-[#3b4b9b]", 
    label: "Cobalt Rose", 
    icon: <RoseIcon color="text-[#3b4b9b]" />, 
    description: "Flores azules imposibles. Una pieza de coleccionista que desafía la naturaleza urbana.",
    images: [
      "https://r2.erweima.ai/ai_image/174095325854839q6p9.png",
      "https://r2.erweima.ai/ai_image/17409535805561z8l348.png",
      "https://r2.erweima.ai/ai_image/17409545014389p7y0p.png",
      "https://r2.erweima.ai/ai_image/1740954546876118d048.png",
      "https://r2.erweima.ai/ai_image/174095457497677u97zb.png"
    ]
  },
  { 
    id: "06", 
    bgColor: "bg-[#642d7d]", 
    textColor: "text-black", 
    label: "Vesper", 
    icon: <CrossGothicIcon />, 
    description: "Gótico moderno. La cruz Chrome sobre púrpura real, fuerza y misticismo en cada detalle.",
    images: [
      "https://r2.erweima.ai/ai_image/1740953606990i7v29p.png",
      "https://r2.erweima.ai/ai_image/17409536253457x59za.png",
      "https://r2.erweima.ai/ai_image/1740955938914v3atc6b.png",
      "https://r2.erweima.ai/ai_image/17409559868779l0y39p.png",
      "https://r2.erweima.ai/ai_image/1740956041065p932xp.png",
      "https://r2.erweima.ai/ai_image/1740954316900i66uaxp.png",
      "https://r2.erweima.ai/ai_image/1740954449826e7a2578.png"
    ]
  },
];

// Símbolo de carga/spinner
const LoadingSpinner = () => (
  <div className="w-8 h-8 border-2 border-black/10 border-t-black/40 rounded-full animate-spin" />
);

// Utilidad para optimizar URLs de imágenes (CDN global robusto)
const optimizeImageUrl = (url: string, width = 1000) => {
  if (!url.includes('erweima.ai')) return url; 
  // Usamos images.weserv.nl que es extremadamente confiable a nivel mundial
  return `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=${width}&q=80&output=webp&il`;
};

// Componente de imagen con carga ultra-robusta y fallback inteligente
function GalleryImage({ src, alt, priority = false, onDidLoad }: { src: string, alt: string, priority?: boolean, onDidLoad?: () => void }) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [retryKey, setRetryKey] = useState(0);

  // Generamos la URL: primero intentamos optimizada, si falla el usuario puede reintentar
  const finalSrc = useMemo(() => {
    // Si ya estamos reintentando (retryKey > 0), usamos la URL original directamente para saltar posibles fallos del proxy
    let baseUrl = retryKey > 0 ? src : optimizeImageUrl(src, priority ? 1200 : 800);
    // Solo añadimos parámetro de versión si no es un data URI
    if (src.startsWith('data:')) return src;
    return `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}_v=${retryKey}`;
  }, [src, priority, retryKey]);

  useEffect(() => {
    setStatus('loading');
  }, [src]);

  return (
    <div className="relative bg-zinc-100 rounded-[28px] overflow-hidden group aspect-[4/5] shadow-sm border border-black/5">
      {status === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-100 z-10">
          <div className="w-8 h-8 border-2 border-black/10 border-t-black/30 rounded-full animate-spin" />
        </div>
      )}
      
      {status === 'error' && (
        <div className="absolute inset-0 flex items-center justify-center bg-white flex-col gap-4 p-8 text-center z-20">
          <div className="space-y-2">
            <div className="text-[11px] font-mono text-black/60 uppercase font-bold tracking-wider">Error de Carga</div>
            <p className="text-[9px] font-mono text-black/30 leading-tight mx-auto max-w-[140px]">Hubo un problema de conexión con el servidor.</p>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setStatus('loading');
              setRetryKey(k => k + 1);
            }}
            className="px-6 py-2.5 bg-black text-white rounded-full text-[10px] font-mono font-bold uppercase transition-all active:scale-95 shadow-lg"
          >
            Reintentar Carga
          </button>
        </div>
      )}

      <img 
        key={finalSrc}
        src={finalSrc} 
        alt={alt}
        className={`w-full h-full object-cover transition-all duration-1000 ease-out ${status === 'loaded' ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
        onLoad={() => {
          setStatus('loaded');
          if (onDidLoad) onDidLoad();
        }}
        onError={() => {
          console.warn("Error loading image, trying fallback...", finalSrc);
          if (retryKey === 0) {
            // Intento automático con URL original si falló el proxy
            setRetryKey(1);
          } else {
            setStatus('error');
            // Si falla incluso la original, avisamos a la galería para que siga con la siguiente
            if (onDidLoad) setTimeout(onDidLoad, 1000);
          }
        }}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

// Componente de galería que carga imágenes de una en una
function SequentialGallery({ images, label }: { images: string[], label: string }) {
  const [visibleCount, setVisibleCount] = useState(1);
  
  return (
    <div className="space-y-10 pt-10 border-t border-black/5 text-center w-full">
      <div className="text-[10px] font-mono font-bold text-black/40 uppercase tracking-[0.3em]">
        Galería de Referencia
      </div>
      <div className="grid grid-cols-1 gap-8 pb-20 px-2">
        {images.map((img, idx) => (
          idx < visibleCount && (
            <motion.div 
              key={img}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <GalleryImage 
                src={img} 
                alt={`${label} Ref ${idx + 1}`} 
                priority={idx === 0}
                onDidLoad={() => {
                  if (idx + 1 === visibleCount && visibleCount < images.length) {
                    // Cargamos la siguiente tras un pequeño delay táctico
                    setTimeout(() => setVisibleCount(idx + 2), 200);
                  }
                }}
              />
            </motion.div>
          )
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [hasCollaborated, setHasCollaborated] = useState(false);
  const urbanBg = "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=2000&auto=format&fit=crop";

  // Reset collaboration state when changing product
  useEffect(() => {
    setHasCollaborated(false);
  }, [selectedProduct?.id]);

  // Precarga inteligente: Precarga solo las primeras imágenes de cada producto al inicio usando la optimización
  useEffect(() => {
    PRODUCTS.forEach(product => {
      if (product.images.length > 0) {
        const img = new Image();
        img.src = optimizeImageUrl(product.images[0], 800);
      }
    });
  }, []);

  // Precarga prioritaria cuando se selecciona un producto
  useEffect(() => {
    if (selectedProduct) {
      selectedProduct.images.forEach(imageUrl => {
        const img = new Image();
        img.src = optimizeImageUrl(imageUrl, 1000);
      });
    }
  }, [selectedProduct]);

  return (
    <div className="min-h-screen urban-gradient relative overflow-x-hidden">
      <div className="noise-bg" />
      
      {/* Background Section Fixed */}
      <div className="fixed inset-0 z-0">
        <img
          src={urbanBg}
          alt="Urban landscape"
          className="w-full h-full object-cover grayscale brightness-[0.25] contrast-125"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Modern Header */}
      <nav className="relative z-50 flex items-center justify-between px-8 py-8 md:px-16">
        <div className="flex items-center gap-8">
           <Menu className="w-6 h-6 text-white/60 hover:text-white transition-opacity cursor-pointer" />
           <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase hidden sm:inline text-white/60">Menú</span>
        </div>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex gap-6 text-[10px] font-mono tracking-[0.2em] text-white/40">
            <span className="hover:text-white cursor-pointer transition-colors">ARCHIVE</span>
            <span className="hover:text-white cursor-pointer transition-colors">DROPS</span>
            <span className="hover:text-white cursor-pointer transition-colors">ABOUT</span>
          </div>
          <button 
            className="flex items-center gap-4 bg-white text-black pl-5 pr-2 py-2 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all"
          >
            <span className="text-[10px] font-bold tracking-tighter uppercase whitespace-nowrap">Conectar Wallet</span>
            <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-white" />
            </div>
          </button>
        </div>
      </nav>

      {/* Main Experience */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-8 py-4 flex flex-col lg:flex-row gap-10 items-stretch min-h-[80vh]">
        
        {/* Sidebar Vertical Salvagve */}
        <div className="relative group">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-brand-sidebar rounded-[32px] flex items-center justify-center p-8 lg:p-16 lg:w-36 h-full shadow-[20px_20px_60px_rgba(0,0,0,0.8)] border border-white/5 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
            {/* Center labels for products 01, 02, and 04 as requested */}
            <h1 className="font-gothic text-[80px] sm:text-[100px] lg:text-[150px] text-black lg:-rotate-90 whitespace-nowrap select-none tracking-tighter mix-blend-multiply opacity-90">
              <motion.span
                animate={{ 
                  x: [-15, 15, -15],
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="inline-block"
              >
                Salvagve
              </motion.span>
            </h1>
          </motion.div>
        </div>

        {/* Product Grid Content */}
        <div className="flex-1 flex flex-col gap-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
            <div>
              <div className="flex items-center gap-3 text-[10px] font-mono text-zinc-500 mb-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                STATUS: SISTEMA OPERATIVO
              </div>
              <h2 className="text-5xl font-black italic uppercase tracking-tighter leading-none">
                CÁPSULA <span className="text-zinc-600">01</span>
              </h2>
            </div>
            <p className="max-w-[300px] text-xs text-zinc-500 leading-relaxed uppercase tracking-tighter">
              Diseños urbanos limitados. Cada símbolo cuenta una historia de las calles.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.map((p) => (
              <motion.div
                key={p.id}
                layoutId={`card-${p.id}`}
                onClick={() => setSelectedProduct(p)}
                onMouseEnter={() => {
                  // Preload all images for this specific product on hover
                  p.images.forEach(imageUrl => {
                    const img = new Image();
                    img.src = imageUrl;
                  });
                }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className={`${p.bgColor} rounded-[28px] flex flex-col items-center justify-between aspect-square shadow-2xl relative cursor-pointer group border border-white/5 overflow-hidden`}
              >
                <div className={`absolute top-4 left-1/2 -translate-x-1/2 text-[10px] font-mono ${["04", "05"].includes(p.id) ? "text-black/10" : "text-white/10"} uppercase tracking-widest transition-all duration-500`}>
                  {p.label}
                </div>
                <div className="flex-1 flex items-center justify-center p-6">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {p.icon}
                  </motion.div>
                </div>
                <div className={`${p.textColor} font-gothic-alt text-4xl pb-10 tracking-wider transition-all group-hover:scale-110`}>
                  "S {p.id}"
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Detail Overlay Scrollable */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-6"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div 
              layoutId={`card-${selectedProduct.id}`}
              className={`${selectedProduct.bgColor} w-full max-w-6xl rounded-[40px] overflow-y-auto overflow-x-hidden h-auto max-h-[95vh] shadow-2xl relative custom-scrollbar`}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 md:top-12 md:right-12 z-[110] p-4 bg-white/10 hover:bg-white/20 backdrop-blur-lg rounded-full transition-all hover:scale-110 active:scale-95 group"
              >
                <X className="w-6 h-6 text-black group-hover:scale-110 transition-transform" />
              </button>

              <div className="flex flex-col md:flex-row min-h-full">
                {/* Icon Side (Main View) */}
                <div className="flex-1 flex items-center justify-center p-12 md:p-24 border-r border-black/5 min-h-[400px]">
                  <div className="scale-125 md:scale-[2.5]">
                    {selectedProduct.icon}
                  </div>
                </div>

                {/* Info & Gallery Side */}
                <div className="flex-1 p-8 md:p-20 flex flex-col bg-white backdrop-blur-sm items-center text-center">
                  <div className="mb-12 md:mb-20 w-full flex flex-col items-center">
                    <h3 className="text-black/30 font-mono text-[10px] tracking-[0.5em] uppercase mb-4">
                      Cápsula S / Producto {selectedProduct.id}
                    </h3>
                    <h2 className="text-[clamp(1.5rem,6vw,4.5rem)] font-black italic uppercase tracking-tighter mb-6 leading-tight text-black px-2 md:px-4 break-words">
                      {selectedProduct.label} <br />
                      <span className="opacity-30">"S {selectedProduct.id}"</span>
                    </h2>
                    
                    <p className="text-black/60 text-base md:text-xl font-medium leading-relaxed max-w-md mb-10 mx-auto">
                      {selectedProduct.description}
                    </p>

                    <div className="flex flex-col gap-6 mb-12 items-center w-full max-w-sm">
                      <div className="flex items-center gap-12 border-y border-black/5 py-8 justify-center w-full">
                        <div>
                          <div className="text-[10px] font-mono text-black/40 uppercase mb-2">Talla</div>
                          <div className="font-bold text-xl text-black">UNISEX / OS</div>
                        </div>
                        <div className="w-px h-12 bg-black/5" />
                        <div>
                          <div className="text-[10px] font-mono text-black/40 uppercase mb-2">Color</div>
                          <div className="font-bold text-xl text-black">ST-01 GRIS</div>
                        </div>
                      </div>
                      
                      {!hasCollaborated ? (
                        <button 
                          onClick={() => setHasCollaborated(true)}
                          className="w-full py-6 bg-black text-white rounded-[24px] font-bold text-lg hover:bg-zinc-800 transition-all flex items-center justify-center gap-4 group shadow-xl"
                        >
                          <Heart size={20} className="fill-white" />
                          COLABORAR
                          <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                        </button>
                      ) : (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          className="w-full p-8 bg-zinc-50 rounded-[32px] text-center border border-black/5 shadow-inner"
                        >
                          <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <Heart size={20} className="text-white fill-white" />
                          </div>
                          <h3 className="text-xl font-black uppercase italic mb-2 tracking-tighter">¡Muchas Gracias!</h3>
                          <p className="text-[10px] text-black/40 mb-6 font-mono uppercase tracking-widest leading-tight">
                            Tu apoyo nos ayuda a crecer.<br />Podés colaborar usando mi alias:
                          </p>
                          <div className="bg-white px-6 py-4 rounded-2xl border-2 border-black/5 mb-2 group active:scale-95 transition-all cursor-pointer">
                            <span className="text-lg font-black font-mono tracking-tighter block">salvador.bariani</span>
                          </div>
                          <p className="text-[9px] font-mono text-black/30 uppercase">Toca para copiar o transferir</p>
                        </motion.div>
                      )}

                      <div className="mt-8 text-center">
                        <p className="text-[11px] font-mono text-black/40 leading-relaxed uppercase tracking-tight max-w-xs mx-auto">
                          Si se recauda la plata haremos una sola gorra. En el caso de que recaudemos para hacer 2 o más, intentaremos entregársela a alguno de los inversores o recaudadores.
                        </p>
                      </div>
                    </div>

                    {/* Sequential Reference Gallery */}
                    <SequentialGallery 
                      images={selectedProduct.images} 
                      label={selectedProduct.label} 
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Section */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-24 mb-10">
        <div className="bg-zinc-900/40 backdrop-blur-2xl rounded-[40px] p-8 md:p-16 border border-white/5 flex flex-col md:flex-row items-center gap-12 text-center md:text-left overflow-hidden relative shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-zinc-800/20 blur-[100px] rounded-full -mr-20 -mt-20 opacity-50" />
          
          {/* Collection Group Photo */}
          <div className="relative w-full md:w-1/2 h-64 md:h-80 shrink-0 group">
            <div className="absolute inset-0 bg-white/5 rounded-[40px] animate-pulse" />
            <img 
              src="https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=1200&auto=format&fit=crop" 
              alt="Full Collection"
              className="w-full h-full object-cover rounded-[32px] relative z-10 grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl border border-white/10"
            />
            <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center z-20 shadow-lg group-hover:scale-110 transition-transform">
              <MessageCircle className="text-black w-6 h-6" />
            </div>
          </div>

          <div className="relative z-10 flex-1">
            <h4 className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.4em] mb-4">Direct Inquiry</h4>
            <h3 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-white mb-6 leading-tight">
              ¿Tenés alguna <br />
              <span className="text-white/40">pregunta?</span>
            </h3>
            <p className="text-zinc-400 text-sm md:text-lg mb-8 max-w-md">
              Hablame directamente para sacarte cualquier duda sobre la colección, las recaudaciones o cómo participar.
            </p>
            <a 
              href="mailto:salvage.gorras@gmail.com" 
              className="inline-flex items-center gap-4 px-8 py-4 bg-white text-black rounded-full font-bold uppercase text-xs tracking-widest hover:bg-zinc-200 transition-all active:scale-95 shadow-xl group"
            >
              Consultar Ahora
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Marquee Branding */}
      <div className="relative z-10 w-full overflow-hidden py-12 border-t border-white/5 mt-20">
         <div className="flex whitespace-nowrap animate-infinite-scroll">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-10 mx-10 text-[10px] font-mono tracking-[0.5em] text-white/10 uppercase">
                <span>Authentic Headwear</span>
                <div className="w-4 h-[1px] bg-white/10" />
                <span>Salvagve Urban Elite</span>
                <span className="w-4 h-[1px] bg-white/10" />
              </div>
            ))}
         </div>
      </div>

      <footer className="relative z-10 p-16 flex flex-col md:flex-row justify-between items-center gap-10 bg-black/40 backdrop-blur-xl">
        <div className="text-zinc-600 text-xs font-mono tracking-[0.3em] uppercase">
          &copy; 2026 SALVAGVE &middot; URBAN DNA
        </div>
        <div className="flex gap-4">
          <Instagram className="w-5 h-5 text-zinc-500 hover:text-white cursor-pointer transition-colors" />
          <Twitter className="w-5 h-5 text-zinc-500 hover:text-white cursor-pointer transition-colors" />
        </div>
      </footer>

      <style>{`
        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 60s linear infinite;
        }
        .urban-gradient {
          background: radial-gradient(circle at 50% 50%, rgba(20,20,20,0.8) 0%, rgba(0,0,0,1) 100%);
        }
        .noise-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.15;
          pointer-events: none;
          z-index: 1;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
}
