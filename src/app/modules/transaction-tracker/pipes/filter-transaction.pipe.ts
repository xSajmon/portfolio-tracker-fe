import { Pipe, PipeTransform } from '@angular/core';
import { Transaction } from '../models/transaction.model';

@Pipe({
  name: 'filterTransaction'
})
export class FilterTransactionPipe implements PipeTransform {

  transform(value: Transaction[], filterString: string) {
    if(value.length === 0 || !filterString){
        return value;
    } else {
      return value.filter(transaction => transaction.type === filterString)
    }
  }

}
