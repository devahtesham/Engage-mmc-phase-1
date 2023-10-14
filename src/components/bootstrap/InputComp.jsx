import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

function InputComp(props) {
    const {label,type,placeholder,controlId,value,name,onChange,required,id} = props
  return (
    <>
      <FloatingLabel
        label={label}
        className="mb-4"
      >
        <Form.Control type={type} placeholder={placeholder} value={value} name={name} onChange={onChange} required={required ? true : false} id={id ? id : ''}/>
      </FloatingLabel>
    </>
  );
}

export default InputComp;