import React from 'react';
import styles from './FileActions.module.scss';
import { Button, notification, Popconfirm, Upload, UploadFile } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';
import Api from '@/api';

interface FileActionsProps {
    onClickRemove: VoidFunction;
    onClickShare: VoidFunction;
    isActive:  boolean;
}

export const FileActions: React.FC<FileActionsProps> = ({onClickRemove, onClickShare, isActive}) => {
    return (
        <div className={styles.root}>
            <Button onClick = {onClickShare} disabled={!isActive}>
                Share
            </Button>
            <Popconfirm
                title="Are you sure to delete?"
                description="Files will be moved to trash"
                okText="Yes"
                cancelText="No"
                disabled={!isActive}
                onConfirm={onClickRemove}

            >
                <Button disabled={!isActive} type='primary' danger>
                    Remove
                </Button>
            </Popconfirm>
        </div>
    )
}