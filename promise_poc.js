var calculate = function (value) {

  return new Promise(function (resolve, reject) {
    console.log("in calculate  : ", value);

    setTimeout(function () {
      if (value % 2 == 0) {
        resolve(value + 1);
      } else {
        reject(value + 1);
      }
    }, 1000);
  });
};

/**
  Test Case 1 : send an Odd number in calculate, 
  Test Case 2 : send an Even number in calculate, 
  */
function chainMethod() {

  calculate(2)
    .then(function (result) {
      console.log("Then  Here!!! ", result);
      return calculate(result);

      console.log("Never reach here  Then-2  Here!!! ", result);
    })
    .catch(function (result) {
      console.log("Catch  Here!!! ", result);
      return calculate(result + 1);

      console.log(" Never reach here  Catch-2  Here!!! ", result);
    })
    .then(function (result) {
      console.log("Finally!!! then  ", result);
    })
    .catch(function (result) {
      console.log("Finally!!! catch  ", result);
    });
}

function safeMethod() {
  calculate(1)
    .then(function (result) {
      console.log("Then  Here!!! ", result);
      return calculate(result);
    }, function (result) {
      console.log("Catch  Here!!! ", result);
      return calculate(result + 1);
    })
    .then(function (result) {
      console.log("Finally!!! then  ", result);
    }, function (result) {
      console.log("Finally!!! catch  ", result);
    });
}


// Comment one and try one by one both the methods, to understand the working of promise flow.
safeMethod();
// chainMethod();