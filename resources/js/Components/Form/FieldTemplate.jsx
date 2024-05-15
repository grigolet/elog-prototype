import classNames from "classnames";

function FieldTemplate(props) {
    const { id, style, label, help, required, description, errors, children } =
        props;

    const classes = classNames("py-2", props.classNames);

    return (
        <div className={classes} style={style}>
            <label
                className="mb-1 block text-sm font-medium text-gray-700"
                htmlFor={id}
            >
                {label}
                {required ? "*" : null}
            </label>
            {description}
            {children}
            {errors}
            {help}
        </div>
    );
}

export default FieldTemplate;
