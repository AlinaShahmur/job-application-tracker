export const TWO_WEEKS = 1209600000
export const STATUS = {
    FULFILLED: 'fullfilled',
    PENDING: 'pending',
    REJECTED: 'rejected'
} 

export const DB_COLLECTIONS = {
    APPLICATIONS: 'applications',
    USERS: 'users',
    PROCESSES: 'processes',
    HISTORIES: 'histories'
}

export const sortTypes = {
    asc: {'start_date': 1},
    desc: {'start_date': -1}
}

export const fieldsForQuery = ['role', 'company_name']