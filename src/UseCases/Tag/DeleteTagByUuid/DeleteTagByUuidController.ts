import DeleteTagByUuidUseCase from "./DeleteTagByUuidUseCase";

export default class DeleteTagByUuidController {
  constructor(private deleteTagByUuidUseCase: DeleteTagByUuidUseCase) {}

  handle = (uuid: string): void => {
    try {
      this.deleteTagByUuidUseCase.execute(uuid);
    } catch (err) {
      console.error("DeleteTagByUuidController: ", err);
    }
  };
}
