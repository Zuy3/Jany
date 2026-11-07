import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  X, 
  CheckCircle2, 
  Sparkles, 
  MessageCircle, 
  Camera, 
  Heart,
  Instagram,
  Youtube
} from 'lucide-react';
import { SOCIAL_PROOF_ITEMS, SocialProofItem, SocialProofType } from '../data/socialProofData';

interface SocialProofCarouselProps {
  className?: string;
}

export const SocialProofCarousel: React.FC<SocialProofCarouselProps> = ({ className = '' }) => {
  const [filter, setFilter] = useState<'all' | SocialProofType>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxItem, setLightboxItem] = useState<SocialProofItem | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const filteredItems = React.useMemo(() => {
    if (filter === 'all') return SOCIAL_PROOF_ITEMS;
    return SOCIAL_PROOF_ITEMS.filter(item => item.type === filter);
  }, [filter]);

  // Reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [filter]);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? filteredItems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === filteredItems.length - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxItem) {
        if (e.key === 'Escape') setLightboxItem(null);
        return;
      }
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredItems.length, lightboxItem]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartXRef.current || !touchEndXRef.current) return;
    const distance = touchStartXRef.current - touchEndXRef.current;
    const minSwipeDistance = 45;

    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }

    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  const currentItem = filteredItems[currentIndex] || filteredItems[0];

  return (
    <section className={`w-full bg-white rounded-3xl border border-stone-200/90 shadow-xl p-5 sm:p-8 space-y-6 ${className}`}>
      
      {/* Header with Title and Trust Indicators */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded-full text-xs font-bold uppercase tracking-wider mb-2.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Provas Sociais & Resultados Reais</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-stone-900 font-display tracking-tight leading-snug">
          O que acontece quando você desinflama a digestão
        </h2>

        <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
          Veja transformações reais de desinchaço e comentários de pessoas comuns que aplicaram os rituais e orientações do protocolo @zuy_silva emagrecer.
        </p>

        {/* Aggregate Social Rating */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-stone-700 mt-3 pt-3 border-t border-stone-100">
          <div className="flex text-amber-400 text-sm">★★★★★</div>
          <span className="font-bold text-stone-900">4.9 / 5</span>
          <span className="text-stone-300">·</span>
          <span>Mais de 1.400 participantes desinchados</span>
          <span className="text-stone-300">·</span>
          <span className="text-emerald-700 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 inline" />
            Resultados Comprovados
          </span>
        </div>
      </div>

      {/* Filter Tabs (Segmented Controls) */}
      <div className="flex items-center justify-center">
        <div className="inline-flex p-1 bg-stone-100/90 rounded-2xl border border-stone-200 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-3 sm:px-4 py-2 rounded-xl transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-white text-stone-900 shadow-xs font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Todos ({SOCIAL_PROOF_ITEMS.length})
          </button>

          <button
            type="button"
            onClick={() => setFilter('before_after')}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl transition-all cursor-pointer ${
              filter === 'before_after'
                ? 'bg-white text-stone-900 shadow-xs font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Camera className="w-3.5 h-3.5 text-emerald-700" />
            <span>Antes & Depois ({SOCIAL_PROOF_ITEMS.filter(i => i.type === 'before_after').length})</span>
          </button>

          <button
            type="button"
            onClick={() => setFilter('comment')}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl transition-all cursor-pointer ${
              filter === 'comment'
                ? 'bg-white text-stone-900 shadow-xs font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <MessageCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>Comentários ({SOCIAL_PROOF_ITEMS.filter(i => i.type === 'comment').length})</span>
          </button>
        </div>
      </div>

      {/* Carousel Display Stage */}
      {currentItem && (
        <div 
          className="relative max-w-2xl mx-auto select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Main Card Container */}
          <div className="bg-stone-50/70 border border-stone-200/90 rounded-3xl overflow-hidden shadow-sm transition-all">
            
            {/* Visual Media Header with Click-to-Zoom */}
            <div 
              onClick={() => setLightboxItem(currentItem)}
              className="relative w-full bg-stone-900 cursor-zoom-in group overflow-hidden max-h-[380px] sm:max-h-[440px] flex items-center justify-center"
            >
              <img
                src={currentItem.imageSrc}
                alt={currentItem.title}
                className="w-full h-full max-h-[420px] object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                loading="lazy"
              />

              {/* Tag Overlays */}
              <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
                <span className="px-3 py-1 bg-black/75 backdrop-blur-md text-white text-[11px] font-bold rounded-full border border-white/20">
                  {currentItem.tag}
                </span>

                {currentItem.platform && (
                  <span className="flex items-center gap-1 px-2.5 py-1 bg-black/75 backdrop-blur-md text-white text-[11px] font-semibold rounded-full border border-white/20">
                    {currentItem.platform === 'Instagram' ? (
                      <Instagram className="w-3 h-3 text-pink-400" />
                    ) : (
                      <Youtube className="w-3 h-3 text-red-500" />
                    )}
                    <span>{currentItem.platform}</span>
                  </span>
                )}
              </div>

              {/* Zoom hint on hover */}
              <div className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-black/80 backdrop-blur-md rounded-full text-white text-xs transition-opacity opacity-80 group-hover:opacity-100 flex items-center gap-1">
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[10px]">Ampliar</span>
              </div>

              {/* Bottom Before/After Pill Indicator */}
              {currentItem.type === 'before_after' && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-emerald-950/85 backdrop-blur-md text-emerald-200 border border-emerald-500/30 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                  <span>Antes</span>
                  <span className="text-emerald-400">➔</span>
                  <span className="text-white">Depois (Desinchada)</span>
                </div>
              )}
            </div>

            {/* Contextual Card Body */}
            <div className="p-5 sm:p-7 space-y-4 bg-white">
              {currentItem.type === 'before_after' ? (
                /* Before & After First-Person Testimonial Layout */
                <div className="space-y-3.5">
                  {/* Student Header */}
                  <div className="flex items-center justify-between gap-3 border-b border-stone-100 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-extrabold flex items-center justify-center text-sm border-2 border-emerald-300 shadow-xs">
                        {currentItem.authorName?.charAt(0) || 'A'}
                      </div>
                      <div>
                        <div className="font-extrabold text-stone-900 text-base flex items-center gap-1.5 leading-none">
                          <span>{currentItem.authorName}</span>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                            Aluna Verificada
                          </span>
                        </div>
                        <span className="text-[11px] text-stone-500 font-medium">
                          Depoimento real sobre o Barriga Chapada em 7 Dias
                        </span>
                      </div>
                    </div>

                    {currentItem.timeframe && (
                      <span className="inline-flex items-center text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 shrink-0">
                        ⏱️ {currentItem.timeframe}
                      </span>
                    )}
                  </div>

                  {/* Rating & Authenticity Indicator */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="text-amber-400 text-sm tracking-wider font-bold">★★★★★</span>
                      <span className="font-bold text-stone-800 text-[11px]">Depoimento na 1ª Pessoa</span>
                    </div>
                    <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Resultado Documentado
                    </span>
                  </div>

                  {/* First-Person Testimonial Bubble */}
                  <div className="p-4 bg-emerald-50/70 border-l-4 border-emerald-600 rounded-r-2xl space-y-2">
                    <div className="text-xs sm:text-sm text-stone-800 font-semibold leading-relaxed">
                      <span className="text-emerald-950 font-black block mb-1 text-sm">
                        {currentItem.authorName}:
                      </span>
                      <p className="italic text-stone-700">
                        "{currentItem.quote || currentItem.highlight}"
                      </p>
                    </div>

                    {currentItem.subtitle && (
                      <p className="text-[11px] text-emerald-900 font-medium pt-2 border-t border-emerald-200/60 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>{currentItem.subtitle}</span>
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                /* Social Comment Layout */
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2 font-bold text-stone-900">
                      <span className="text-amber-700 flex items-center gap-1">
                        <MessageCircle className="w-3.5 h-3.5" />
                        {currentItem.authorName || 'Comentário em Vídeo'}
                      </span>
                      {currentItem.likesCount && (
                        <span className="text-stone-500 font-medium flex items-center gap-1 text-[11px]">
                          <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                          {currentItem.likesCount}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-semibold text-stone-500">
                      Publicado no {currentItem.platform || 'Instagram'}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-snug">
                    {currentItem.title}
                  </h3>

                  {currentItem.highlight && (
                    <div className="p-3 bg-amber-50/80 border-l-4 border-amber-500 rounded-r-xl text-xs sm:text-sm font-semibold text-amber-950 leading-relaxed">
                      "{currentItem.highlight}"
                    </div>
                  )}

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed italic">
                    "{currentItem.quote || currentItem.subtitle}"
                  </p>
                </div>
              )}

              {/* Click to expand button */}
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setLightboxItem(currentItem)}
                  className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Ver foto e depoimento ampliado</span>
                </button>
              </div>

            </div>
          </div>

          {/* Nav Arrow: Left */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Ver prova social anterior"
            className="absolute top-1/2 -left-3 sm:-left-5 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white shadow-lg border border-stone-200/90 text-stone-700 hover:text-stone-950 hover:bg-stone-50 flex items-center justify-center cursor-pointer transition-all z-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Nav Arrow: Right */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Ver próxima prova social"
            className="absolute top-1/2 -right-3 sm:-right-5 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white shadow-lg border border-stone-200/90 text-stone-700 hover:text-stone-950 hover:bg-stone-50 flex items-center justify-center cursor-pointer transition-all z-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Pagination Counter and Navigation Dots */}
      <div className="flex flex-col items-center justify-center gap-2 pt-2">
        <span className="text-xs text-stone-500 font-medium">
          Caso <strong className="text-stone-900">{currentIndex + 1}</strong> de {filteredItems.length}
        </span>

        <div className="flex items-center gap-1.5 flex-wrap justify-center max-w-md">
          {filteredItems.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Ir para caso ${idx + 1}`}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                idx === currentIndex
                  ? 'w-6 bg-emerald-600'
                  : 'w-2 bg-stone-300 hover:bg-stone-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Educational Context Footer */}
      <p className="text-[11px] text-stone-600 text-center max-w-xl mx-auto leading-relaxed border-t border-stone-100 pt-3">
        *Depoimentos de participantes que seguiram as orientações alimentares e as combinações de desinchaço. Os resultados variam de acordo com a individualidade biológica, o nível de inflamação e a consistência na aplicação.
      </p>

      {/* Lightbox Zoom Modal */}
      {lightboxItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 overflow-y-auto"
          onClick={() => setLightboxItem(null)}
        >
          <div 
            className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl my-auto animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              type="button"
              onClick={() => setLightboxItem(null)}
              aria-label="Fechar ampliação"
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-stone-900/80 hover:bg-stone-900 text-white flex items-center justify-center z-20 cursor-pointer shadow-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="bg-stone-950 max-h-[65vh] flex items-center justify-center overflow-hidden">
              <img
                src={lightboxItem.imageSrc}
                alt={lightboxItem.title}
                className="w-full h-full max-h-[65vh] object-contain"
              />
            </div>

            {/* Modal Description */}
            <div className="p-5 sm:p-7 space-y-3 bg-white text-left">
              {lightboxItem.type === 'before_after' ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3 border-b border-stone-100 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-extrabold flex items-center justify-center text-sm border-2 border-emerald-300">
                        {lightboxItem.authorName?.charAt(0) || 'A'}
                      </div>
                      <div>
                        <div className="font-extrabold text-stone-900 text-base flex items-center gap-1.5 leading-none">
                          <span>{lightboxItem.authorName}</span>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                            Aluna Verificada
                          </span>
                        </div>
                        <span className="text-[11px] text-stone-500 font-medium">
                          Depoimento real sobre o Barriga Chapada em 7 Dias
                        </span>
                      </div>
                    </div>
                    {lightboxItem.timeframe && (
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        ⏱️ {lightboxItem.timeframe}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-amber-400 text-sm font-bold">
                    <span>★★★★★</span>
                    <span className="text-stone-700 text-xs font-semibold">Depoimento na 1ª Pessoa</span>
                  </div>

                  <div className="p-4 bg-emerald-50/70 border-l-4 border-emerald-600 rounded-r-2xl space-y-2">
                    <p className="text-xs sm:text-sm text-stone-800 font-semibold leading-relaxed">
                      <span className="text-emerald-950 font-black block mb-1 text-sm">
                        {lightboxItem.authorName}:
                      </span>
                      <span className="italic text-stone-700">
                        "{lightboxItem.quote || lightboxItem.highlight}"
                      </span>
                    </p>
                    {lightboxItem.subtitle && (
                      <p className="text-[11px] text-emerald-900 font-medium pt-2 border-t border-emerald-200/60 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>{lightboxItem.subtitle}</span>
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-amber-800">
                    <span>{lightboxItem.tag}</span>
                    {lightboxItem.platform && <span>Publicado no {lightboxItem.platform}</span>}
                  </div>

                  <h4 className="text-lg font-bold text-stone-900">
                    {lightboxItem.title}
                  </h4>

                  {lightboxItem.highlight && (
                    <div className="p-3 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-xs sm:text-sm font-semibold text-amber-950">
                      "{lightboxItem.highlight}"
                    </div>
                  )}

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed italic">
                    "{lightboxItem.quote || lightboxItem.subtitle}"
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
