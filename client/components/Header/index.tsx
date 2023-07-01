import React from "react";
import styles from './Header.module.scss';
import {Layout, Avatar, Menu, Popover, Button} from "antd";
import {CloudOutlined} from "@ant-design/icons";
import {useRouter} from "next/router";
import Api from '@/api';

export const Header: React.FC = ()=>{
    const router = useRouter();
    const selectedMenu = router.pathname;

    const handleLogout = ()=>{
        Api.logout();
    }

    return(
       <Layout.Header className={styles.root}>
            <div className={styles.headerInner}>
                <div className={styles.headerLeft}>
                    <h2>
                        <CloudOutlined/>
                        Cloud Storage
                    </h2>
                    <Menu
                    className={styles.topMenu}
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={[selectedMenu]}
                    onSelect={({key})=>router.push(key)}
                    items={[
                        {key:'/dashboard', label:'Dashboard'},
                        {key:'/dashboard/profile', label:'My Account'},
                    ]}
                />
                </div>
                <div className={styles.headerRight}>
                    <Popover
                    trigger="click"
                    content={
                        <Button type="primary" danger onClick={handleLogout}>
                            Logout
                        </Button>
                    }
                    >
                    <Avatar>
                        A
                    </Avatar>
                    </Popover>
                </div>
            </div>
        </Layout.Header>
    )
}

export default Header;