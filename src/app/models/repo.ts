import { IUser } from "./user";

export interface IRepo {
    id: number,
    node_id: string;
    name: string;
    stargazers_count: string;
}