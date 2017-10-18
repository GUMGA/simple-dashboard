export namespace CommonProvider {

  declare let window;

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

  export function formatValue(value, format, precision?) {
      var formattedValue = value;
      if((!precision || precision ) && precision == null) {
          precision = 2;
      }

      if (formattedValue === undefined)
          formattedValue = 0;
      if(value == '----') return;

      switch (format) {
          case 'moeda':
              if (formattedValue.toString().indexOf('R$') === -1)
                  formattedValue = 'R$ ' + formatMoney(Number(formattedValue), precision, ',', '.');
              break;
          case 'moedaabbreviation':
              formattedValue = this.formatValueAbbreviation(value, precision);
              break;
          case 'percentual':
              if (formattedValue.toString().indexOf('%') === -1)
                  formattedValue = formatMoney(Number(formattedValue), precision, ',', '.') + '%';
              break;
          case 'decimal':
              if (formattedValue.toString().indexOf(',') === -1)
                  formattedValue = formatMoney(Number(formattedValue), precision, ',', '.');
              break;
          case 'data#dd/MM/yyyy':
              formattedValue = window.moment(value).format("DD/MM/YYYY HH:mm");
              break;
          case 'datahora#dd/MM/yyyy HH:mm':
              formattedValue = window.moment(value).toDate().toLocaleString();
              break;
          case 'hora#HH:mm':
              formattedValue = window.moment(value).format("HH:mm");
              break;
      }
      
      return formattedValue;
  }

  export function formatValueAbbreviation (value, precision) {
      if((!precision || precision ) && precision == null) {
          precision = 2;
      }
      var aux = value < 0 ? value * -1 : value;
      if (aux / 1000000000000 >= 1) {
          if (value.toString().indexOf('Tri') === -1)
              return (value / 1000000000000).toFixed(precision) + ' Tri';
      } else if (aux / 1000000000 >= 1) {
          if (value.toString().indexOf('Bi') === -1)
              return (value / 1000000000).toFixed(precision) + ' Bi';
      } else if (aux / 1000000 >= 1) {
          if (value.toString().indexOf('Mi') === -1)
              return (value / 1000000).toFixed(precision) + ' Mi';
      } else if (aux / 1000 >= 1) {
          if (value.toString().indexOf('K') === -1)
              return (value / 1000).toFixed(precision) + ' K';
      }
      return value;
  }

  export function formatMoney(v, c, d, t) {
      var j, n = v, i, s;
      c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "";
      i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "";
      j = (j = i.length) > 3 ? j % 3 : 0;
      return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
  };

}
