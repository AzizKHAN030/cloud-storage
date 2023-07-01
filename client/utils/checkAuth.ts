import nookies from 'nookies';
import { GetServerSidePropsContext } from 'next';
import axios from 'axios';
import Api from '@/api';

export const checkAuth = async (context: GetServerSidePropsContext) => {
    const {token} = nookies.get(context);

    axios.defaults.headers.Authorization = "Bearer " + token;

    try {
       const data = await Api.getMe();

        return {
            props:{
                userData: data
            }
        }
    } catch (error) {
        return {
            redirect:{
                destination:"/dashboard/auth",
                permanent:false
            }
        }
    }
}