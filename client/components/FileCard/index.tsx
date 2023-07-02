import { getColorByExtension } from '@/utils/getColorByExtension';
import { getExtensionFromFilename } from '@/utils/getExtensionFromFilename';
import { isImage } from '@/utils/isImage';
import { FileTextOutlined } from '@ant-design/icons';
import React from 'react'
import Image from 'next/image';
import styles from './FileCard.module.scss';

interface FileCardProps {
    filename: string;
    originalName: string;
}

export const FileCard: React.FC<FileCardProps> = ({originalName, filename}) => {
    const ext = getExtensionFromFilename(filename);
    const imageUrl = ext && isImage(ext) ? 'http:localhost:7777/uploads/'+filename : '';
    const extColor = getColorByExtension(ext);

    const classColor = styles[extColor]

  return (
    <div className={styles.root}>
        <div className={styles.icon}>
            <i className={classColor}>{ext}</i>
            {
                isImage(ext)
                    ? <Image
                     src={imageUrl}
                     alt={originalName}
                     className={styles.image}
                     width={80}
                     height={80}/>
                    : <FileTextOutlined/>
            }
        </div>
        <span>{originalName}</span>
    </div>
  )
}
