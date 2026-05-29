import React from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { ProductFilters } from './product-filters';
interface MobileFiltersProps {
  category: string;
  onCategoryChange: (value: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (value: [number, number]) => void;
  brand: string;
  onBrandChange: (value: string) => void;
  color: string;
  onColorChange: (value: string) => void;
  onClear: () => void;
  resultsCount: number;
}
export function MobileFilters(props: MobileFiltersProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="md:hidden flex gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filtros
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle>Filtros</SheetTitle>
        </SheetHeader>
        <ProductFilters {...props} />
        <SheetFooter className="mt-8">
          <SheetClose asChild>
            <Button className="w-full btn-gradient">Ver {props.resultsCount} Resultados</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}