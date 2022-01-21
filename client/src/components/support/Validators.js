export const required = (value) => {
    if(value) {
        return undefined
    } return 'required'
}

export const maxLength50 = (value) => {
    if(value.length > 50) {
        return 'число символов не больше 50'
    } return undefined
}

export const minLength5 = (value) => {
    if(value.length < 5) {
        return 'число символов не меньше 5'
    } return undefined
}



