export const FOUR_WEEKS = 604800000 * 4;
export const STATUS = {
    FULFILLED: 'fullfilled',
    PENDING: 'pending',
    REJECTED: 'rejected'
} 

export const DB_COLLECTIONS = {
    APPLICATIONS: 'applications',
    USERS: 'users',
    PROCESSES: 'processes',
    HISTORIES: 'histories',
    SOURCES: 'sources'
}

export const sortTypes = {
    asc: {'start_date': 1},
    desc: {'start_date': -1}
}

export const JOB_PARAMETERS_SELECTORS = {
    role: ".top-card-layout__title",
    company_name: ".topcard__org-name-link",
    location: ".topcard__flavor--bullet.topcard__flavor"
}

export const firstStageName = "CV was sent";

export enum ApplicationTypes {BY_LINK = "byLink"}

export const fieldsForQuery = ['role', 'company_name']