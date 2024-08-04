export function UniqueID(length: number = 10): string {
    let uniqueId: string = ''
    let char = '1234567890abcdef'
    for (let i = 0; i < length; i++) {
        uniqueId += char.charAt(Math.floor(Math.random() * char.length))
    }

    return uniqueId
}
