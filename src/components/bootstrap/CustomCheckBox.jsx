import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const CustomCheckBox = (props) => {
  return (
    <>
      <InputGroup>
        <InputGroup.Checkbox  
          aria-label="Checkbox for following text input" 
          value={props.value} 
          onChange={props.onChange}
          className="property-checkbox"
          ref={props.ref}
        />
        <Form.Control aria-label="Text input with checkbox" className='d-none' />
      </InputGroup>   </>
  );
}

export default CustomCheckBox