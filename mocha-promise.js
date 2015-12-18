var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;

var calculate = function (value) {

  return new Promise(function (resolve, reject) {
    console.log("in calculate  : ", value);

    setTimeout(function () {
      if (value % 2 == 0) {
        resolve(value + 1);
      } else {
        reject(value + 1);
      }
    }, 500);
  });
};

var calculateModel = function (value, callback) {
  calculate(value)
    .then(function (result) {
      console.log("In model then : ", result);
      return callback(null, result);
    })
    .catch(function (result) {
      console.log("In model catch : ", result);
      return callback(result, null);
    });
};

/**
  Test Case 1 : send an Odd number in calculate, 
  Test Case 2 : send an Even number in calculate, 
  */
var chainMethod = function (value, callback) {

  calculate(value)
    .then(function (result) {
      console.log("Then  Here!!! ", result);
      return calculate(result);

    })
    .catch(function (result) {
      console.log("Catch  Here!!! ", result);
      return calculate(result + 1);

    })
    .then(function (result) {
      console.log("Finally!!! then  ", result);
      return callback(result);
    })
    .catch(function (result) {
      console.log("Finally!!! catch  ", result);
      return callback(result);
    });
};

var safeMethod = function (value, callback) {
  calculateModel(value, function (err, result) {
    console.log("[serivce]  safeMethod callback!!! ", err, result);
    if (err) {
      // calculateModel(value, function (err, result) {
      //   console.log("[serivce] 2 safeMethod callback!!! ", err, result);
      //   if (err) {
      //     console.log("ERR --> err : ", err);
      //     return callback(new Error("Level two error"));
      //   } else {
      //     console.log("ERROR --> result : ", result);
      //     return callback(null, result);
      //   }
      // });
      return callback(new Error("Level one error"));
    } else {
      // calculateModel(value, function (err, result) {
      //   console.log("[serivce] 2 safeMethod callback!!! ", err, result);
      //   if (err) {
      //     console.log("RESULT --> err : ", err);
      //     return callback(new Error("Level two error"));
      //   } else {
      //     console.log("RESULT --> result : ", result);
      //     return callback(null, result);
      //   }
      // });
      return callback(null, result);
    }
  });
  // .then(function (result) {
  //   console.log("Then  Here!!! ", result);
  //   return calculate(result);
  // }, function (result) {
  //   console.log("Catch  Here!!! ", result);
  //   return calculate(result + 1);
  // })
  // .then(function (result) {
  //   console.log("Finally!!! then  ", result);
  //   return callback(result);
  // }, function (result) {
  //   console.log("Finally!!! catch  ", result);
  //   return callback(result);
  // });
};


// Comment one and try one by one both the methods, to understand the working of promise flow.

describe('Promise Testing', function () {
  this.timeout(25000);
  describe('all parameters are correct for ', function () {

    it('Pre test expect', function (dn) {
      var value = new Error("Hello error");
      // expect(value).to.be.an("object");
      expect(value)
        .to.be.an("object");
      dn();
      // expect(value).to.contain("Hello error");
    });

    it('#chainMethod()', function (dn) {
      var value = 1;
      chainMethod(value, function (result) {
        console.log("1 In IT block : ", result);
        // expect(result).to.be.null;
        expect(result)
          .to.be.number;
        expect(result)
          .to.be.equal(4);
        dn();
      });
    });

    it('#safeMethod() ', function (dn) {
      var value = 1;
      safeMethod(value, function (result) {
        // try {
        console.log("2 In IT block : ", result);
        console.log("2 In IT block : ", typeof (result));
        expect(result)
          .to.be.an("object");
        // expect(result).to.throw(Error);
        // expect(result).to.be.
        dn();
        // } catch (err) {
        //   console.log("2 Catch In IT block : ", err);
        //   dn();
        // }
      });
    });

  });
});
