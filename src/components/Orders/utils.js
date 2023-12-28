function parseDate(dateTime){
    var date = dateTime.split('T')[0];
    return date;
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


export { parseDate };
export { chooseBadgeType };
