var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var Promise = require('bluebird');

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
      return callback(new Error("hello error!"), result);
    })
    .done();
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
      // return calculate(result + 1);
      throw new Error("chainMethod New error");
    })
    .then(function (result) {
      console.log("Finally!!! then  ", result);
      return callback(result);
    })
    .catch(function (result) {
      console.log("Finally!!! catch  ", result);
      return callback(result);
    })
    .done();
};

var safeMethod = function (value, callback) {
  calculateModel(value, function (err, result) {
    console.log("[serivce]  safeMethod callback!!! ", err, result);
    if (err) {
      calculateModel(value, function (err, result) {
        console.log("[serivce] 2 safeMethod callback!!! ", err, result);
        if (err) {
          console.log("ERR --> err : ", err);
          return callback(new Error("Level two error"));
        } else {
          console.log("ERROR --> result : ", result);
          return callback(null, result);
        }
      });
      // return callback(err);
    } else {
      calculateModel(value, function (err, result) {
        console.log("[serivce] 2 safeMethod callback!!! ", err, result);
        if (err) {
          console.log("RESULT --> err : ", err);
          return callback(new Error("Level two error"));
        } else {
          console.log("RESULT --> result : ", result);
          return callback(null, result);
        }
      });
      // return callback(null, result);
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
// safeMethod();
// chainMethod();


describe('Promise Testing', function () {
  this.timeout(5000);
  describe('all parameters are correct for ', function () {

    it('Pre test expect', function (dn) {
      // var value = new Error("Hello error");
      var value = 5;
      // expect(value).to.be.an("object");
      expect(value)
        .to.be.equal(5);
      dn();
      // expect(value).to.contain("Hello error");
    });

    it('Test promise calculate()', function (dn) {
      var value = 5;
      calculate(value)
        .then(function (result) {
          console.log("THEN Here : ", result);
          expect(result)
            .to.be.equal(5);
          // dn();
        })
        .catch(function (err) {
          console.log("CATCH  Here : ", err);
          expect(err)
            .to.be.equal(6);
          // dn();
        })
        .then(dn, dn);

    });

    // it('Test promise calculateModel()', function (dn) {
    //   var value = 5;
    //   calculateModel(value)
    //     .then(function (result) {
    //       console.log("THEN Here : ", result);
    //       expect(result)
    //         .to.be.equal(5);
    //         // dn();
    //     })
    //     .catch(function (err) {
    //       console.log("CATCH  Here : ", err);
    //       expect(err)
    //         .to.be.equal(4);
    //         // dn();
    //     })
    //     .then(dn, dn);

    // });

    // it('#chainMethod()', function (dn) {
    //   var value = 1;
    //   chainMethod(value, function (result) {
    //     console.log("1 In IT block : ", result);
    //     // expect(result).to.be.null;
    //     expect(result)
    //       .to.be.number;
    //     expect(result)
    //       .to.be.equal(4);
    //     dn();
    //   });
    // });

    it('#safeMethod() ', function (dn) {
      var value = 1;
      safeMethod(value, function (err, result) {
        // try {
          console.log("2 In IT block : ", err, result);
          console.log("2 In IT block : ", typeof (result));


          expect(err)
            .to.be.object;
          // expect(result).to.be.equal(5);
          // expect(err)
          //   .to.be.an('object');  
          // expect(result).to.throw(Error);
          // expect(result).to.be.
          dn();
        // } catch (err) {
        //   console.log("2 Catch In IT block : ", err);
        //   dn(err);
        // }
      });
      // .then(dn, dn);
    });

    it('Post test expect', function (dn) {
      // var value = new Error("Hello error");
      var value = 5;
      // expect(value).to.be.an("object");
      expect(value)
        .to.be.equal(5);
      dn();
      // expect(value).to.contain("Hello error");
    });

  });
});
