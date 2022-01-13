export const MaskedInput = (props: any) => {
  const handleChange = (e: any) => {
    const value = handleCurrentValue(e);
    const validatedValue = validateProgress(e, value);
    const newMaskedInputValues = [...props.maskedInputValues];
    newMaskedInputValues.splice(props.index, 0, validatedValue);
    const maskValue = setValueOfMask(e);
    props.setMaskedInputValues(newMaskedInputValues);
    const targetEl = document.getElementById(props.id + 'Mask');
    if (targetEl) targetEl.innerHTML = maskValue;
  };

  const handleCurrentValue = (e: any) => {
    const isCharsetPresent = e.target.getAttribute('data-charset');
    const maskedNumber = 'XMDY';
    const maskedLetter = '_';
    const placeholder =
      isCharsetPresent || e.target.getAttribute('data-placeholder');
    let value = e.target.value;
    const l = placeholder.length;
    let newValue = value;
    // strip special characters
    const strippedValue = isCharsetPresent
      ? value.replace(/\W/g, '')
      : value.replace(/\D/g, '');
    for (let i = 0, j = 0; i < l; i++) {
      const isInt = !isNaN(parseInt(strippedValue[j]));
      const isLetter = strippedValue[j]
        ? strippedValue[j].match(/[A-Z]/i)
        : false;
      const matchesNumber = maskedNumber.indexOf(placeholder[i]) >= 0;
      const matchesLetter = maskedLetter.indexOf(placeholder[i]) >= 0;
      if (
        (matchesNumber && isInt) ||
        (isCharsetPresent && matchesLetter && isLetter)
      ) {
        newValue += strippedValue[j++];
      } else if (
        (!isCharsetPresent && !isInt && matchesNumber) ||
        (isCharsetPresent &&
          ((matchesLetter && !isLetter) || (matchesNumber && !isInt)))
      ) {
        //options.onError( e ); // write your own error handling function
        return newValue;
      } else {
        newValue += placeholder[i];
        console.log(newValue);
      }
      // break if no characters left and the pattern is non-special character
      if (strippedValue[j] == undefined) {
        return (newValue += placeholder[i]);
      }
    }

    if (props['data-valid-example']) {
      return validateProgress(e, newValue);
    }

    return newValue;
  };

  const setValueOfMask = (e: any) => {
    var value = e.target.value,
      placeholder = e.target.getAttribute('data-placeholder');

    return '<i>' + value + '</i>' + placeholder.substr(value.length);
  };

  const validateProgress = (e: any, value: any) => {
    const validExample = props['data-valid-example'];
    const pattern = new RegExp(props.pattern);
    const l = value.length;

    for (let i = l; i >= 0; i--) {
      const testValue = value + validExample.substr(value.length);
      if (pattern.test(testValue)) {
        return value;
      } else {
        value = value.substr(0, value.length - 1);
      }
    }

    return value;
  };

  const handleBlur = (e: any) => {
    var currValue = e.target.value,
      pattern;

    if (currValue.length == 0) {
      if (e.target.required) {
        updateLabelClass(e, 'required', true);
        handleError(e, 'required');
      }
    } else {
      pattern = new RegExp('^' + props.pattern + '$');

      if (pattern.test(currValue)) {
        updateLabelClass(e, 'good', true);
      } else {
        updateLabelClass(e, 'error', true);
        handleError(e, 'invalidValue');
      }
    }
  };

  const handleFocus = (e: any) => {
    updateLabelClass(e, 'focus', false);
  };

  const updateLabelClass = (
    e: any,
    className: any,
    replaceExistingClass: any
  ) => {
    var parentLI = e.target.parentNode.parentNode,
      pastClasses = ['error', 'required', 'focus', 'good'],
      i;

    if (replaceExistingClass) {
      for (i = 0; i < pastClasses.length; i++) {
        parentLI.classList.remove(pastClasses[i]);
      }
    }

    parentLI.classList.add(className);
  };

  const handleError = (e: any, errorMsg: any) => {
    return true;
  };

  return (
    <span className="maskShell">
      <span aria-hidden="true" id={props.index + 'Mask'}>
        {props.placeholder}
      </span>
      <input
        id={props.index.toString()}
        value={props.maskedInputValues[props.index]}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        name={props.index.toString()}
        className={props.className}
        data-placeholder={props.placeholder}
        data-pattern={props.pattern}
        aria-required={props.required}
        required={props.required}
      />
    </span>
  );
};
