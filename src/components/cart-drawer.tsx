import React from 'react';
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { useCartStore } from '@/lib/store';
interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const freeShippingThreshold = 150;
  const shippingProgress = Math.min((subtotal / freeShippingThreshold) * 100, 100);
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="p-6 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-brand-primary" />
              Sua Sacola ({items.length})
            </SheetTitle>
          </div>
          {subtotal > 0 && (
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span>{subtotal >= freeShippingThreshold ? "Você ganhou Frete Grátis!" : `Faltam R$ ${(freeShippingThreshold - subtotal).toFixed(2)} para Frete Grátis`}</span>
                <span>{Math.round(shippingProgress)}%</span>
              </div>
              <Progress value={shippingProgress} className="h-1.5 bg-muted" />
            </div>
          )}
        </SheetHeader>
        <ScrollArea className="flex-1 px-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[60vh] space-y-4 text-center">
              <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center">
                <ShoppingBag className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-bold">Sua sacola está vazia</h3>
              <p className="text-sm text-muted-foreground max-w-[240px]">
                Parece que você ainda não adicionou nada à sua sacola.
              </p>
              <Button className="btn-gradient" onClick={() => onOpenChange(false)}>
                Começar a Comprar
              </Button>
            </div>
          ) : (
            <div className="py-6 space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 group">
                  <div className="h-24 w-20 shrink-0 rounded-lg overflow-hidden bg-muted border">
                    <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex justify-between gap-2">
                      <h4 className="text-sm font-bold truncate">{item.name}</h4>
                      <span className="text-sm font-bold text-brand-primary">R$ {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{item.category} • {item.brand}</p>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border rounded-lg h-8">
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => removeItem(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        {items.length > 0 && (
          <SheetFooter className="p-6 border-t bg-muted/30 flex-col sm:flex-col space-y-4">
            <div className="space-y-2 w-full">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-bold">R$ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Frete</span>
                <span className="font-bold text-green-600">{subtotal >= freeShippingThreshold ? 'GRÁTIS' : 'R$ 15,00'}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-brand-primary">R$ {(subtotal + (subtotal >= freeShippingThreshold ? 0 : 15)).toFixed(2)}</span>
              </div>
            </div>
            <Button className="w-full btn-gradient h-12 text-md">
              Finalizar Compra <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="text-[10px] text-center text-muted-foreground">
              Impostos e taxas calculados no checkout.
            </p>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}