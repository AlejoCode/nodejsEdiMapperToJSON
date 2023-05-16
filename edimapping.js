
module.exports = function (edi) {
  let editArray = edi.split('~');

  const obj = {};

  // Function that gets the different segments of elements in the editArray that starts with a certain prefix
  const getSegmentsStartingWith = (prefix) => {
    return editArray
      .filter((segment) => segment.trim().startsWith(prefix))
      .map((segment) => segment.split('*'));
  };

  // Validate the transaction type
  let transactionType = getSegmentsStartingWith('ST')[0]?.[1] || null
  if (
    transactionType !== '204' &&
    transactionType !== '990' &&
    transactionType !== '214' &&
    transactionType !== '210'
  ) {
    // Send error because the transaction has a not allowd transactiopn type
    throw new Error('transaction type is different from 204, 990, 214, and 210');
  }

  // Create the properties in the response object that the transactions can have in case that doesnt exists null
  obj.shipmentId = getSegmentsStartingWith('B2')[0]?.[1] || null;
  obj.shipmentNumber = getSegmentsStartingWith('B2')[0]?.[2] || null;

  obj.transactionType = {
    transactionSet: getSegmentsStartingWith('ST')[0]?.[1] || null,
    controlNumber: getSegmentsStartingWith('ST')[0]?.[2] || null,
  };

  obj.shipFrom = {
    name: getSegmentsStartingWith('N1').find((s) => s[1] === 'SF')?.[2] || null,
    street: getSegmentsStartingWith('N3').find((s) => s[1] === 'SF')?.[2] || null,
    city: getSegmentsStartingWith('N4').find((s) => s[1] === 'SF')?.[2] || null,
    state: getSegmentsStartingWith('N4').find((s) => s[1] === 'SF')?.[3] || null,
    zip: getSegmentsStartingWith('N4').find((s) => s[1] === 'SF')?.[4] || null,
  };

  obj.shipTo = {
    name: getSegmentsStartingWith('N1').find((s) => s[1] === 'CN')?.[2] || null,
    street: getSegmentsStartingWith('N3').find((s) => s[1] === 'CN')?.[2] || null,
    city: getSegmentsStartingWith('N4').find((s) => s[1] === 'CN')?.[2] || null,
    state: getSegmentsStartingWith('N4').find((s) => s[1] === 'CN')?.[3] || null,
    zip: getSegmentsStartingWith('N4').find((s) => s[1] === 'CN')?.[4] || null,
  };

  obj.items = getSegmentsStartingWith('N1')
    .filter((s) => s[1] === 'SH')
    .map((s) => ({
      id: s[2] || null,
      qty: getSegmentsStartingWith('Q2').find((q) => q[1] === s[2])?.[2] || null,
  }));

  obj.stopoffName = getSegmentsStartingWith('S5')[0]?.[2] || null;
  obj.referenceNumber = getSegmentsStartingWith('G62')[0]?.[4] || null;
  obj.depotLocation = getSegmentsStartingWith('R4').find((s) => s[1] === 'I')?.[3] || null;
  obj.trailerNumber = getSegmentsStartingWith('AT7')[0]?.[3] || null;

  obj.orderNumber = getSegmentsStartingWith('B2')[0]?.[2] || null;
  obj.quantityShipped = getSegmentsStartingWith('MS1')[0]?.[2] || null;

  return obj;
};