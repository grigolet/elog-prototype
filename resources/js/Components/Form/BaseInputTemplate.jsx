import { getInputProps } from "@rjsf/utils";

function BaseInputTemplate(props) {
    const {
        schema,
        id,
        options,
        label,
        value,
        type,
        placeholder,
        required,
        disabled,
        readonly,
        autofocus,
        onChange,
        onChangeOverride,
        onBlur,
        onFocus,
        rawErrors,
        hideError,
        uiSchema,
        registry,
        formContext,
        hideLabel,
        ...rest
    } = props;
    const onTextChange = ({ target: { value: val } }) => {
        // Use the options.emptyValue if it is specified and newVal is also an empty string
        onChange(val === "" ? options.emptyValue || "" : val);
    };
    const onTextBlur = ({ target: { value: val } }) => onBlur(id, val);
    const onTextFocus = ({ target: { value: val } }) => onFocus(id, val);

    const inputProps = { ...rest, ...getInputProps(schema, type, options) };
    const hasError =
        rawErrors !== undefined && rawErrors.length > 0 && !hideError;

    const errors = hasError
        ? rawErrors.map((error, index) => (
              <p key={error + index} className="mt-1 text-sm text-red-500">
                  {error}
              </p>
          ))
        : null;

    return (
        <div className="mx-auto max-w-xs">
            <div>
                <label
                    htmlFor={id}
                    className="mb-1 block text-sm font-medium text-gray-700"
                >
                    {label}
                </label>
                <input
                    id={id}
                    label={label}
                    type="email"
                    value={value}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                    placeholder={placeholder}
                    onChange={onChangeOverride || onTextChange}
                    onBlur={onTextBlur}
                    onFocus={onTextFocus}
                    {...inputProps}
                />
                {errors}
            </div>
        </div>
    );
}

export default BaseInputTemplate;
