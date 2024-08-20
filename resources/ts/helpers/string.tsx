type TFormatter = {
  capitalize: (string: string) => string
  dateTimeFormat: (value: string) => string
  getLocaleDateString: (date: Date) => string | undefined
  getLocaleDateTimeString: (date: Date) => string | undefined
  transformDate: (date: any, format: string) => string
}

export const pluralize = (val, word, plural = word + 's') => {
  const _pluralize = (num, word, plural = word + 's') =>
    [1, -1].includes(Number(num)) ? word : plural
  if (typeof val === 'object') return (num, word) => _pluralize(num, word, val[word])
  return _pluralize(val, word, plural)
}

export const stringFormatter = (): TFormatter => {
  const capitalize = (string: string) => {
    if (typeof string == 'string') {
      let final: string = ''
      string = string.toLowerCase()
      const strings: Array<string> = string.split(' ')

      if (strings.length > 1) {
        strings.map((q) => {
          final = final + q.charAt(0).toUpperCase() + q.slice(1) + ' '
        })
      } else {
        final = string.charAt(0).toUpperCase() + string.slice(1)
      }
      return final
    }

    return ''
  }

  const dateTimeFormat = (value: string) => {
    if (!value) {
      return null as any
    }

    return new Intl.DateTimeFormat('id-ID', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
      .format(new Date(value))
      .replace(',', '')
  }

  const getLocaleDateString = (date: Date) => {
    if (isNaN(date.getTime())) return
    const localeDate = date.toLocaleDateString().split('/')
    return `${localeDate[2]}-${localeDate[0].padStart(2, '0')}-${localeDate[1].padStart(2, '0')}`
  }

  const getLocaleDateTimeString = (date: Date) => {
    if (isNaN(date.getTime())) return
    const localeDate = date.toLocaleTimeString().split(':')
    return `${getLocaleDateString(new Date())} ${localeDate[0]}:${localeDate[1]}`
  }

  function transformDate(date, format) {
    const formatDate = (date, format) => {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-based in JavaScript Date
      const day = String(date.getDate()).padStart(2, '0')

      switch (format) {
        case 'YYYY-MM-DD':
          return `${year}-${month}-${day}`
        case 'MM/DD/YYYY':
          return `${month}/${day}/${year}`
        case 'MM-DD-YYYY':
          return `${month}-${day}-${year}`
        case 'YYYY/MM/DD':
          return `${year}/${month}/${day}`
        case 'DD-MM-YYYY':
          return `${day}-${month}-${year}`
        case 'DD/MM/YYYY':
          return `${day}/${month}/${year}`
        default:
          throw new Error('Unsupported date format')
      }
    }

    return formatDate(date, format)
  }

  return {
    capitalize,
    dateTimeFormat,
    getLocaleDateString,
    getLocaleDateTimeString,
    transformDate,
  }
}
