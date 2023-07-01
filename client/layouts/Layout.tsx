import Head from 'next/head';
import Header from '@/components/Header';
import styles from '@/styles/Home.module.scss';
import React from 'react';

interface LayoutProps {
    title: string;
}

export const Layout: React.FC<React.PropsWithChildren<LayoutProps>> = ({ children,title }) => {

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <main>
                <Header />
                <div className={styles.main}>
                    <div className={styles.layout}>{children}</div>
                </div>
            </main>
        </>
    )
}