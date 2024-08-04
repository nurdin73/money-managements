export const getCurrentUser = () => {
    let user = null
    try {
        user =
            localStorage.getItem('gogo_current_user') != null
                ? JSON.parse(localStorage.getItem('gogo_current_user') || '')
                : null
    } catch (error) {
        console.log('>>>>: src/helpers/Utils.js  : getCurrentUser -> error', error)
        user = null
    }
    return user
}

export const setCurrentUser = (user = null) => {
    try {
        if (user) {
            localStorage.setItem('gogo_current_user', JSON.stringify(user))
        } else {
            localStorage.removeItem('gogo_current_user')
        }
    } catch (error) {
        console.log('>>>>: src/helpers/Utils.js : setCurrentUser -> error', error)
    }
}

export const getCurrentToken = () => {
    let token: any = null
    try {
        token =
            localStorage.getItem('JWT-TOKEN') != null
                ? JSON.parse(localStorage.getItem('JWT-TOKEN') || '')
                : null
    } catch (error) {
        console.log('>>>>: src/helpers/Utils.js  : getCurrentToken -> error', error)
        token = null
    }
    return token
}

export const setCurrentToken = (token = null) => {
    try {
        if (token) {
            localStorage.setItem('JWT-TOKEN', JSON.stringify(token))
        } else {
            localStorage.removeItem('JWT-TOKEN')
        }
    } catch (error) {
        console.log('>>>>: src/helpers/Utils.js : setCurrentToken -> error', error)
    }
}

export const humanFileSize = (bytes, si = false, dp = 1) => {
    const thresh = si ? 1000 : 1024

    if (Math.abs(bytes) < thresh) {
        return bytes + ' B'
    }

    const units = si
        ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
    let u = -1
    const r = 10 ** dp

    do {
        bytes /= thresh
        ++u
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1)

    return bytes.toFixed(dp) + ' ' + units[u]
}

export const colors = {
    default: '#1A3159',
    silver: '#E8EAEE',
    green: '#09AB54',
    greenOld: '#0EC3AE',
    yellow: '#FFFF00',
    primary: '#41A3F0',
    primaryLightBase: '#ED1B24',
    primary0: '#00b2c9',
    primary1: '#337ab7',
    secondary: '#1A3159',
    secondaryLightBase: '#1A3159',
    secondaryDarkBase: '#1A3159',
    tertiary: '#898B8D',
    tertiaryDark20: '#B7B9BC',
    tertiaryDark40: '#898B8D',
    tertiaryDark60: '#5C5C5E',
    tertiaryLightBase: '#E5E7EB',
    tertiaryLight60: '#F5F5F7',
    tertiaryLight80: '#FAFAFB',
    netralSoftBlack: '#26395A',
    white: '#FFFFFF',
    silverWhite: '#D9D9D9',
    silverLight: '#F9F9F9',
    red: '#E62E58',
    gray2: '#9A9CAE',
    gray4: '#4B5675',
    gray5: '#99A1B7',
    black: '#071437',
    successLightBase: '#00C48C',
    successLight90: '#E6F9F4',
    dangerLightBase: '#FF3C5A',
    dangerLight80: '#FFD8DE',
}

export const getStatus = (status: string) => {
    if (status === '$contains') {
        return 'ilike'
    } else if (status === '$startsWith') {
        return '$startsWith'
    } else if (status === '$endsWith') {
        return '$endsWith'
    } else if (status === '$gt') {
        return '>'
    } else if (status === '$gte') {
        return '>='
    } else if (status === '$lt') {
        return '<'
    } else if (status === '$lte') {
        return '<='
    } else if (status === '$eq') {
        return '='
    } else if (status === '$ne') {
        return 'not ilike'
    }
}
