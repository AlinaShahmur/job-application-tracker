function appReducer(state: any = {applications: [], currentPage: 1}, action: any) {
    switch(action.type) {
        case "PAGE_LOAD":
            return {...state, applications: action.payload}
        // case 'ADD':
        //     return {...state, cars: [...state.cars, action.payload]}
        // case 'DELETE':
        //     let cars = state.cars
        //     let index = cars.findIndex((car: any) => car._id === action.payload);
        //     if (index >= 0) {
        //         cars[index].status = 'deleted'
        //     }
        //     return {...state, cars: cars}
        // case 'UPDATE':
        //     let arr = state.cars
        //     let updatedCar = action.payload;
        //     let id = updatedCar._id
        //     let i = arr.findIndex((item: any) => item._id === id)
        //     if (i >= 0) {
        //         arr[i] = updatedCar
        //     }
        //     return {...state, cars: arr}
        // case 'DELETE_FROM_STATE': 
        //     let cars1 = state.cars
        //     let j = cars1.findIndex((car: any) => car._id === action.payload);
        //     if (j >= 0) {
        //         cars1.splice(j, 1)
        //     }
        //     return {...state, cars: cars1}
        // case 'CANCEL_DELETION': 
        //     let cars2 = state.cars;
        //     let m = cars2.findIndex((car: any) => car._id === action.payload);
        //     if (m >= 0) {
        //         cars2[m].status = 'unchanged'
        //     }
        //     return {...state, cars: cars2}   
        default:
            return state;
    }
}

export default appReducer