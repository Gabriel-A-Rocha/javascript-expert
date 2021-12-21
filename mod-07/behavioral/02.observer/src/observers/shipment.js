export default class Shipment {
  update({ id, userName }) {
    console.log(`[${id}]: [shipment] will ship the order to [${userName}]`);
  }
}
