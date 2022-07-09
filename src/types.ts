export interface ApplicationDoc {
    process_id: string;
    role: string
    start_date: string;
    img: string;
    source: string;
    company_name: string;
    status: string;
    rejected: boolean;
    history: History;
}

export interface ProcessDoc {
    user_id: string,
    name: string;
    applications: string[]
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