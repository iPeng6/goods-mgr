import type { AppProps } from 'next/app';
import { MDXProvider } from '@mdx-js/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import '../styles/globals.css';
import MarkDown from 'markdown-to-jsx';

const components = {
  NextImage: (props: any) => {
    return <Image alt={props.alt || 'Image'} layout="responsive" {...props} />;
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  // console.log(pageProps);
  const [sidebarData, setSidebarData] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open || sidebarData) return;
    fetch('/api/sidebar')
      .then((res) => {
        return res.text();
      })
      .then((text) => {
        console.log('res', text);
        setSidebarData(text);
      });
  }, [open, sidebarData]);

  const openToggle = () => {
    setOpen((prev) => !prev);
  };
  return (
    <MDXProvider components={components}>
      <div className="layout">
        <article className="article-container">
          <Component {...pageProps} />
        </article>
        <nav className="sidebar" style={{ display: open ? '' : 'none' }}>
          <MarkDown>{sidebarData}</MarkDown>
        </nav>
        <div className="switcher" onClick={openToggle}>
          三
        </div>
      </div>
    </MDXProvider>
  );
}

export default MyApp;
