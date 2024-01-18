import React from 'react';
import { useState } from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import './OrderDetails.css';

import { getBadgeStatus, parseDate, } from './utils';

import OrderDetailsInfo from './OrderDetailsInfo';
import OrderDetailsInfoEdit from './OrderDetailsInfoEdit';


function OrderDetailsInfoEditable(props){

  const [isEditing, setIsEditing] = useState(false);

  var orderInfoRender;

  function saveContact(order) {
    const result = props.onEdit(order);
    if (result) {
        setIsEditing(false);
    }
}

  if (props.isEditing) {
    orderInfoRender = <OrderDetailsInfoEdit order={props.order} onSave={saveContact}/>
  } 
  else {
    orderInfoRender = <OrderDetailsInfo order={props.order} onEdit={() => props.setIsEditing(true)}/>
  }
  

  return orderInfoRender;

}

export default OrderDetailsInfoEditable;