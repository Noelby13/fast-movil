export function emailValidator(email:string):string{
    const re = /\S+@\S+\.\S+/
    if (!email) return "El email no puede estar vacion"
    if (!re.test(email)) return 'Ooops! Ingresa un email valido'
    return ''
  }
  