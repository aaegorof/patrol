import React, { useRef, useState, useEffect } from "react";

const Input = ({
  value = "",
  disabled = false,
  text,
  onChange,
  placeholder,
  icon,
  type,
  name = placeholder,
  validator = false,
  className,
  ...props
}) => {
  const innerRef = useRef();
  const [initPlaceholder, setInitPlaceholder] = useState(placeholder);

  useEffect(() => {
    setInitPlaceholder(placeholder);
  }, [placeholder]);

  // eslint-disable-next-line no-underscore-dangle
  const _onChange = e => {
    const validated =
      (validator && validator(e.target.value)) || e.target.value === "";
    if (validator && !validated) {
      return false;
    }
    onChange(e.target.value);
  };
  const onClear = () => onChange("");


  return (
    <div className={`input-wrap ${className}`} {...props}>
      {text && <div className="input-text">{text}</div>}
      <input
        name={name}
        value={value}
        disabled={disabled}
        onChange={_onChange}
        onFocus={() => setInitPlaceholder("")}
        onBlur={() => setInitPlaceholder(placeholder)}
        ref={innerRef}
        placeholder={initPlaceholder}
        type={type || "text"}
      />
      {value && (
        <button className="clear" onClick={onClear}>
          x
        </button>
      )}
    </div>
  );
};

export default Input;
