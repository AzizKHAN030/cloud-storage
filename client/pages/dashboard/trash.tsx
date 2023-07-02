
import {NextPage, GetServerSidePropsContext} from 'next';
import { checkAuth } from '@/utils/checkAuth';
import {Layout} from '@/layouts/Layout';
import Api from '@/api';
import { FileItem } from '@/api/dto/files.dto';
import { FileList } from '@/components/FileList';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { Files } from '@/modules/Files';

interface Props  {
    items: FileItem[]
}

const DashboardTrash: NextPage<Props> = ({items})=>{
    return (
        <DashboardLayout>
              <Files items={items}/>
        </DashboardLayout>
    )
}

DashboardTrash.getLayout = (page: React.ReactNode) => {
    return <Layout title = {"Dashboard/Trash"}>{page}</Layout>
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
   const authProps = await checkAuth(context);

   if("redirect" in authProps){
       return authProps;
   }

   try {
    const items = await Api.getAll('trash');

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

export default DashboardTrash;