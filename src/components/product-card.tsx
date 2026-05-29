import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye, Plus, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Product } from '@shared/types';
import { toast } from 'sonner';
import { useCartStore } from '@/lib/store';
import { cn } from '@/lib/utils';
interface ProductCardProps {
  product: Product;
}
export const ProductCard = forwardRef<HTMLDivElement, ProductCardProps>(({ product }, ref) => {
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useCartStore((s) => s.toggleWishlist);
  const wishlist = useCartStore((s) => s.wishlist);
  const isWishlisted = wishlist.includes(product.id);
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success(`${product.name} adicionado à sacola`);
  };
  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    toast(isWishlisted ? "Removido da lista de desejos" : "Adicionado à lista de desejos");
  };
  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -12 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group"
    >
      <Card className="overflow-hidden border-none shadow-soft hover:shadow-2xl transition-all duration-500 bg-card rounded-2xl">
        <div className="relative aspect-[3/4] overflow-hidden">
          <Link to={`/product/${product.id}`} className="block h-full w-full">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
          </Link>
          <div className="absolute inset-0 pointer-events-none bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
            <Button size="icon" variant="secondary" asChild className="pointer-events-auto rounded-full shadow-xl translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
              <Link to={`/product/${product.id}`}><Eye className="h-5 w-5" /></Link>
            </Button>
            <Button
              size="icon"
              className="pointer-events-auto rounded-full btn-gradient shadow-xl translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-150"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
          <div className="absolute top-4 right-4 flex flex-col gap-2">
             <span className="bg-white/95 dark:bg-black/90 backdrop-blur px-2.5 py-1 rounded-full text-[10px] font-black shadow-sm uppercase tracking-widest text-brand-primary">
                {product.brand}
             </span>
             <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-10 w-10 rounded-full backdrop-blur-md shadow-sm transition-all duration-300",
                  isWishlisted ? "bg-brand-primary text-white scale-110" : "bg-white/40 text-foreground hover:bg-white/80"
                )}
                onClick={handleToggleWishlist}
             >
                <motion.div
                  animate={isWishlisted ? { scale: [1, 1.4, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <Heart className={cn("h-5 w-5", isWishlisted && "fill-current")} />
                </motion.div>
             </Button>
          </div>
        </div>
        <CardContent className="p-6 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-1">{product.category}</p>
              <Link to={`/product/${product.id}`} className="hover:text-brand-primary transition-colors block">
                <h3 className="text-lg font-bold line-clamp-1 leading-tight">{product.name}</h3>
              </Link>
            </div>
            <span className="text-xl font-display font-black text-brand-primary whitespace-nowrap">
              R$ {product.price.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center justify-between pt-2">
            <div className="flex gap-2">
              {(product.colors || []).slice(0, 3).map((color, idx) => (
                <div
                  key={idx}
                  className="h-3.5 w-3.5 rounded-full border border-border/50 ring-1 ring-transparent hover:ring-brand-primary transition-all cursor-help"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
              {(product?.colors?.length ?? 0) > 3 && (
                <span className="text-[10px] font-bold text-muted-foreground flex items-center">+{product.colors.length - 3}</span>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              className="p-1.5 rounded-full hover:bg-brand-primary/10 text-muted-foreground hover:text-brand-primary transition-all md:opacity-0 group-hover:opacity-100"
              aria-label="Adicionar rápido"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
});
ProductCard.displayName = "ProductCard";