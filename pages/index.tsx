import type { NextPage } from 'next'
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export async function getStaticProps() {
  return {
    redirect: {
      destination: '/README',
      permanent: false,
    },
  };
}

const Home: NextPage = ({ pages }) => {
  console.log(pages);
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
