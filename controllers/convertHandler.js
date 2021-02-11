/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  
  this.getNum = function(input) {
    let indexRegex = /\d/g
    let numRegex = /(^\d*\.{0,1}\d*\/{0,1}\d+\.{0,1}\d*$|^$|^\d+\.{0,1}\d*$)/
    let num
    
    if(indexRegex.test(input) == false) {
      num = '1'
    } else {
      indexRegex.lastIndex = 0
      let allMatches = [...input.matchAll(indexRegex)]
      let endsAt = allMatches[allMatches.length - 1].index
      num = input.substring(0, endsAt + 1)
    }
    

    if(numRegex.test(num)){
      num = eval(num)
      return num;
    }
    return 'invalid number'
  };
  
  this.getUnit = function(input) {
    let indexRegex = /[a-zA-Z]/g
    let unitRegex = /^kg$|^lbs$|^l$|^gal$|^km$|^mi$/
    let unit
    if(indexRegex.test(input) == false) {
      unit = 'invalid unit'
      return unit
    } else {
      indexRegex.lastIndex = 0
      let allMatches = [...input.matchAll(indexRegex)]
      let startsAt = allMatches[0].index
      unit = input.substring(startsAt).toLowerCase()
    }
    if(unitRegex.test(unit)) {
      if(unit == 'l') {
        unit = 'L'
      }
      return unit
    }
    unit = 'invalid unit'
    return unit
  };
  
  this.getReturnUnit = function(initUnit) {
    if(initUnit === 'invalid unit') {
      return initUnit
    }
    let result
    initUnit = initUnit.toLowerCase()
    switch(initUnit) {
      case 'l':
        result = 'gal';
        break;
      case 'gal':
        result = 'L';
        break;
      case 'kg':
        result = 'lbs';
        break;
      case 'lbs':
        result = 'kg';
        break;
      case 'km':
        result = 'mi';
        break;
      case 'mi':
        result = 'km';
        break;
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    if(unit === 'invalid unit') {
      return unit
    }
    
    unit = unit.toLowerCase()
    switch(unit) {
      case 'l':
        result = 'liters';
        break;
      case 'gal':
        result = 'gallons';
        break;
      case 'kg':
        result = 'kilograms';
        break;
      case 'lbs':
        result = 'pounds';
        break;
      case 'km':
        result = 'kilometers';
        break;
      case 'mi':
        result = 'miles';
        break;
    } 
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    if(initUnit === 'invalid unit') {
      return initUnit
    } else if(initNum === 'invalid number') {
      return initNum
    }
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result

    initUnit = initUnit.toLowerCase()
    switch(initUnit) {
      case 'l':
        result = initNum / galToL;
        break;
      case 'gal':
        result = initNum * galToL
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
    }
    result = Number(result.toFixed(5))
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    if(initUnit === 'invalid unit') {
      return initUnit
    } else if(initNum === 'invalid number') {
      return initNum
    }
    let result;

    result = initNum.toString() + ' ' + this.spellOutUnit(initUnit) + ' converts to ' + returnNum.toString() + ' ' + this.spellOutUnit(returnUnit)

    return result;
  };
}

module.exports = ConvertHandler;
