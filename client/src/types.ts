export interface ApplicationDoc {
    role: string
    start_date: string;
    img: string;
    source: string;
    company_name: string;
    status: string;
    rejected: boolean;
    process_id: string;
}

export interface FileObject {
    name: string;
    base64: string|ArrayBuffer|null;
    type: string;
}