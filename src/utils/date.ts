import dayjs from 'dayjs';
import 'dayjs/locale/ru';

const formatDate = dayjs;
formatDate.locale('ru');

const period = (date_from_string: string, date_to_string: string) => {
   const date_from = new Date(date_from_string);
   const date_to = new Date(date_to_string);
   const currentYear = new Date().getFullYear();
   const yearsEqualCurrent = currentYear === date_from.getFullYear() && currentYear === date_to.getFullYear();
   const yearFormat = yearsEqualCurrent ? '' : 'YYYY';
   let output;

   if (date_from_string === date_to_string) {
      output = formatDate(date_to).format(`D MMMM ${yearFormat}`);
   } else if (date_from.getFullYear() === date_to.getFullYear()) {
      if (date_from.getMonth() === date_to.getMonth()) {
         output = `${formatDate(date_from).format('D')}—${formatDate(date_to).format(`D MMM ${yearFormat}`)}`;
      } else {
         output = `${formatDate(date_from).format('D MMM')}—${formatDate(date_to).format(`D MMM ${yearFormat}`)}`;
      }
   } else {
      output = `${formatDate(date_from).format(`D MMM ${yearFormat}`)}—${formatDate(date_to).format(`D MMM ${yearFormat}`)}`;
   }

   return output;
};

export { formatDate, period };
