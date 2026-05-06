import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag, Menu, X, Instagram, Twitter, ChevronRight, ArrowRight, ArrowLeft, Heart, MessageCircle, Check, DollarSign, Mail, Copy, Share2 } from "lucide-react";
import { useState, useEffect, ReactNode, useMemo } from "react";
import { db, handleFirestoreError, OperationType } from "./lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

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
  color: string;
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
    color: "GRIS OSCURO",
    images: [
      "https://i.postimg.cc/Mn9Nzntm/file-00000000387471f5b29562c8ecd29c1e.png",
      "https://i.postimg.cc/w1qnKX5G/file-000000005524720e809bf2cd552918f8.png",
      "https://i.postimg.cc/68MgB8zL/file-00000000a5f071f5b9f33c4bb1e00adb.png",
      "https://i.postimg.cc/qNJWfscF/file-00000000e37871f5a017d65f9b9bd58e.png"
    ]
  },
  { 
    id: "02", 
    bgColor: "bg-[#465384]", 
    textColor: "text-red-700", 
    label: "Crimson", 
    icon: <RoseIcon color="text-red-800" />, 
    description: "Una rosa roja clásica sobre azul marino profundo. Sofisticación urbana con un toque de pasión.",
    color: "AZUL MARINO",
    images: [
      "https://i.postimg.cc/Wdxmmj40/file-00000000126071f590634f9218820513.png",
      "https://i.postimg.cc/rD7GGcpR/file-000000003b4071f5acad712300fd9b57.png",
      "https://i.postimg.cc/mPK33RrM/file-000000004bbc71f5a1bfaa362465086b.png"
    ]
  },
  { 
    id: "03", 
    bgColor: "bg-[#386b33]", 
    textColor: "text-[#ffff00]", 
    label: "Empire", 
    icon: <CrownIcon />, 
    description: "El poder reflejado en oro. Corona real para aquellos que dominan las calles de cemento.",
    color: "VERDE",
    images: [
      "https://i.postimg.cc/Z9yGjTxz/image.jpg",
      "https://i.postimg.cc/jWJpvs4T/image.jpg",
      "https://i.postimg.cc/FfJMG9Vm/image.jpg"
    ]
  },
  { 
    id: "04", 
    bgColor: "bg-[#ffffff]", 
    textColor: "text-black", 
    label: "Checkmate", 
    icon: <ChessKingIcon />, 
    description: "Estrategia y calma. El Rey del tablero llevado a la moda urbana más pura.",
    color: "BLANCO",
    images: [
      "https://i.postimg.cc/2LjXpmvP/image.jpg",
      "https://i.postimg.cc/jnqkVKNp/image.jpg",
      "https://i.postimg.cc/30rbM7mM/image.jpg"
    ]
  },
  { 
    id: "05", 
    bgColor: "bg-[#fef4d1]", 
    textColor: "text-[#3b4b9b]", 
    label: "Cobalt Rose", 
    icon: <RoseIcon color="text-[#3b4b9b]" />, 
    description: "Flores azules imposibles. Una pieza de coleccionista que desafía la naturaleza urbana.",
    color: "BEIGE",
    images: [
      "https://i.postimg.cc/CzP9gZvT/image.jpg",
      "https://i.postimg.cc/D8jRTWC3/image.jpg",
      "https://i.postimg.cc/zVt4rLd1/image.jpg"
    ]
  },
  { 
    id: "06", 
    bgColor: "bg-[#642d7d]", 
    textColor: "text-black", 
    label: "Vesper", 
    icon: <CrossGothicIcon />, 
    description: "Gótico moderno. La cruz Chrome sobre púrpura real, fuerza y misticismo en cada detalle.",
    color: "PÚRPURA",
    images: [
      "https://i.postimg.cc/GH5gfWpX/image.jpg",
      "https://i.postimg.cc/WhHYyB49/image.jpg",
      "https://i.postimg.cc/0zKX1VMp/file-00000000f34871f5a4f68d433dca446d.png"
    ]
  },
];

