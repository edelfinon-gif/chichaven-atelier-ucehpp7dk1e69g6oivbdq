import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
interface ProductFiltersProps {
  category: string;
  onCategoryChange: (value: string) => void;
  priceRange?: [number, number];
  onPriceRangeChange: (value: [number, number]) => void;
  brand: string;
  onBrandChange: (value: string) => void;
  color: string;
  onColorChange: (value: string) => void;
  onClear: () => void;
}
export function ProductFilters({
  category,
  onCategoryChange,
  priceRange = [0, 1000],
  onPriceRangeChange,
  brand,
  onBrandChange,
  color,
  onColorChange,
  onClear
}: ProductFiltersProps) {
  const safeRange = priceRange ?? [0, 1000];
  const isFiltered = category !== 'all' || safeRange[0] !== 0 || safeRange[1] !== 1000 || brand !== 'all' || color !== 'all';
  const categories = [
    { label: 'Todos', value: 'all' },
    { label: 'Vestidos', value: 'vestidos' },
    { label: 'Casacos', value: 'casacos' },
    { label: 'Blusas', value: 'blusas' },
    { label: 'Calças', value: 'calças' },
    { label: 'Tricô', value: 'tricô' },
    { label: 'Acessórios', value: 'acessórios' }
  ];
  const brands = [
    { label: 'Todas', value: 'all' },
    { label: 'ChicAtelier', value: 'chicatelier' },
    { label: 'UrbanEdge', value: 'urbanedge' },
    { label: 'SilkRoad', value: 'silkroad' },
    { label: 'Heritage', value: 'heritage' }
  ];
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wider">Filtros</h3>
        {isFiltered && (
          <Button variant="ghost" size="sm" onClick={onClear} className="h-8 px-2 text-xs text-brand-primary hover:text-brand-primary/80">
            <RotateCcw className="mr-1 h-3 w-3" /> Limpar Tudo
          </Button>
        )}
      </div>
      <div>
        <h4 className="text-xs font-semibold mb-4 text-muted-foreground uppercase tracking-widest">Categorias</h4>
        <RadioGroup value={category} onValueChange={onCategoryChange} className="space-y-2.5">
          {categories.map((cat) => (
            <div key={cat.value} className="flex items-center space-x-3">
              <RadioGroupItem value={cat.value} id={`cat-${cat.value}`} className="border-brand-primary text-brand-primary" />
              <Label htmlFor={`cat-${cat.value}`} className="text-sm font-medium cursor-pointer hover:text-brand-primary transition-colors">
                {cat.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <Separator />
      <div>
        <h4 className="text-xs font-semibold mb-4 text-muted-foreground uppercase tracking-widest">Marcas</h4>
        <RadioGroup value={brand} onValueChange={onBrandChange} className="space-y-2.5">
          {brands.map((b) => (
            <div key={b.value} className="flex items-center space-x-3">
              <RadioGroupItem value={b.value} id={`brand-${b.value}`} className="border-brand-primary text-brand-primary" />
              <Label htmlFor={`brand-${b.value}`} className="text-sm font-medium cursor-pointer hover:text-brand-primary transition-colors">
                {b.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <Separator />
      <div>
        <h4 className="text-xs font-semibold mb-4 text-muted-foreground uppercase tracking-widest">Faixa de Preço</h4>
        <div className="px-2">
          <Slider
            value={[safeRange[0], safeRange[1]]}
            max={1000}
            step={10}
            onValueChange={(vals) => onPriceRangeChange(vals as [number, number])}
            className="mb-4"
          />
          <div className="flex justify-between text-xs text-muted-foreground font-mono">
            <span>R$ {safeRange[0]}</span>
            <span>R$ {safeRange[1]}+</span>
          </div>
        </div>
      </div>
      <Separator />
      <div>
        <h4 className="text-xs font-semibold mb-4 text-muted-foreground uppercase tracking-widest">Cores</h4>
        <div className="flex flex-wrap gap-2.5">
          {['#000000', '#FFFFFF', '#8B4513', '#A52A2A', '#000080', '#800000', '#F5F5DC'].map((c) => (
            <button
              key={c}
              onClick={() => onColorChange(color === c ? 'all' : c)}
              className={cn(
                "h-8 w-8 rounded-full border transition-all hover:scale-110 active:scale-95",
                color === c ? "ring-2 ring-brand-primary ring-offset-2 scale-110" : "border-border"
              )}
              style={{ backgroundColor: c }}
              title={c}
            />
          ))}
        </div>
      </div>
    </div>
  );
}