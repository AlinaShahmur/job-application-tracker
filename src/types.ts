import { ObjectId } from "mongodb";

export interface ApplicationDoc {
    process_id: ObjectId;
    role: string
    start_date: Date;
    img: string;
    source: string;
    company_name: string;
    status: string;
    history: History;
}

export interface ProcessDoc {
    user: string,
    name: string;
}

export interface UserDoc {
    email: string;
    processes: [];
}

export interface StageDoc {
    date: Date,
    stage_name: string
}

export interface HistoryDoc {
    application_id: string;
    history: StageDoc[];
}

export enum systemTypes { 
    LINKEDIN = "LinkedIn"
 };