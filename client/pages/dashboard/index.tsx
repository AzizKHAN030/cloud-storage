
import {NextPage, GetServerSidePropsContext} from 'next';
import  Header  from '@/components/Header';
import { checkAuth } from '@/utils/checkAuth';
import {Layout} from '@/layouts/Layout';
import styles from '@/styles/Home.module.scss';
import { Button, Menu } from 'antd';
import { useRouter } from 'next/router';
import { DeleteOutlined, FileImageOutlined, FileOutlined } from '@ant-design/icons';

const DashboardPage: NextPage = ()=>{
    const router = useRouter();
    const selectedMenu = router.pathname;


    return (
        <>
            <main className={styles.dashboardContainer}>
                <div className={styles.sidebar}>
                    <Button>
                        Upload
                    </Button>
                    <Menu
                        className={styles.menu}
                        mode="inline"
                        selectedKeys={[selectedMenu]}
                        items = {[
                            {
                                key:'/dashboard',
                                icon:<FileOutlined/>,
                                label:'Files',
                                onClick:(()=>router.push('/dashboard'))
                            },
                            {
                                key:'/dashboard/photos',
                                icon: <FileImageOutlined/>,
                                label:'Photos',
                                onClick:(()=>router.push('/dashboard/photos'))
                            },
                            {
                                key:'/dashboard/trash',
                                icon: <DeleteOutlined/>,
                                label:'Trash',
                                onClick:(()=>router.push('/dashboard/trash'))
                            },
                        ]}
                    />
                </div>
                <div className='container'>
                    <h1>Files</h1>
                </div>
            </main>
        </>
    )
}

DashboardPage.getLayout = (page: React.ReactNode) => {
    return <Layout title = {"Dashboard"}>{page}</Layout>
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
   const authProps = await checkAuth(context);

   if("redirect" in authProps){
       return authProps;
   }

   return {
         props:{}
   }
}

export default DashboardPage;