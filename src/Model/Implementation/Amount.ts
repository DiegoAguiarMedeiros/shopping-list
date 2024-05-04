import IAmount from "../IAmount";

class Amount implements IAmount {
  uuid: string;
  amount: string;
  type: boolean;
  quantity: string;

  constructor(uuid: string, amount: string, quantity: string, type: boolean) {
    this.uuid = uuid;
    this.amount = amount;
    this.quantity = quantity;
    this.type = type;
  }
}

export default Amount;
