import Head from "next/head";

// Define a custom type for metadata
interface CustomMetadata {
    title: string;
    description: string;
    image: string;
    url: string;
  }
  
export const metadata: CustomMetadata = {
    title: "Cevallos Systems",
    description: "Creating full stack web solutions for anyone needing a digital presence",
    image: "https://cevallossystems.com/images/c-systems-logo.png",
    url: "https://cevallossystems.com",
  };

export default function BaseHead() {
    return (
    <Head>
        {/* Favicon */}
        <link rel="icon" href="/image/c-systems-logo-64.png" type="image/png" sizes="16x16" />
        <link rel="icon" href="/image/c-systems-logo-64.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/image/c-systems-logo-64.png" type="image/png" sizes="48x48" />
        <link rel="apple-touch-icon" href="/image/c-systems-logo-180.png" />

            
        {/* Basic SEO */}
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />

        {/* Open Graph for social media */}
        <meta property="og:title" content={metadata.title} key="title"/>
        <meta property="og:description" content={metadata.description} key="description" />
        <meta property="og:image" content={metadata.image} key="image" />
        <meta property="og:url" content={metadata.url} key="url"/>
        <meta property="og:type" content="website" />

        {/* Twitter Card for Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={metadata.image} />

        {/* Robots meta tag */}
        <meta name="robots" content="index, follow" />

        {/* Canonical link */}
        <link rel="canonical" href={metadata.url} />
      </Head>
    )
}