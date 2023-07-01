import { User } from '@/api/dto/auth.dto';
import {NextPage} from 'next';
import styles from '@/styles/Profile.module.scss';
import { Button } from 'antd';
import { checkAuth } from '@/utils/checkAuth';
import { GetServerSidePropsContext } from 'next';
import Api from "@/api"
import { Layout } from '@/layouts/Layout';

interface Props {
    userData: User
}

export const DashboardProfilePage: NextPage<Props> = ({userData})=>{
    const handleLogout = () => {
        Api.logout();
    }

    return (
        <main>
            <div className={styles.root}>
                <h1>My Account</h1>
                <br/>
                <p>
                    ID: <b>{userData?.id}</b>
                </p>
                <p>
                    Full Name <b>{userData?.fullName}</b>
                </p>
                <p>
                    Email: <b>{userData?.email}</b>
                </p>
                <br/>
                <Button type='primary' danger onClick={handleLogout}>
                    Logout
                </Button>
            </div>
        </main>
    )
}

DashboardProfilePage.getLayout = (page: React.ReactNode) => {
    return <Layout title = {"My Account"}>{page}</Layout>
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const authProps = await checkAuth(context);
 
    if("redirect" in authProps){
        return authProps;
    }

    const {
        props:{
            userData
        }
    } = authProps;
    
 
    return {
          props:{
            userData
          }
    }
 }

export default DashboardProfilePage;