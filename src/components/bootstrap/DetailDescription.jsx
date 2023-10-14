import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

function DetailDescription(props) {
    const { controlId, label, placeholder, className,name,onChange , value } = props
    return (
        <>
            <FloatingLabel controlId={controlId} label={label}>
                <Form.Control
                    as="textarea"
                    placeholder={placeholder}
                    className={className}
                    name={name}
                    onChange={onChange}
                    value={value}
                />
            </FloatingLabel>
        </>
    );
}

export default DetailDescription;