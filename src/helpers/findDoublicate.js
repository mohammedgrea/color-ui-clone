function findDoublicate(arr, color, name) {
  if (
    !colors.find((color) => color.colorName === colorName) &&
    colorName !== " "
  ) {
    if (!colors.find((color) => color.color === background)) {
      setCheckDoubleColor((CheckDoubleColor) => (CheckDoubleColor = true));
      setError(false);
    } else return alert("change color");
  } else return setError(true);
}
