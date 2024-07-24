const response=async( code, values, responseCode) =>{
    console.log(code,values,"response file")
    if (code == 0) {
      var response = {
        code: code,
        status: "success",
        data: values
      };
    } else if (code == 1) {
      var response = {
        code: code,
        status: "fail",
        message: values
      };
    } else if (code == 3) {
      var response = {
        code: code,
        status: "success",
        message: values
      };
    } else {
      var response = {
        code: code,
        status: "error",
        message: values
      };
    }
    return new Response({ ...response });
  };

  module.exports = {
    response
  }