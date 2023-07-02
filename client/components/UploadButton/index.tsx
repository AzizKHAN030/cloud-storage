import React from 'react'
import styles from '@/styles/Home.module.scss';
import {Button, notification, Upload, UploadFile} from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';
import Api from '@/api';

export const UploadButton:React.FC= () => {
    const [fileList, setFileList] = React.useState<UploadFile[]>([]);

    const onUploadSuccess = async(options:any)=>{
        try {
            await Api.uploadFile(options);
            window.location.reload();
        } catch (error) {
            notification.error({
                message:"Upload failed",
                description:"Something went wrong",
                duration:2
            })
        }
    }

    return (
        <Upload
            customRequest={onUploadSuccess}
            fileList={fileList}
            onChange={({fileList})=>setFileList(fileList)}
            className={styles.upload}
        >
            <Button
                type='primary'
                icon={<CloudUploadOutlined/>}
                size='large'
            >
                Upload File
            </Button>
        </Upload>
    )
}

export default UploadButton;