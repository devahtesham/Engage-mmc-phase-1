import Form from 'react-bootstrap/Form';

function CheckBoxComp(props) {
    const {className,id,label} = props
  return (
    <div className={className ? className : ""}>
        <Form.Check
        id={id}
        label={label}
        />
    </div>
  );
}

export default CheckBoxComp;