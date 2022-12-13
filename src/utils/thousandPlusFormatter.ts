export function ThousandPlusFormatter(text: string){
  const valueParsed = parseInt(text)
    if(valueParsed > 999){
      return `${text[0]}k+`
    }

    return text
}