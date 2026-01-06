"use client";

import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/shared/config/site";
import { useLanguage } from "@/shared/i18n/LanguageProvider";
import { FOOTER } from "@/shared/i18n/content";

export function Footer() {
  const { language } = useLanguage();
  const content = FOOTER[language];
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-sand">
      <Container size="lg">
        <div className="py-16">
          <div className="grid md:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="space-y-4">
              <h3 className="text-2xl font-serif text-white">
                {siteConfig.name}
              </h3>
              <p className="text-sm leading-relaxed">
                {siteConfig.description}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm uppercase tracking-wider text-white mb-4">
                {content.navigation.title}
              </h4>
              <ul className="space-y-2 text-sm">
                {content.navigation.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h4 className="text-sm uppercase tracking-wider text-white mb-4">
                {content.help.title}
              </h4>
              <ul className="space-y-2 text-sm">
                {content.help.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm uppercase tracking-wider text-white mb-4">
                {content.contact.title}
              </h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="hover:text-white transition-colors"
                  >
                    {siteConfig.contact.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="hover:text-white transition-colors"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </li>
                <li className="pt-2">
                  <div className="flex gap-4">
                    <a
                      href={siteConfig.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                      aria-label={content.social.instagram}
                    >
                      {content.social.instagram}
                    </a>
                    <a
                      href={siteConfig.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                      aria-label={content.social.facebook}
                    >
                      {content.social.facebook}
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-taupe py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>
              © {currentYear} {siteConfig.name}. {content.copyright}
            </p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">
                {content.legal.privacy}
              </a>
              <a href="#" className="hover:text-white transition-colors">
                {content.legal.terms}
              </a>
              <a href="#" className="hover:text-white transition-colors">
                {content.legal.cookies}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
