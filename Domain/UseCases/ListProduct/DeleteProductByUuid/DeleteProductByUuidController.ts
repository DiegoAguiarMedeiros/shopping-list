import { ITagInterface } from "../../../Model/ITag";
import DeleteProductByUuidUseCase from "./DeleteProductByUuidUseCase";

export default class DeleteTagByUuidController {
  constructor(private deleteProductByUuidUseCase: DeleteProductByUuidUseCase) { }

  handle = (uuid: string): void => {
    try {
      this.deleteProductByUuidUseCase.execute(uuid);
    } catch (err) {
      console.error("DeleteTagByUuidController: ", err);
    }
  };
}
