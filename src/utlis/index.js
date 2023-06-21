export const formatCurrency = (value) => {
  return value
    ? value.toLocaleString("en-US", {
        style: "currency",
        currency: "INR",
      })
    : value;
};

export const FormDataGeneratorFun = (obj) => {
  if (obj) {
    const formData = new FormData();
    for (let i in obj) {
      if (obj[i] && i !== "id") {
        if (obj[i] && i === "image") {
          formData.append(i, obj[i], obj[i].name);
        } else {
          formData.append(i, obj[i]);
        }
      }
    }
    return formData;
  }
};
