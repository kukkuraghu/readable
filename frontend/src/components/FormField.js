import React  from 'react';

/**
**FormField component renders a form field.
**  Props
**      fieldType - Identifies the form field type.
**                  Default is input.
**      label - label for the form field.
**      id - id for the the form field.
**      name - name for the the form field.
**      value - initial value for the the form field.
**      options - used in select input type.
**      placeholder - placeholder string
**      handleFieldChange - the function to be called when the field value changes
**      disabled - boolean - a true value sets the disabled flag. Optional
**/
function FormField(props) {
    let fieldTag;
    switch(props.fieldType) {
        case 'textarea': fieldTag = (
                <div className="col-sm-8">
                    <textarea  className="form-control" id={props.id}  placeholder={props.placeholder} name={props.name} value={props.value} onChange={props.handleFieldChange} disabled={props.disabled}/>
                </div>
            );
            break;
        case 'select': fieldTag = (
                <div className="col-sm-8">
                    <select  className="form-control" id={props.id}  placeholder={props.placeholder} name={props.name} value={props.value} onChange={props.handleFieldChange} disabled={props.disabled}>
                        {props.options}
                    </select>
                </div>
            );
            break;
        default: fieldTag = (
                <div className="col-sm-8">
                    <input  className="form-control" id={props.id}  placeholder={props.placeholder} name={props.name} value={props.value} onChange={props.handleFieldChange} disabled={props.disabled}/>
                </div>
            );
            break;
    }
    return (
        <div className="form-group row">
            <label htmlFor={props.id} className="col-sm-2 col-form-label">
                {props.label}
            </label>
            {fieldTag}
        </div>
    );
}

export default FormField;