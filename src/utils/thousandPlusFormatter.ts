export function ThousandPlusFormatter(text: string){
  const valueParsed = parseInt(text)
  console.log(valueParsed > 999)
    if(valueParsed > 999){
      return `${text[0]}k+`
    }

    return text
}