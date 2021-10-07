export const getType = (string: string) => {
    return string.split('-')[0]
}

export const capitalize = (s: string) => {
    return s.charAt(0).toUpperCase() + s.slice(1)
}