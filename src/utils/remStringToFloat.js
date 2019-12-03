const remStringToFloat = inString => {
  const rems = inString.replace('rems', '')
  return parseFloat(rems) * 10
}

export default remStringToFloat
