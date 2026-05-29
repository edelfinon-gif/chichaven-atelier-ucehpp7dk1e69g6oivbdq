import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
export function TermsOfService() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-16 md:py-24">
        <h1 className="text-4xl font-bold mb-12">Termos de Serviço</h1>
        <div className="space-y-8 prose prose-slate dark:prose-invert max-w-none">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Aceitação dos Termos</h2>
            <p className="text-muted-foreground leading-relaxed">
              Ao acessar e usar o site ChicHaven Atelier, você concorda em cumprir e ser regido por estes Termos de Serviço. Se você não concordar com qualquer parte destes termos, não deve usar nosso site.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Elegibilidade</h2>
            <p className="text-muted-foreground leading-relaxed">
              Você deve ter pelo menos 18 anos de idade para fazer compras em nosso site. Ao fazer um pedido, você garante que possui a idade mínima legal.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Propriedade Intelectual</h2>
            <p className="text-muted-foreground leading-relaxed">
              Todo o conteúdo deste site, incluindo textos, imagens, logos e designs, é propriedade exclusiva da ChicHaven Atelier ou de seus licenciadores e está protegido por leis de direitos autorais.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Limitação de Responsabilidade</h2>
            <p className="text-muted-foreground leading-relaxed">
              A ChicHaven Atelier não será responsável por quaisquer danos diretos, indiretos ou consequentes resultantes do uso indevido de nossos produtos ou do acesso ao nosso site.
            </p>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}