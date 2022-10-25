
import React from "react";
import CurrencyInput from "react-currency-input-field";

const CurrencyInputCustom = ({ forwardedRef, onChange, ...props }) => {
  return (
    <CurrencyInput
      {...props}
      intlConfig={{
        locale: "es-AR",
        currency: "",
      }}
      ref={forwardedRef}
      onValueChange={(value, name) =>
        onChange({
          target: { value, name },
        })
      }
    />
  );
};
export default React.forwardRef((props, ref) => (
  <CurrencyInputCustom {...props} forwardedRef={ref} />
));
