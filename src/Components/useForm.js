import React, { useState, useEffect } from "react";
const useForm = (intialfieldvalues, validate, setCurrentId) => {
  const [values, setvalues] = useState(intialfieldvalues);
  const [errors, seterrors] = useState({});
  const handleInputchange = (e) => {
    const { name, value } = e.target;
    const fieldvalues = { [name]: value };
    setvalues({
      ...values,
      ...fieldvalues,
    });
    validate(fieldvalues);
  };
  const resetForm = () => {
    setvalues({
      ...intialfieldvalues,
    });
    seterrors({});
    setCurrentId(0);
  };
  return {
    values,
    errors,
    seterrors,
    setvalues,
    handleInputchange,
    resetForm,
  };
};
export default useForm;
