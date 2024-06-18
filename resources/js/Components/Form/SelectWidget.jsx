import { useCallback } from "react";
import {
  ariaDescribedByIds,
  enumOptionsIndexForValue,
  enumOptionsValueForIndex,
} from "@rjsf/utils";

function getValue(event, multiple) {
  if (multiple) {
    return Array.from(event.target.options)
      .slice()
      .filter((o) => o.selected)
      .map((o) => o.value);
  }
  return event.target.value;
}

/** The `SelectWidget` is a widget for rendering dropdowns.
 *  It is typically used with string properties constrained with enum options.
 *
 * @param props - The `WidgetProps` for this component
 */
function SelectWidget({
  schema,
  id,
  options,
  value,
  required,
  disabled,
  readonly,
  multiple = false,
  autofocus = false,
  onChange,
  onBlur,
  onFocus,
  placeholder,
}) {
  const { enumOptions, enumDisabled, emptyValue: optEmptyVal } = options;
  const emptyValue = multiple ? [] : "";

  const handleFocus = useCallback(
    (event) => {
      const newValue = getValue(event, multiple);
      return onFocus(
        id,
        enumOptionsValueForIndex(newValue, enumOptions, optEmptyVal)
      );
    },
    [onFocus, id, schema, multiple, options]
  );

  const handleBlur = useCallback(
    (event) => {
      const newValue = getValue(event, multiple);
      return onBlur(
        id,
        enumOptionsValueForIndex(newValue, enumOptions, optEmptyVal)
      );
    },
    [onBlur, id, schema, multiple, options]
  );

  const handleChange = useCallback(
    (event) => {
      const newValue = getValue(event, multiple);
      return onChange(
        enumOptionsValueForIndex(newValue, enumOptions, optEmptyVal)
      );
    },
    [onChange, schema, multiple, options]
  );

  const selectedIndexes = enumOptionsIndexForValue(
    value,
    enumOptions,
    multiple
  );

  return (
    <select
      id={id}
      name={id}
      multiple={multiple}
      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      value={
        typeof selectedIndexes === "undefined" ? emptyValue : selectedIndexes
      }
      required={required}
      disabled={disabled || readonly}
      autoFocus={autofocus}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onChange={handleChange}
      aria-describedby={ariaDescribedByIds(id)}
    >
      {!multiple && schema.default === undefined && (
        <option value="">{placeholder}</option>
      )}
      {Array.isArray(enumOptions) &&
        enumOptions.map(({ value, label }, i) => {
          const disabled = enumDisabled && enumDisabled.indexOf(value) !== -1;
          return (
            <option key={i} value={String(i)} disabled={disabled}>
              {label}
            </option>
          );
        })}
    </select>
  );
}

export default SelectWidget;
