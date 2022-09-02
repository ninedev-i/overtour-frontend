export const getCookie = (name: string): string | undefined => {
   let matches = document.cookie.match(new RegExp(
      '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
   ));
   return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const setCookie = (name: string, value: string): void => {
   document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
};