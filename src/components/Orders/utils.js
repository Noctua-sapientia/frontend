import { Badge} from 'react-bootstrap';
import React from 'react';

function parseDate(dateTime){
    var date = dateTime.split('T')[0];
    return date;
  }

function calculateOrderPayment(order){

  var shippingCost = order.shippingCost;
  var subtotal = 0;

  order.books.forEach(book => {
    subtotal += book.price * book.units;
  });

  return {
    shippingCost: shippingCost,
    subtotal: subtotal, 
    payment: subtotal + shippingCost
  };
}

function getBadgeStatus(status){

  return(
    <Badge bg={chooseBadgeType(status).bg} text={chooseBadgeType(status).text}>
      {status}
    </Badge>
  );

}


function chooseBadgeType(status){

    var badgeType = '';
    switch(status){
      case 'In preparation':
        badgeType = {bg: 'warning', text: 'dark'};
        break;
      case 'Sent':
        badgeType = {bg: 'primary', text: 'light'};
        break;
      case 'Delivered':
        badgeType = {bg: 'success', text: 'light'};
        break;
      case 'Cancelled':
        badgeType = {bg: 'danger', text: 'light'};
        break;
      default:
        badgeType ={bg: 'light', text: 'dark'};
        break;
    }
    return badgeType;
  }


export { parseDate, getBadgeStatus, calculateOrderPayment };
