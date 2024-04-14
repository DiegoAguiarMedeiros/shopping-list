import DeleteListByUuidUseCase from "./DeleteListByUuidUseCase";

export default class DeleteListByUuidController {
  constructor(private DeleteListByUuidUseCase: DeleteListByUuidUseCase) {}

  handle = (uuid: string): void => {
    try {
      this.DeleteListByUuidUseCase.execute(uuid);
    } catch (err) {
      console.error("DeleteListByUuidController: ", err);
    }
  };
}