// Símbolo de carga/spinner
const LoadingSpinner = () => (
  <div className="w-8 h-8 border-2 border-black/10 border-t-black/40 rounded-full animate-spin" />
);

// Utilidad para limpiar URLs de imágenes
const optimizeImageUrl = (url: string) => {
  if (!url || !url.startsWith('http')) return url;
  
  if (url.includes('unsplash.com')) {
    const baseUrl = url.split('?')[0];
    return `${baseUrl}?auto=format&fit=crop&w=1600&q=100`;
  }
  
  return url;
}; // Componente de imagen con carga ultra-robusta y fallback inteligente
function GalleryImage({ src, alt, icon, priority = false, onDidLoad, className = "", objectFit = "cover" }: { src: string, alt: string, icon?: ReactNode, priority?: boolean, onDidLoad?: () => void, className?: string, objectFit?: "cover" | "contain" }) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  const finalSrc = useMemo(() => {
    if (!src || src.startsWith('data:')) return src;
    return optimizeImageUrl(src);
  }, [src]);

  useEffect(() => {
    setStatus('loading');
  }, [src]);

  // Timeout de seguridad: Si una imagen queda colgada, marcamos error
  useEffect(() => {
    if (status === 'loading') {
      const timeout = setTimeout(() => {
        setStatus('error');
      }, 10000); 
      return () => clearTimeout(timeout);
    }
  }, [status, onDidLoad]);

  const handleRetry = (e: any) => {
    e.stopPropagation();
    setStatus('loading');
  };

  if (status === 'error') {
    return (
      <div 
        onClick={handleRetry}
        className={`relative bg-zinc-100 rounded-[32px] flex items-center justify-center border border-black/5 cursor-pointer group ${priority ? 'aspect-[4/5]' : 'aspect-square shadow-inner'}`}
      >
        <div className="flex flex-col items-center gap-3 opacity-20 group-hover:opacity-40 transition-opacity">
          <div className="w-12 h-12 bg-black/5 rounded-full flex items-center justify-center font-black italic group-hover:rotate-12 transition-transform duration-500">!</div>
          <p className="text-[9px] font-mono uppercase tracking-[0.3em] font-bold text-center px-4 leading-relaxed">
            Error de carga<br/>
            <span className="text-[7px] text-red-500">Toca para reintentar</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative bg-zinc-100 rounded-[32px] overflow-hidden group shadow-sm border border-black/5 transition-all duration-500 ${priority ? 'aspect-[4/5]' : 'aspect-square'} ${className}`}>
      {status === 'loading' && (
        <div className="absolute inset-0 z-10 bg-zinc-100 flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_2s_infinite] skew-x-12" />
          
          <div className="relative flex flex-col items-center gap-4">
            {icon ? (
              <div className="opacity-10 grayscale scale-50 animate-pulse">
                {icon}
              </div>
            ) : (
              <div className="relative">
                <div className={`w-6 h-6 border-2 border-black/5 border-t-black/40 rounded-full animate-spin`} />
              </div>
            )}
            <p className="text-[6px] font-mono font-bold uppercase tracking-[0.6em] opacity-30 animate-pulse text-center">
              Loading
            </p>
          </div>
        </div>
      )}
      
      <motion.img 
        key={`${finalSrc}`}
        src={finalSrc} 
        alt={alt}
        className={`w-full h-full ${objectFit === 'contain' ? 'object-contain' : 'object-cover'} transition-all duration-700 ease-in-out group-hover:scale-110 ${status === 'loaded' ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-105 blur-2xl'}`}
        onLoad={() => {
          setStatus('loaded');
          if (onDidLoad) onDidLoad();
        }}
        onError={() => {
          setStatus('error');
          if (onDidLoad) onDidLoad();
        }}
        loading={priority ? "eager" : "lazy"}
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors pointer-events-none" />
    </div>
  );
}

// Componente de galería interactivo con carousel y controles
function InteractiveGallery({ images, label, icon }: { images: string[], label: string, icon: ReactNode }) {
  const [index, setIndex] = useState(0);

  return (
    <div className="space-y-8 pt-10 border-t border-black/5 text-center w-full">
      <div className="text-[10px] font-mono font-bold text-black/40 uppercase tracking-[0.3em]">
        Vistas de Referencia
      </div>
      
      <div className="relative group overflow-hidden rounded-[40px] bg-zinc-50 shadow-sm border border-black/5">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full"
          >
            <GalleryImage 
              src={images[index]} 
              alt={`${label} Ref ${index + 1}`} 
              icon={icon}
              priority={true}
              objectFit="contain"
            />
          </motion.div>
        </AnimatePresence>

        {images.length > 1 && (
          <>
            {/* Navegación lateral */}
            <button 
              onClick={(e) => { e.stopPropagation(); setIndex((prev) => (prev - 1 + images.length) % images.length); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/90 backdrop-blur-xl rounded-full flex items-center justify-center shadow-xl opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 active:scale-90 z-20"
            >
              <ArrowLeft size={20} className="text-black" />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); setIndex((prev) => (prev + 1) % images.length); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/90 backdrop-blur-xl rounded-full flex items-center justify-center shadow-xl opacity-0 translate-x-[10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 active:scale-90 z-20"
            >
              <ArrowRight size={20} className="text-black" />
            </button>

            {/* Indicadores inferiores */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 px-4 py-2 bg-black/10 backdrop-blur-xl rounded-full z-20">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setIndex(idx); }}
                  className={`h-1.5 rounded-full transition-all duration-500 ease-in-out ${idx === index ? 'w-6 bg-white' : 'w-1.5 bg-white/40'}`}
                />
              ))}
            </div>

            {/* Contador flotante */}
            <div className="absolute top-6 right-8 px-4 py-1.5 bg-black/40 backdrop-blur-xl rounded-full text-[10px] font-mono font-black text-white uppercase tracking-[0.2em] z-20">
              {index + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      <div className="flex justify-center gap-4 overflow-x-auto pb-4 px-2 no-scrollbar">
        {images.map((img, idx) => (
          <button
            key={`thumb-${idx}`}
            onClick={() => setIndex(idx)}
            className={`flex-shrink-0 w-16 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${idx === index ? 'border-cyan-400 scale-110 shadow-lg' : 'border-transparent opacity-40 hover:opacity-100'}`}
          >
            <GalleryImage 
              src={img} 
              alt="thumb" 
              priority={false}
              className="rounded-none border-none shadow-none bg-transparent"
              objectFit="cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [hasCollaborated, setHasCollaborated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [shareStatus, setShareStatus] = useState<'idle' | 'copied' | 'shared'>('idle');
  const CONTACT_EMAIL = "salvage.gorras@gmail.com";

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const urbanBg = "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=2000&auto=format&fit=crop";

  // Reset collaboration state when changing product
  useEffect(() => {
    setHasCollaborated(false);
    setCopied(false);
  }, [selectedProduct?.id]);

  // Precarga ultra-agresiva: Precargamos todo lo posible al inicio
  useEffect(() => {
    // Precarga de fondos y logos críticos
    const bgImg = new Image(); bgImg.src = urbanBg;

    // Precarga de la primera imagen de cada producto utilizando el proxy para mayor velocidad
    PRODUCTS.forEach(product => {
      product.images.slice(0, 1).forEach((url) => {
        const p = new Image();
        p.src = optimizeImageUrl(url);
      });
    });
  }, []);

  // Precarga prioritaria total cuando se selecciona un producto
  useEffect(() => {
    if (selectedProduct) {
      selectedProduct.images.forEach((imageUrl) => {
        const img = new Image();
        img.src = optimizeImageUrl(imageUrl);
      });
    }
  }, [selectedProduct]);

  const handleCollaborate = async () => {
    if (!selectedProduct) return;
    setHasCollaborated(true);
    
    // Log collaboration interest to Firebase
    try {
      const collPath = 'collaborations';
      await addDoc(collection(db, collPath), {
        productId: selectedProduct.id,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      // Shhh, silent fail but log for dev
      console.error("Firebase log failed:", error);
    }
  };

  const copyAlias = () => {
    navigator.clipboard.writeText("salvador.bariani");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyEmail = (e: any) => {
    e.stopPropagation();
    if (!isValidEmail(CONTACT_EMAIL)) return;
    navigator.clipboard.writeText(CONTACT_EMAIL);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleEmailClick = (e: any) => {
    if (!isValidEmail(CONTACT_EMAIL)) {
      e.preventDefault();
      alert("Error: El formato del correo no es válido.");
    }
  };

  const handleShare = async (product: Product) => {
    const shareData = {
      title: `Salvage - ${product.label}`,
      text: `Mira esta gorra de la colección Salvage: ${product.label} (${product.color})`,
      url: window.location.href
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        setShareStatus('shared');
        setTimeout(() => setShareStatus('idle'), 2000);
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      // Fallback: Copy link
      navigator.clipboard.writeText(window.location.href);
      setShareStatus('copied');
      setTimeout(() => setShareStatus('idle'), 2000);
    }
  };

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
                  // Preload images for this specific product on hover using the optimizer
                  p.images.forEach(imageUrl => {
                    const img = new Image();
                    img.src = optimizeImageUrl(imageUrl);
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
                          <div className="font-bold text-xl text-black">A PEDIDO</div>
                        </div>
                        <div className="w-px h-12 bg-black/5" />
                        <div>
                          <div className="text-[10px] font-mono text-black/40 uppercase mb-2">Color</div>
                          <div className="font-bold text-xl text-black uppercase">{selectedProduct.color}</div>
                        </div>
                      </div>

                      <div className="text-center px-4 mb-4">
                        <p className="text-[9px] md:text-[10px] font-mono text-black/30 leading-relaxed uppercase tracking-tight max-w-[280px] mx-auto font-medium">
                          Nota: Si se recauda lo suficiente haremos una sola gorra. Si se supera el objetivo para 2 o más, se entregará a los colaboradores destacados.
                        </p>
                      </div>

                      <div className="flex items-center justify-center gap-3 mb-8">
                        <button 
                          onClick={() => handleShare(selectedProduct)}
                          className="flex items-center gap-2 px-4 py-2 bg-black/5 hover:bg-black/10 rounded-full transition-colors text-[10px] font-bold uppercase tracking-widest text-black/60"
                        >
                          {shareStatus === 'copied' ? (
                            <>
                              <Check size={12} className="text-green-600" />
                              <span>Link Copiado</span>
                            </>
                          ) : (
                            <>
                              <Share2 size={12} />
                              <span>Compartir</span>
                            </>
                          )}
                        </button>
                      </div>

                      {!hasCollaborated ? (
                        <button 
                          onClick={handleCollaborate}
                          className="w-full py-6 bg-black text-white rounded-[24px] font-bold text-lg hover:bg-zinc-800 transition-all flex items-center justify-center gap-4 group shadow-xl"
                        >
                          <Heart size={20} className="fill-white" />
                          COLABORAR
                          <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                        </button>
                      ) : (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          className="w-full p-6 md:p-10 bg-zinc-50 rounded-[44px] text-center border border-black/5 shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)]"
                        >
                          <div className="w-full flex flex-col gap-6 mb-10">
                            {/* Paso 1: Confirmar (Correo) */}
                            <div className="bg-black text-white p-5 md:p-8 rounded-[36px] shadow-2xl relative overflow-hidden group text-center uppercase">
                              <div className="absolute -bottom-6 -right-6 opacity-10 group-hover:scale-110 transition-transform duration-700">
                                <Mail size={100} />
                              </div>
                              <div className="flex items-center gap-3 mb-4 justify-center">
                                <div className="w-7 h-7 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center text-[10px] font-bold italic text-white">1</div>
                                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-white/50">Confirmar</span>
                              </div>
                              <p className="text-[14px] md:text-[17px] font-black italic leading-tight mb-3 tracking-tight">
                                Envianos un correo a <br />
                                <div className="relative inline-block mt-1">
                                  <a 
                                    href={`mailto:${CONTACT_EMAIL}`} 
                                    onClick={handleEmailClick}
                                    className="text-cyan-400 underline decoration-cyan-400/30 hover:decoration-cyan-400 transition-all font-mono lowercase tracking-tighter text-[12px] md:text-[15px] break-all block"
                                  >
                                    {CONTACT_EMAIL}
                                  </a>
                                  <button 
                                    onClick={copyEmail}
                                    className="absolute -right-8 top-0 p-1 text-white/30 hover:text-white transition-colors"
                                    title="Copiar correo"
                                  >
                                    {copiedEmail ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                                  </button>
                                </div>
                              </p>
                              <p className="text-[10px] text-white/50 leading-relaxed font-medium tracking-tight px-1">
                                Indica tu nombre y la gorra a financiar.
                              </p>
                            </div>

                            {/* Paso 2: Colaboración (Alias) */}
                            <div className="bg-zinc-100 p-5 md:p-8 rounded-[36px] border border-black/5 shadow-sm relative overflow-hidden group text-center uppercase">
                              <div className="absolute -top-4 -left-4 opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
                                <DollarSign size={80} />
                              </div>
                              <div className="flex items-center gap-3 mb-4 justify-center">
                                <div className="w-7 h-7 bg-black rounded-lg flex items-center justify-center text-[11px] font-bold italic text-white shadow-lg">2</div>
                                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-black/40">Colaborar</span>
                              </div>
                              <p className="text-[10px] text-black/30 mb-3 font-mono uppercase tracking-[0.2em] font-bold">Alias Mercado Pago</p>
                              
                              <div 
                                onClick={copyAlias}
                                className={`px-2 py-5 rounded-[24px] border-2 transition-all duration-500 cursor-pointer relative group active:scale-95 shadow-lg ${copied ? "bg-green-500 border-green-500" : "bg-white border-black/5 hover:border-black/20"}`}
                              >
                                <span className={`text-lg md:text-2xl font-black font-mono tracking-tighter block transition-colors ${copied ? "text-white" : "text-black"}`}>
                                  {copied ? "COPIADO" : "salvador.bariani"}
                                </span>
                                <AnimatePresence>
                                  {copied && (
                                    <motion.div initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }} className="absolute -top-3 -right-3 bg-black text-white p-2 rounded-full shadow-2xl z-20 border-4 border-zinc-100">
                                      <Check size={14} />
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                              <p className="text-[9px] font-bold font-mono text-black/30 uppercase mt-4 tracking-widest leading-none text-center block w-full">{copied ? "¡Listo para transferir!" : "Toca el alias para copiarlo"}</p>
                            </div>
                          </div>

                          <div className="flex flex-col items-center pt-8 border-t border-black/5 gap-3 opacity-60">
                             <div className="px-5 py-1.5 bg-black/5 rounded-full">
                               <h3 className="text-[9px] font-black uppercase italic tracking-[0.2em] text-black/60">Tu apoyo nos ayuda a crecer</h3>
                             </div>
                             <p className="text-[8px] font-mono uppercase tracking-[0.4em] font-bold">Salvagve Private Collection © 2026</p>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Sequential Reference Gallery */}
                    <InteractiveGallery 
                      images={selectedProduct.images} 
                      label={selectedProduct.label} 
                      icon={selectedProduct.icon}
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
          
          {/* Collection Group Photo - Using the provided asset feel */}
          <div className="relative w-full md:w-1/2 h-64 md:h-80 shrink-0 group">
            <div className="absolute inset-0 bg-white/5 rounded-[40px] animate-pulse" />
            <img 
              src="https://i.postimg.cc/tYY2FB5b/file-0000000068ac720e867c9874105fcc01.png" 
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
              href={`mailto:${CONTACT_EMAIL}`} 
              onClick={handleEmailClick}
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
