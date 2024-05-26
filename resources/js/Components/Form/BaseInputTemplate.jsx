import { getInputProps } from "@rjsf/utils";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";

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
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        label={label}
        type="email"
        value={value}
        placeholder={placeholder}
        onChange={onChangeOverride || onTextChange}
        onBlur={onTextBlur}
        onFocus={onTextFocus}
        {...inputProps}
      />
      {errors}
    </div>
  );
}

export default BaseInputTemplate;
