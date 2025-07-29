"use client";

const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  id,
  disabled = false,
  className = "",
  error = false,
  ...props
}) => {
  const baseClasses =
    "block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed";

  const errorClasses = error
    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
    : "border-gray-300";

  const classes = `${baseClasses} ${errorClasses} ${className}`;

  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={classes}
      {...props}
    />
  );
};

export default Input;
