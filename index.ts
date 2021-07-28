// Build a Mortgage Claculator using Rxjs and calculateMortgage method
import { calculateMortgage } from './calculate';
import { fromEvent, combineLatest } from 'rxjs';
import { filter, map, share } from 'rxjs/operators';

const loanAmount = document.getElementById('loanAmount');
const loanInterest = document.getElementById('loanInterest');
const loanLength = document.getElementById('loanLength');

const createInputValueStream = item => {
  return fromEvent(item, 'input').pipe(
    map(event => parseFloat(event.target.value))
  );
};

const createSelectValueStream = item => {
  return fromEvent(item, 'change').pipe(
    map(event => parseFloat(event.target.value))
  );
};

const loanAmountStream$ = createInputValueStream(loanAmount);
const loanInterestStream$ = createInputValueStream(loanInterest);
const loanLengthStream$ = createSelectValueStream(loanLength);

combineLatest(loanAmountStream$, loanInterestStream$, loanLengthStream$)
  .pipe(
    map(([loanAmountStream, loanInterestStream, loanLengthStream]) => {
      return calculateMortgage(
        loanInterestStream,
        loanAmountStream,
        loanLengthStream
      );
    }),
    filter(val => !isNaN(parseFloat(val))),
    share()
  )
  .subscribe(mortageResult => {
    console.log(mortageResult);
  });
