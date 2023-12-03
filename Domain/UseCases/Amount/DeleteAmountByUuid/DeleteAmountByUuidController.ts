import DeleteAmountByUuidUseCase from "./DeleteAmountByUuidUseCase";

export default class DeleteAmountByUuidController {
    constructor(private deleteAmountByUuidUseCase: DeleteAmountByUuidUseCase) { }
    handle(key: string) {
        this.deleteAmountByUuidUseCase.execute(key);
    }
}