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

export const fieldsForQuery = ['role', 'company_name']