import Button from 'react-bootstrap/Button';

function ButtonComp(props) {
    const {variant,btnText,className,onClick} = props
  return (
    <>
      <Button variant={variant} className={className ? className : ""} onClick={onClick} >{btnText}</Button>
    </>
  );
}

export default ButtonComp;