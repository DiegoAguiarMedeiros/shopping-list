import { IProduct } from "../../../Model/IProduct";
import { IControllerGetListProductsByUuid } from "../../interface/IController";
import GetListProductUseCase from "./GetListProductByUuidUseCase";

export default class GetListProductController implements IControllerGetListProductsByUuid {
  constructor(private GetListProductUseCase: GetListProductUseCase) { }

  handle = (productsUuid: string[]): IProduct[] => {
    try {
      const result: IProduct[] = []

      productsUuid.forEach(item => {
        const resultProduct = this.GetListProductUseCase.execute(item)
        if (resultProduct) {
          result.push(resultProduct);
        }
      })

      return result;
    } catch (err) {
      console.error("GetListProductController: ", err);
      const result: IProduct[] = []
      return result;
    }
  };
}
