import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product-card';
import { ProductFilters } from '@/components/product-filters';
import { MobileFilters } from '@/components/mobile-filters';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Product } from '@shared/types';
import { api } from '@/lib/api-client';
export function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [brand, setBrand] = useState('all');
  const [color, setColor] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (category !== 'all') params.append('category', category);
        if (brand !== 'all') params.append('brand', brand);
        if (priceRange[0] > 0) params.append('priceMin', priceRange[0].toString());
        if (priceRange[1] < 1000) params.append('priceMax', priceRange[1].toString());
        const data = await api<{ items: Product[] }>(`/api/products?${params.toString()}`);
        let filtered = data.items;
        if (color !== 'all') {
          filtered = filtered.filter(p => p.colors.includes(color));
        }
        if (sortBy === 'price-low') filtered.sort((a, b) => a.price - b.price);
        if (sortBy === 'price-high') filtered.sort((a, b) => b.price - a.price);
        setProducts(filtered);
        setError(null);
      } catch (err) {
        console.error('[HOMEPAGE FETCH ERROR]', err);
        setError(err instanceof Error ? err.message : 'Falha ao carregar produtos. Verifique sua conexão.');
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [category, brand, priceRange, color, sortBy]);
  const clearFilters = () => {
    setCategory('all');
    setPriceRange([0, 1000]);
    setBrand('all');
    setColor('all');
  };
  const filterProps = {
    category, onCategoryChange: setCategory,
    priceRange, onPriceRangeChange: setPriceRange,
    brand, onBrandChange: setBrand,
    color, onColorChange: setColor,
    onClear: clearFilters
  };
  const sortLabels: Record<string, string> = {
    'newest': 'Mais Recentes',
    'price-low': 'Menor Preço',
    'price-high': 'Maior Preço'
  };
  const heroContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  const heroItem: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  return (
    <MainLayout>
      <section className="relative overflow-hidden py-12 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            variants={heroContainer}
            initial="hidden"
            animate="show"
            className="space-y-8 text-center lg:text-left"
          >
            <motion.div variants={heroItem} className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest bg-brand-primary text-white shadow-primary">
              Nova Coleção 2024
            </motion.div>
            <motion.h1 variants={heroItem} className="text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight leading-[1.1]">
              Elegância <br />
              <span className="text-gradient">Reinventada</span>
            </motion.h1>
            <motion.p variants={heroItem} className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0">
              Descubra uma curadoria exclusiva de alta costura e acessórios, desenhados para quem aprecia cada detalhe de estilo e qualidade superior.
            </motion.p>
            <motion.div variants={heroItem} className="flex flex-wrap justify-center lg:justify-start gap-4">
              <Button size="lg" className="btn-gradient px-8 h-14 text-md" onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}>
                Comprar Agora <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="px-8 h-14 text-md">Ver Lookbook</Button>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-square lg:aspect-square overflow-hidden rounded-3xl shadow-2xl group"
          >
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop"
              alt="Moda de Luxo"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-3xl" />
          </motion.div>
        </div>
      </section>
      <section className="section-gap border-t border-border" id="shop">
        <div className="flex flex-col md:flex-row gap-12">
          <aside className="hidden md:block w-64 shrink-0 sticky top-24 h-fit">
            <ProductFilters {...filterProps} />
          </aside>
          <div className="flex-1 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Nossa Coleção</h2>
                <p className="text-sm text-muted-foreground mt-1">Mostrando {products.length} produtos premium</p>
              </div>
              <div className="flex items-center gap-3">
                <MobileFilters {...filterProps} resultsCount={products.length} />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex gap-2 h-10 px-4">
                      Ordenar por: {sortLabels[sortBy]} <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => setSortBy('newest')}>Mais Recentes</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy('price-low')}>Preço: Menor para Maior</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy('price-high')}>Preço: Maior para Menor</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="aspect-[3/4] w-full rounded-2xl" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-24 text-destructive font-medium bg-destructive/5 rounded-2xl border border-destructive/10">{error}</div>
            ) : products.length === 0 ? (
              <div className="text-center py-32 bg-muted/30 rounded-2xl border border-dashed border-border">
                <p className="text-lg font-medium">Nenhum produto corresponde aos critérios</p>
                <Button variant="link" onClick={clearFilters} className="text-brand-primary">Limpar todos os filtros</Button>
              </div>
            ) : (
              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}