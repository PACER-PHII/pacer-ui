import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateValue'
})
export class DateValuePipe implements PipeTransform {
  transform(value: any): any {
    if (typeof value === 'string' && value.length > 26  && !isNaN(Date.parse(value))) {
      // If the value is a valid date string, format it using the DatePipe
      const datePipe = new DatePipe('en-US');
      const formattedDate = datePipe.transform(value, 'MMM d, yyyy');
      const formattedTime = datePipe.transform(value, 'HH:mm');
      return `${formattedDate}, ${formattedTime}`;
    } else if (!isNaN(parseFloat(value))) {
      // If the value is a number, return it as is
      return parseInt(value);
    }
    // Return the original value if it is not a date or a number
    return value;
  }
}
