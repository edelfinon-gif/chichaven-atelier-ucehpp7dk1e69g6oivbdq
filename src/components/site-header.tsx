import React, { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { ShoppingBag, Search, Menu, X, ChevronRight } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { SearchDialog } from './search-dialog';
import { CartDrawer } from './cart-drawer';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/lib/store';
export function SiteHeader() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();
  const items = useCartStore((s) => s.items);
  const totalQuantity = useMemo(() => items.reduce((acc, item) => acc + item.quantity, 0), [items]);
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });
  const navLinks = [
    { name: 'Loja', hash: '#shop', path: '/#shop' },
    { name: 'Categorias', hash: '#', path: '/' },
    { name: 'Coleções', hash: '#', path: '/' },
    { name: 'Sobre', hash: '#', path: '/' }
  ];
  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full border-b transition-all duration-300",
          isScrolled
            ? "h-16 bg-background/95 backdrop-blur-md border-border shadow-sm"
            : "h-20 bg-background border-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex h-full items-center justify-between">
            <div className="flex items-center gap-10">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="h-10 w-10 bg-brand-primary rounded-xl flex items-center justify-center transition-all group-hover:rotate-12 group-hover:shadow-glow">
                  <ShoppingBag className="text-white h-6 w-6" />
                </div>
                <span className="text-xl font-display font-bold tracking-tight">
                  ChicHaven <span className="text-brand-primary">Atelier</span>
                </span>
              </Link>
              <nav className="hidden lg:flex items-center gap-8">
                {navLinks.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={cn(
                      "text-sm font-semibold tracking-wide transition-colors hover:text-brand-primary",
                      location.hash === item.hash || (location.pathname === '/' && item.hash === '#shop' && location.hash === '#shop') 
                        ? "text-brand-primary" 
                        : "text-muted-foreground"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex items-center gap-1">
              <div className="hidden sm:flex items-center mr-2">
                <Button
                  variant="ghost"
                  onClick={() => setSearchOpen(true)}
                  className="relative w-9 h-9 sm:w-40 sm:justify-start sm:px-3 sm:py-2 text-muted-foreground hover:bg-muted/50 rounded-full sm:rounded-lg"
                >
                  <Search className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline text-xs">Pesquisar...</span>
                  <kbd className="hidden sm:inline-flex absolute right-2 pointer-events-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
                    <span className="text-xs">⌘</span>K
                  </kbd>
                </Button>
              </div>
              <ThemeToggle className="static" />
              <Button
                variant="ghost"
                size="icon"
                className="relative group rounded-full"
                onClick={() => setCartOpen(true)}
              >
                <ShoppingBag className="h-5 w-5 transition-transform group-hover:scale-110" />
                {totalQuantity > 0 && (
                  <span className="absolute top-1 right-1 h-4 w-4 bg-brand-primary text-[10px] font-bold text-white flex items-center justify-center rounded-full ring-2 ring-background animate-in fade-in zoom-in duration-300">
                    {totalQuantity}
                  </span>
                )}
              </Button>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden rounded-full">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:max-w-xs flex flex-col p-0">
                  <SheetHeader className="p-6 border-b text-left">
                    <SheetTitle className="text-xl font-display font-bold">Menu</SheetTitle>
                  </SheetHeader>
                  <div className="flex-1 overflow-y-auto py-4 px-2">
                    <div className="space-y-1">
                      {navLinks.map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-muted text-sm font-semibold transition-colors"
                        >
                          {item.name}
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </Link>
                      ))}
                    </div>
                    <div className="mt-8 pt-8 border-t border-border px-4 space-y-4">
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-black">Informações</p>
                      <Link to="/privacy" className="block text-sm text-muted-foreground hover:text-brand-primary">Política de Privacidade</Link>
                      <Link to="/terms-of-service" className="block text-sm text-muted-foreground hover:text-brand-primary">Termos de Serviço</Link>
                    </div>
                  </div>
                  <div className="p-6 border-t bg-muted/30">
                    <Button 
                      className="w-full btn-gradient"
                      onClick={() => { setSearchOpen(true); }}
                    >
                      <Search className="mr-2 h-4 w-4" /> Buscar no Catálogo
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </>
  );
}