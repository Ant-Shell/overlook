import { expect } from 'chai';
import Customer from '../src/classes/Customer';

let customer;
let customerData;

describe('Customer', () => {
  beforeEach(function() {
    customerData =
    {
      "id": 1,
      "name": "Leatha Ullrich"
    },

    customer = new Customer(customerData);
  });

  it('should be a function', function() {
    expect(Customer).to.be.a('function');
  })

  it('should be an instance of ingredient', function() {
    expect(customer).to.be.an.instanceOf(Customer);
  })

  it('should have an id of an ingredient', function() {
    expect(customer.id).to.deep.equal(1)
  });

  it('should have an ingredient name', function() {
    expect(customer.name).to.deep.equal("Leatha Ullrich")
  });

  it.skip('should have an ingredient estimatedCostInCents', function() {
    expect(customer.estimatedCostInCents).to.deep.equal(142)
  });
});