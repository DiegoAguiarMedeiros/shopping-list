import { ITagInterface } from "../../../Model/ITag";
import DeleteTagByUuidUseCase from "./DeleteTagByUuidUseCase";

export default class DeleteTagByUuidController {
  constructor(private DeleteTagByUuidUseCase: DeleteTagByUuidUseCase) { }

  handle = (uuid: string): void => {
    try {
      this.DeleteTagByUuidUseCase.execute(uuid);
    } catch (err) {
      console.error("DeleteTagByUuidController: ", err);
    }
  };
}
