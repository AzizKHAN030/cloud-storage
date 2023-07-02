import axios from '@/core/axios'

type FileType = 'photos' | 'all' | 'trash';

export const getAll = async (type: FileType = 'all'): Promise<any> => {
    const {data} = await axios.get(`/files/?type=${type}`);

    return data;
}

export const remove = (ids:number[]): Promise<void> => {
    return axios.delete(`/files?ids=${ids}`);
}

export const uploadFile = async (options:any): Promise<any> => {
   const {onSuccess, onError, file, onProgress} = options;

    const formData = new FormData();

    formData.append('file', file);

    const config = {
        headers: {'Content-Type': 'multipart/form-data'},
        onProgress: (e:ProgressEvent)=>{
            onProgress({percent: Math.round((e.loaded * 100) / e.total)})
        }
    }

    try {
        const {data} = await axios.post('/files', formData, config);

        onSuccess();

        return data;
    } catch (error) {
        onError({error});
    }
}

export default getAll;