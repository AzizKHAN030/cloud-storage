import React from "react";
import styles from "./FileList.module.scss";
import { FileItem } from "@/api/dto/files.dto";
import { Empty } from "antd";
import { FileActions } from "@/components/FileActions";
import { FileList } from "@/components/FileList";
import Api from "@/api";

interface FilesProps {
    items: FileItem[];
    withActions?: boolean;
}

export const Files: React.FC<FilesProps> = ({items, withActions}) => {
    const [files, setFiles] = React.useState<FileItem[]>(items || []);
    const [selectedIds, setSelectedIds] = React.useState<number[]>([])

    const handleRemove = ()=>{
        setSelectedIds([]);
        setFiles((prev)=>prev.filter((file)=>!selectedIds.includes(file.id)))
        Api.remove(selectedIds);
    };
    const handleShare = ()=>{
        alert('Share');
    };

    const onFileSelect = (id:number, type: 'select' | 'unselect') => {
        if(type==='select'){
            setSelectedIds((prev)=>[...prev,id])
        }else{
            setSelectedIds((prev)=>prev.filter((prevId)=>prevId!==id))
        }
    }

    return (
        <div>
            {
                files.length ?
                <>
                    {withActions && <FileActions
                     onClickRemove={handleRemove}
                     onClickShare={handleShare}
                     isActive = {selectedIds.length>0}
                     /> }
                    <FileList 
                        items={files}
                        onFileSelect={onFileSelect}
                    />
                </> : (
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="No files"
                    className="empty-block"
                />
                )
            }
        </div>
    )
}