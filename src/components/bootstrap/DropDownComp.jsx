import Form from 'react-bootstrap/Form';

function DropDownComp(props) {
    const {onChange,name,options,className,value} = props
  
  return (
    <>
        <Form.Select value={value} aria-label="Default select example" className={className ? className :" "} onChange={onChange} name={name}>
            {
                options.map((option,index)=>(
                    <option key={index} value={option}>{option}</option>
                ))
            } 
        </Form.Select>
    </>
  );
}

export default DropDownComp;