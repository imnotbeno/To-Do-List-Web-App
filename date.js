exports.getDate = getDate;
exports.getDay = getDay;

function getDate() {
  //Options for the date
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  // New instance of the class Date
  var date = new Date();

  // function to get the date in english with specific options
  return date.toLocaleDateString("en-UK", options);
}

function getDay() {
  //Options for the date
  var options = {
    weekday: "long",
  };

  // New instance of the class Date
  var date = new Date();

  // function to get the date in english with specific options
  return date.toLocaleDateString("en-UK", options);
}
