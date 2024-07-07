import RemoveListByUuidUseCase from "./RemoveListByUuidUseCase";
import RemoveListByUuidController from "./RemoveListByUuidController";
import {
  IControllerGetLists,
  IControllerSaveList,
} from "../../interface/IController";

describe("RemoveListByUuidUseCase", () => {
  let mockGetLists: IControllerGetLists;
  let mockSaveLists: IControllerSaveList;
  let removeListByUuidUseCase: RemoveListByUuidUseCase;

  beforeEach(() => {
    mockGetLists = {
      handle: jest.fn(),
    };

    mockSaveLists = {
      handle: jest.fn(),
    };

    removeListByUuidUseCase = new RemoveListByUuidUseCase(
      mockGetLists,
      mockSaveLists
    );
  });

  it("should remove the list with the specified UUID", () => {
    const listUuid = "123e4567-e89b-12d3-a456-426614174000";
    const lists = [
      "123e4567-e89b-12d3-a456-426614174000",
      "existing-uuid1",
      "existing-uuid2",
    ];
    mockGetLists.handle = jest.fn(() => lists);

    removeListByUuidUseCase.execute(listUuid);

    const expectedLists = ["existing-uuid1", "existing-uuid2"];
    expect(mockSaveLists.handle).toHaveBeenCalledWith(expectedLists);
  });

  it("should not change the list if the UUID is not found", () => {
    const listUuid = "non-existing-uuid";
    const lists = ["existing-uuid1", "existing-uuid2"];
    mockGetLists.handle = jest.fn(() => lists);

    removeListByUuidUseCase.execute(listUuid);

    expect(mockSaveLists.handle).toHaveBeenCalledWith(lists);
  });

  it("should handle errors gracefully", () => {
    const listUuid = "123e4567-e89b-12d3-a456-426614174000";
    const error = new Error("Test Error");
    mockGetLists.handle = jest.fn(() => {
      throw error;
    });

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    removeListByUuidUseCase.execute(listUuid);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "RemoveListByUuidUseCase: ",
      error
    );

    consoleErrorSpy.mockRestore();
  });
});

describe("RemoveListByUuidController", () => {
  let mockRemoveListByUuidUseCase: RemoveListByUuidUseCase;
  let removeListByUuidController: RemoveListByUuidController;

  beforeEach(() => {
    mockRemoveListByUuidUseCase = {
      execute: jest.fn(),
    } as unknown as RemoveListByUuidUseCase;

    removeListByUuidController = new RemoveListByUuidController(
      mockRemoveListByUuidUseCase
    );
  });

  it("should call execute method of RemoveListByUuidUseCase with correct parameters", () => {
    const listUuid = "123e4567-e89b-12d3-a456-426614174000";

    removeListByUuidController.handle(listUuid);

    expect(mockRemoveListByUuidUseCase.execute).toHaveBeenCalledWith(listUuid);
  });

  it("should handle errors gracefully", () => {
    const listUuid = "123e4567-e89b-12d3-a456-426614174000";
    const error = new Error("Test Error");
    mockRemoveListByUuidUseCase.execute = jest.fn(() => {
      throw error;
    });

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    removeListByUuidController.handle(listUuid);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "RemoveListByUuidController: ",
      error
    );

    consoleErrorSpy.mockRestore();
  });
});
