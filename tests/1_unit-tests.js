/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  
  suite('Function convertHandler.getNum(input)', function() {
    
    test('Whole number input', function(done) {
      let input = '32L';
      assert.equal(convertHandler.getNum(input),32);
      done();
    });
    
    test('Decimal Input', function(done) {
      let input = '3.2l'
      assert.equal(convertHandler.getNum(input), 3.2)
      done();
    });
    
    test('Fractional Input', function(done) {
      let input = '1/3l'
      assert.equal(convertHandler.getNum(input), eval(1/3))
      done();
    });
    
    test('Fractional Input w/ Decimal', function(done) {
      let input = '5/4.3kg'
      assert.equal(convertHandler.getNum(input), eval(5/4.3))
      done();
    });
    
    test('Invalid Input (double fraction)', function(done) {
      let input = '3/4/5'
      assert.equal(convertHandler.getNum(input), 'invalid number')
      done();
    });
    
    test('No Numerical Input', function(done) {
      let input = 'lbs'
      assert.equal(convertHandler.getNum(input), 1)
      done();
    }); 
    
  });
  
  suite('Function convertHandler.getUnit(input)', function() {
    test('For Each Valid Unit Inputs', function(done) {
      let input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      input.forEach(function(ele) {
        if(ele.toLowerCase() != 'l') {
          assert.equal(convertHandler.getUnit(ele), ele.toLowerCase())
        } else{
          assert.equal(convertHandler.getUnit(ele), 'L')
        }
      });
      done();
    });
    
    test('Unknown Unit Input', function(done) {
      let input = ['invalidunit', 'KL', 'TT', '123']
      input.forEach(function(unit) {
        assert.equal(convertHandler.getUnit(unit), 'invalid unit')
      })
      done();
    });  
    
  });
  
  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      let input = ['gal','l','mi','km','lbs','kg'];
      let expect = ['L','gal','km','mi','kg','lbs'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
    
  });  
  
  suite('Function convertHandler.spellOutUnit(unit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      let input = ['gal', 'l', 'mi', 'km', 'lbs','kg']
      let expect = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms']
      input.forEach(function(unit, i) {
        assert.equal(convertHandler.spellOutUnit(unit), expect[i])
      })
      done();
    });
    
  });
  
  suite('Function convertHandler.convert(num, unit)', function() {
    
    test('Gal to L', function(done) {
      let input = [5, 'gal'];
      let expected = 18.9271;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('L to Gal', function(done) {
      let input = [5, 'l'];
      let expected = 1.32086;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1);
      done();
    });
    
    test('Mi to Km', function(done) {
      let input = [5, 'mi'];
      let expected = 8.04670;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1);
      done();
    });
    
    test('Km to Mi', function(done) {
      let input = [5, 'km'];
      let expected = 3.10686;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1);
      done();
    });
    
    test('Lbs to Kg', function(done) {
      let input = [5, 'lbs'];
      let expected = 2.26796;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1);
      done();
    });
    
    test('Kg to Lbs', function(done) {
      let input = [5, 'kg'];
      let expected = 11.02312;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1);
      done();
    });
  });
});