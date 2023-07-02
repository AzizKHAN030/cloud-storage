
import {NextPage, GetServerSidePropsContext} from 'next';
import { checkAuth } from '@/utils/checkAuth';
import {Layout} from '@/layouts/Layout';
import Api from '@/api';
import { FileItem } from '@/api/dto/files.dto';
import {Files} from '@/modules/Files';
import { DashboardLayout } from '@/layouts/DashboardLayout';

interface Props  {
    items: FileItem[]
}

const DashboardPhotos: NextPage<Props> = ({items})=>{
    return (
        <DashboardLayout>
             <Files items={items} withActions/>
        </DashboardLayout>
    )
}

DashboardPhotos.getLayout = (page: React.ReactNode) => {
    return <Layout title = {"Dashboard/Photos"}>{page}</Layout>
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
   const authProps = await checkAuth(context);

   if("redirect" in authProps){
       return authProps;
   }

   try {
    const items = await Api.getAll('photos');

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

export default DashboardPhotos;