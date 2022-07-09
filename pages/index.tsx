import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Button, message, Modal, Upload, UploadFile, UploadProps } from 'antd';
import { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import AddForm from '../comps/admin/AddForm';
import fs2Json from '../utils/fs2Json';
import { Goods } from '../types';
import s from '../styles/Home.module.css';
import http from '../utils/http';

export async function getServerSideProps(context) {
  const { tree, list } = fs2Json();
  return {
    props: {
      list,
    }, // will be passed to the page component as props
  };
}

const Home: NextPage<{ list: Goods[][] }> = ({ list }) => {
  const onDel = (category: string, id: string) => {
    http.post('/api/del', { category, id }).then(() => {
      location.reload();
    });
  };

  return (
    <div>
      <Head>
        <title>Goods Display</title>
        <meta name="description" content="Goods Display" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={s['page']}>
        <AddForm />
        {list.map((dir, index) => {
          const category = dir[0].category;
          return (
            <div className={s['goods-list-item']} key={index}>
              <div className={s['goods-category']}>{category}</div>
              <div className={s['goods-imgs']}>
                {dir.map(({ _id, category, description, filename }) => {
                  return (
                    <div key={_id}>
                      <Image
                        src={`/uploads/${filename}`}
                        layout="responsive"
                        width={500}
                        height={500}
                      ></Image>
                      <div>{description}</div>
                      <Button onClick={() => onDel(category, _id)}>删除</Button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
};

export default Home
