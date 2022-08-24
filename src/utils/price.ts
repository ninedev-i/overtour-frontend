export const toTriads = (sum: number) => {
   const output = sum + '';
   return output.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};
