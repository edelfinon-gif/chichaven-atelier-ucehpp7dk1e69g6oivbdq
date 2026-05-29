import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Instagram, Facebook, Twitter, MapPin, Phone, Mail } from 'lucide-react';
export function SiteFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-muted/50 mt-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="h-10 w-10 bg-brand-primary rounded-xl flex items-center justify-center transition-transform group-hover:rotate-6 shadow-soft">
                <ShoppingBag className="text-white h-6 w-6" />
              </div>
              <span className="text-2xl font-display font-bold tracking-tight">ChicHaven</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Moda premium e acessórios para o indivíduo moderno. Curadoria de luxo, qualidade artesanal e design atemporal.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="h-10 w-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-white hover:bg-brand-primary hover:border-brand-primary transition-all duration-300"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
          {/* Contact Column */}
          <div className="space-y-6">
            <h3 className="font-bold text-sm uppercase tracking-[0.2em] text-foreground">Contato</h3>
            <ul className="space-y-5 text-sm">
              <li className="flex items-start gap-4 group">
                <div className="h-8 w-8 rounded-lg bg-brand-primary/10 flex items-center justify-center shrink-0 group-hover:bg-brand-primary/20 transition-colors">
                  <MapPin className="h-4 w-4 text-brand-primary" />
                </div>
                <span className="text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
                  R ANA MACEDO 233, Bairro BARROSO, <br /> FORTALEZA-CE, CEP 60.863-515
                </span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="h-8 w-8 rounded-lg bg-brand-primary/10 flex items-center justify-center shrink-0 group-hover:bg-brand-primary/20 transition-colors">
                  <Phone className="h-4 w-4 text-brand-primary" />
                </div>
                <span className="text-muted-foreground group-hover:text-foreground transition-colors">(85) 92002-4091</span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="h-8 w-8 rounded-lg bg-brand-primary/10 flex items-center justify-center shrink-0 group-hover:bg-brand-primary/20 transition-colors">
                  <Mail className="h-4 w-4 text-brand-primary" />
                </div>
                <span className="text-muted-foreground group-hover:text-foreground transition-colors">OADRIELE860@GMAIL.COM</span>
              </li>
            </ul>
          </div>
          {/* Quick Links Column */}
          <div className="space-y-6">
            <h3 className="font-bold text-sm uppercase tracking-[0.2em] text-foreground">Explorar</h3>
            <ul className="space-y-4 text-sm">
              {['Novidades', 'Mais Vendidos', 'Coleções Exclusivas', 'Guia de Tamanhos', 'Envio e Entrega'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground hover:text-brand-primary hover:translate-x-1 inline-block transition-all">{link}</a>
                </li>
              ))}
            </ul>
          </div>
          {/* Legal Column */}
          <div className="space-y-6">
            <h3 className="font-bold text-sm uppercase tracking-[0.2em] text-foreground">Legal</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/privacy" className="text-muted-foreground hover:text-brand-primary hover:translate-x-1 inline-block transition-all">Política de Privacidade</Link></li>
              <li><Link to="/terms-of-service" className="text-muted-foreground hover:text-brand-primary hover:translate-x-1 inline-block transition-all">Termos de Serviço</Link></li>
              <li><a href="#" className="text-muted-foreground hover:text-brand-primary hover:translate-x-1 inline-block transition-all">Política de Cookies</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-brand-primary hover:translate-x-1 inline-block transition-all">Portal do Cliente</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-20 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-2">
            <p className="text-xs text-muted-foreground">
              © {currentYear} ChicHaven Atelier LLC. Todos os direitos reservados.
            </p>
            <p className="text-[10px] text-muted-foreground/60 uppercase tracking-wider">
              CNPJ: 61.528.561/0001-52 | 61.528.561 ADRIELE ALVES DE OLIVEIRA ALENCAR
            </p>
          </div>
          <div className="flex gap-6 items-center">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-4 grayscale hover:grayscale-0 transition-all opacity-50 hover:opacity-100" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-5 grayscale hover:grayscale-0 transition-all opacity-50 hover:opacity-100" />
            <div className="h-6 w-px bg-border" />
            <span className="text-[10px] font-bold text-muted-foreground/80 flex items-center gap-1">
              <ShoppingBag className="h-3 w-3" /> COMPRA 100% SEGURA
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}