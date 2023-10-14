import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { ListingImg } from '../../data';
import { Link } from 'react-router-dom';
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useContext } from 'react';
import { PropertyContext } from '../../context/PropertyContext';

function CardComp(props) {
    const { ReferenceNo, PropertyCardFeatures, Id } = props.item
    
    return (
        <Card style={{ width: '18rem' }} className='c-pointer'>
            <Card.Img variant="top" src={ListingImg} />
            <Card.Body className='pb-0'>
                <Card.Title className='mb-4'>{ReferenceNo}</Card.Title>
                <Card.Text>
                    <ul className='m-0 list-unstyled'>
                        {
                            PropertyCardFeatures.map((item, index) => (
                                <li key={index} className='d-flex justify-content-between align-items-center mb-3'>
                                    <span className='fw-700 me-4'>{item.Label}</span> <span>{item.Value}</span>
                                </li>
                            ))
                        }
                    </ul>
                </Card.Text>
            </Card.Body>
            <div className="card-footer-container">
                <div className='d-flex justify-content-between align-items-center'>
                    <div className='edit-delete-btn-parent'>
                        <button id='edit-btn' className='edit-btn' type='button'>

                            <span className='' >
                                <Link to={`/home/editDetails/${Id}`}>
                                    <MdModeEditOutline size={25} />
                                </Link>
                            </span>
                        </button>

                        <button id='delete-btn' className='delete-btn' type='button'>
                            <span>
                                <MdDelete size={25} onClick={props.onDeleteBtn} />
                            </span>
                        </button>
                    </div>
                    <Link to={`/home/displayDetails/${Id}`} className='text-white fw-700 fs-14'>More Detail</Link>
                </div>
            </div>
        </Card>
    );
}

export default CardComp;