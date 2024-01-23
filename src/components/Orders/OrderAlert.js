import React from 'react';

import { Alert, Button } from 'react-bootstrap';
import './OrderDetails.css';

function OrderAlert(props) {

  if (props.message == null) {
    return null;
  }

  return (
    <Alert variant="warning" className="col-9 text-center alert-dismissible">
        {props.message}
        <Button variant="close" aria-label="Close" onClick={props.onClick}> </Button>
    </Alert>
  );

}

export default OrderAlert;