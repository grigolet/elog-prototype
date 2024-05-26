import classNames from "classnames";

function FieldTemplate(props) {
  const { id, style, label, help, required, description, errors, children } =
    props;

  const classes = classNames("py-2", props.classNames);

  const htmlLabel = id !== "root" && (
    <label
      className="mb-1 block text-sm font-medium text-gray-700"
      htmlFor={id}
    >
      {label}
      {required ? "*" : null}
    </label>
  );

  return (
    <div className={classes} style={style}>
      {htmlLabel}
      {description}
      {children}
      {errors}
      {help}
    </div>
  );
}

export default FieldTemplate;
