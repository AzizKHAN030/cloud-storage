import { User } from "./auth.dto";

export interface FileItem {
    id: number;
    filename: string;
    originalname: string;
    size: number;
    mimetype: string;
    deletedAt: string | null;
    user: User;
}