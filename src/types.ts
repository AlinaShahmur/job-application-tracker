export interface ApplicationDoc {
    process_id: string;
    role: string
    start_date: string;
    stage: string;
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