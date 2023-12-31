
import {NextPage, GetServerSidePropsContext} from 'next';
import  Header  from '@/components/Header';
import { checkAuth } from '@/utils/checkAuth';
import {Layout} from '@/layouts/Layout';
import Api from '@/api';
import { FileItem } from '@/api/dto/files.dto';
import { FileList } from '@/components/FileList';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { FileActions } from '@/components/FileActions';
import { Files } from '@/modules/Files';

interface Props  {
    items: FileItem[]
}

const DashboardPage: NextPage<Props> = ({items})=>{
    return (
        <DashboardLayout>
            <Files items={items} withActions/>
        </DashboardLayout>
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

   try {
    const items = await Api.getAll();

    return {
        props:{
            items
        }
    }
   } catch (error) {
    console.log('>>>', error);

    return {
        props:{
            items:[]
        }
    }
   }
}

export default DashboardPage;