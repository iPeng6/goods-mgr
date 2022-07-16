import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { MDXProvider } from '@mdx-js/react';
import Image from 'next/image';

// const ResponsiveImage = (props) => {
//   console.log(props);
//   console.log(
//     '===============================================',
//     './' + props.src
//   );
//   // const img = require(__dirname + '/' + props.src);
//   if (props.src && /https?:\/\/\w+(\.\w+)+\/.+/.test(props.src)) {
//     return <img {...props} alt="image"></img>;
//   } else {
//     return (
//       <Image
//         alt={props.alt}
//         // width="100%"
//         // height="100%"
//         // layout="fill"
//         {...props}
//       />
//     );
//   }
// };

const components = {
  NextImage: (props: any) => {
    return <Image alt={props.alt || 'Image'} layout="responsive" {...props} />;
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MDXProvider components={components}>
      <Component {...pageProps} />
    </MDXProvider>
  );
}

export default MyApp
