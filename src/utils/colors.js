const getColorArray = (num) => {
  let result = [];
  for (var i = 0; i < num; i += 1) {
    var letters = "0123456789ABCDEF".split("");
    var color = "#";
    for (var j = 0; j < 6; j += 1) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    result.push(color);
  }
  return result;
};

export const hexToRgb = (hex) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `rgba(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(
        result[3],
        16
      )},0.3)`
    : null;
};

export const colors = getColorArray(50);

export default getColorArray;
