export namespace CommonProvider {

  export function isConditionalFormatting(condition, compare, value){
    switch (condition) {
        case 'EQ':return value == compare;
        case 'GT':return Number(compare) > Number(value);
        case 'LT':return Number(compare) < Number(value);
        case 'GEQ':return Number(compare) >= Number(value) ;
        case 'LEQ':return Number(compare) <= Number(value);
        case 'NEQ': return value != compare;
        case 'CONTAINS': return compare.toString().indexOf(value.toString()) > 0;
    }
  }

}
