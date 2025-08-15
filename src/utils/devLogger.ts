export const devLog = (...args: any[]) => {
  if (process.env.NODE_ENV !== 'production') {
     
    console.log(...args)
  }
}

export const devWarn = (...args: any[]) => {
  if (process.env.NODE_ENV !== 'production') {
     
    console.warn(...args)
  }
}
