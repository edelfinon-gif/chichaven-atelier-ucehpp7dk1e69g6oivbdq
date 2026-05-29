import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
export function PrivacyPolicy() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-16 md:py-24">
        <h1 className="text-4xl font-bold mb-12">Política de Privacidade</h1>
        <div className="space-y-8 prose prose-slate dark:prose-invert max-w-none">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Introdução</h2>
            <p className="text-muted-foreground leading-relaxed">
              A ChicHaven Atelier está comprometida em proteger sua privacidade. Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações quando você visita nosso site.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Coleta de Informações</h2>
            <p className="text-muted-foreground leading-relaxed">
              Coletamos informações que você nos fornece diretamente, como quando você cria uma conta, faz um pedido ou entra em contato conosco. Isso pode incluir seu nome, e-mail, endereço de entrega e detalhes de pagamento.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Uso de Dados</h2>
            <p className="text-muted-foreground leading-relaxed">
              Utilizamos suas informações para processar pedidos, enviar atualizações sobre seu status, melhorar nossos serviços e enviar comunicações de marketing, caso você tenha optado por recebê-las.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Seus Direitos</h2>
            <p className="text-muted-foreground leading-relaxed">
              Você tem o direito de acessar, corrigir ou excluir seus dados pessoais a qualquer momento. Entre em contato conosco através do e-mail legal@chichaven.atelier para exercer esses direitos.
            </p>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}