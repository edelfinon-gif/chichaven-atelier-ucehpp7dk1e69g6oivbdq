import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  Star,
  Truck,
  RotateCcw,
  ShieldCheck,
  Heart,
  Share2,
  Plus,
  Minus,
  Loader2,
  ArrowLeft
} from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ProductCard } from '@/components/product-card';
import { Product } from '@shared/types';
import { api } from '@/lib/api-client';
import { MOCK_PRODUCTS } from '@shared/mock-data';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useCartStore } from '@/lib/store';
export function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useCartStore((s) => s.toggleWishlist);
  const wishlist = useCartStore((s) => s.wishlist);
  const isWishlisted = product ? wishlist.includes(product.id) : false;
  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const data = await api<Product>(`/api/products/${id}`);
        setProduct(data);
        if (data.colors && data.colors.length > 0) {
           setSelectedColor(data.colors[0]);
        }
        window.scrollTo(0, 0);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);
  const handleAddToCart = () => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    toast.success(`Adicionado ${quantity} ${product.name} à sacola`);
  };
  if (loading) return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-10 w-10 animate-spin text-brand-primary" />
      </div>
    </MainLayout>
  );
  if (!product) return (
    <MainLayout>
      <div className="text-center py-32 space-y-4">
        <h2 className="text-2xl font-bold">Produto não encontrado</h2>
        <Button asChild variant="outline">
          <Link to="/"><ArrowLeft className="mr-2 h-4 w-4" /> Voltar para a Loja</Link>
        </Button>
      </div>
    </MainLayout>
  );
  const relatedProducts = MOCK_PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  return (
    <MainLayout>
      <nav className="flex items-center gap-2 text-sm text-muted-foreground py-8">
        <Link to="/" className="hover:text-brand-primary">Início</Link>
        <ChevronRight className="h-4 w-4" />
        <Link to="/#shop" className="hover:text-brand-primary">{product.category}</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground font-medium truncate">{product.name}</span>
      </nav>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">
        <div className="lg:col-span-7 space-y-4">
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="aspect-[3/4] rounded-3xl overflow-hidden bg-muted shadow-soft">
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
          </motion.div>
        </div>
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-brand-primary border-brand-primary/20 bg-brand-primary/5 uppercase tracking-widest text-[10px]">
                {product.brand}
              </Badge>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn("rounded-full h-10 w-10", isWishlisted && "text-brand-primary bg-brand-primary/5")}
                  onClick={() => toggleWishlist(product.id)}
                >
                  <Heart className={cn("h-5 w-5", isWishlisted && "fill-current")} />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full h-10 w-10"><Share2 className="h-5 w-5" /></Button>
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight">{product.name}</h1>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-display font-bold text-brand-primary">R$ {product.price.toFixed(2)}</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="h-4 w-4 fill-brand-primary text-brand-primary" />
                ))}
                <span className="text-sm text-muted-foreground ml-2">(48 Avaliações)</span>
              </div>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            {product.description} Esta peça premium da coleção {product.brand} representa o auge do design contemporâneo e sofisticação.
          </p>
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider mb-4">Cor</h4>
              <div className="flex gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={cn(
                      "h-10 w-10 rounded-full border transition-all",
                      selectedColor === c ? "ring-2 ring-brand-primary ring-offset-2 scale-110 shadow-md" : "border-border hover:scale-105"
                    )}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider mb-4">Quantidade</h4>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-border rounded-xl px-2 py-1">
                  <Button variant="ghost" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus className="h-4 w-4" /></Button>
                  <span className="w-12 text-center font-bold">{quantity}</span>
                  <Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)}><Plus className="h-4 w-4" /></Button>
                </div>
                <Button className="flex-1 btn-gradient h-12 text-md" onClick={handleAddToCart}>
                  Adicionar à Sacola
                </Button>
              </div>
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center space-y-2">
              <Truck className="h-6 w-6 text-brand-primary" />
              <span className="text-xs font-semibold">Frete Grátis</span>
              <span className="text-[10px] text-muted-foreground">Em pedidos acima de R$ 150</span>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <RotateCcw className="h-6 w-6 text-brand-primary" />
              <span className="text-xs font-semibold">Devolução 30 Dias</span>
              <span className="text-[10px] text-muted-foreground">Processo sem burocracia</span>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <ShieldCheck className="h-6 w-6 text-brand-primary" />
              <span className="text-xs font-semibold">Pagamento Seguro</span>
              <span className="text-[10px] text-muted-foreground">Certificação internacional</span>
            </div>
          </div>
        </div>
      </div>
      <section className="section-gap border-t border-border mt-20">
        <h2 className="text-3xl font-bold mb-10">Você também pode gostar</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {relatedProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </MainLayout>
  );
}