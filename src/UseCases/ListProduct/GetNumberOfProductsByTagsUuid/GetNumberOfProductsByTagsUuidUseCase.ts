import {
  IControllerGetListProducts,
  IControllerGetProductsByUuid,
} from "../../interface/IController";

export default class GetNumberOfProductsByTagsUuidUseCase {
  constructor(
    private getListProductsController: IControllerGetListProducts,
    private getProductsByUuid: IControllerGetProductsByUuid
  ) {}
  execute(tagUuid: string): number {
    const products = this.getListProductsController.handle();
    const productsCount = products?.filter((p) => {
      const product = this.getProductsByUuid.handle(p);
      if (product) return product.tag === tagUuid;
      return false;
    });

    return productsCount?.length ? productsCount?.length : 0;
  }
}
