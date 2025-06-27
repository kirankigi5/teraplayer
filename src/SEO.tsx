import React from 'react';
import { Helmet } from 'react-helmet-async';
import translations from './i18n';

interface SEOProps {
  language: string;
}

const siteUrl = 'https://teraplayer.com';
const ogImage = `${siteUrl}/og-image.png`;

const hreflangs = [
  { code: 'en', url: `${siteUrl}/` },
  { code: 'hi', url: `${siteUrl}/hi` },
  { code: 'de', url: `${siteUrl}/de` },
  { code: 'id', url: `${siteUrl}/id` },
  { code: 'pt', url: `${siteUrl}/pt` },
  { code: 'es', url: `${siteUrl}/es` },
  { code: 'uk', url: `${siteUrl}/uk` },
  { code: 'fr', url: `${siteUrl}/fr` },
  { code: 'it', url: `${siteUrl}/it` },
  { code: 'th', url: `${siteUrl}/th` },
  { code: 'bn', url: `${siteUrl}/bn` },
  { code: 'cs', url: `${siteUrl}/cs` },
  { code: 'ko', url: `${siteUrl}/ko` },
  { code: 'ms', url: `${siteUrl}/ms` },
  { code: 'vi', url: `${siteUrl}/vi` },
  { code: 'te', url: `${siteUrl}/te` },
  { code: 'ta', url: `${siteUrl}/ta` },
  { code: 'kn', url: `${siteUrl}/kn` },
  { code: 'ml', url: `${siteUrl}/ml` },
];

const SEO: React.FC<SEOProps> = ({ language }) => {
  const t = translations[language as keyof typeof translations] || translations['en'];
  return (
    <Helmet htmlAttributes={{ lang: language }}>
      <title>{t.title} | TeraDownloaderPlayer</title>
      <meta name="description" content={t.subtitle} />
      <meta name="keywords" content="terabox video player online, mirrobox player, nephobox downloader, 4funbox converter, freeterabox player, 1024tera downloader, tibibox player, momerybox downloader, terabox online video player, terabox video downloader, terabox player, terabox online player, terabox direct download, terabox link converter, terabox downloader online, terabox video streaming, terabox direct link, terabox bypass, how to play videos on terabox, all terabox domains" />
      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content="#2563eb" />
      <link rel="canonical" href={siteUrl + (language === 'en' ? '' : `/${language}`)} />
      {hreflangs.map(h => (
        <link key={h.code} rel="alternate" hrefLang={h.code} href={h.url} />
      ))}
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl + (language === 'en' ? '' : `/${language}`)} />
      <meta property="og:title" content={t.title} />
      <meta property="og:description" content={t.subtitle} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="TeraDownloaderPlayer" />
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={siteUrl + (language === 'en' ? '' : `/${language}`)} />
      <meta property="twitter:title" content={t.title} />
      <meta property="twitter:description" content={t.subtitle} />
      <meta property="twitter:image" content={ogImage} />
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: t.title,
          description: t.subtitle,
          url: siteUrl + (language === 'en' ? '' : `/${language}`),
          applicationCategory: 'MultimediaApplication',
          operatingSystem: 'Any',
          browserRequirements: 'Requires JavaScript. Requires HTML5.',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
          creator: {
            '@type': 'Organization',
            name: 'TeraDownloaderPlayer',
          },
          keywords:
            'terabox video player online, mirrobox player, nephobox downloader, 4funbox converter, freeterabox player, 1024tera downloader, tibibox player, momerybox downloader, terabox online video player, terabox video downloader, terabox player, terabox online player, terabox direct download, all terabox domains',
          serviceType: 'Video Player and Downloader',
          isAccessibleForFree: true,
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
