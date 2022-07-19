import type { NextPage } from 'next'
import Head from 'next/head';

export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/README',
      permanent: false,
    },
  };
}

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>blog</title>
        <meta name="description" content="blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
};

export default Home
