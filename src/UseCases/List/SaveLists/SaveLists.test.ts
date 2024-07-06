import IMMKVStorage from "../../../Service/IMMKVStorage";
import SaveListsUseCase from "./SaveListsUseCase";
import SaveListsController from "./SaveListsController";

describe("SaveListsUseCase", () => {
  let mockMMKVStorage: IMMKVStorage;
  let saveListsUseCase: SaveListsUseCase;

  beforeEach(() => {
    mockMMKVStorage = {
      clearAll: jest.fn(),
      getAll: jest.fn(),
      get: jest.fn(),
      set: jest.fn(),
      delete: jest.fn(),
    };
    saveListsUseCase = new SaveListsUseCase(mockMMKVStorage);
  });

  it("should save data correctly", () => {
    const key = "testKey";
    const data = ["item1", "item2", "item3"];

    saveListsUseCase.execute(key, data);

    expect(mockMMKVStorage.set).toHaveBeenCalledWith(key, JSON.stringify(data));
  });

  it("should handle errors gracefully", () => {
    const key = "testKey";
    const data = ["item1", "item2", "item3"];
    const error = new Error("Test Error");
    mockMMKVStorage.set = jest.fn(() => {
      throw error;
    });

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    saveListsUseCase.execute(key, data);

    expect(consoleErrorSpy).toHaveBeenCalledWith("SaveListsUseCase", error);

    consoleErrorSpy.mockRestore();
  });

  it("should handle empty data array correctly", () => {
    const key = "testKey";
    const data: string[] = [];

    saveListsUseCase.execute(key, data);

    expect(mockMMKVStorage.set).toHaveBeenCalledWith(key, JSON.stringify(data));
  });
});

describe("SaveListsController", () => {
  let mockSaveListsUseCase: SaveListsUseCase;
  let saveListsController: SaveListsController;

  beforeEach(() => {
    mockSaveListsUseCase = {
      execute: jest.fn(),
    } as unknown as SaveListsUseCase;
    saveListsController = new SaveListsController(mockSaveListsUseCase);
  });

  it("should call execute method of SaveListsUseCase with correct parameters", () => {
    const data = ["item1", "item2", "item3"];

    saveListsController.handle(data);

    expect(mockSaveListsUseCase.execute).toHaveBeenCalledWith(
      "SLSHOPPINGLIST",
      data
    );
  });

  it("should handle errors gracefully", () => {
    const data = ["item1", "item2", "item3"];
    const error = new Error("Test Error");
    mockSaveListsUseCase.execute = jest.fn(() => {
      throw error;
    });

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    saveListsController.handle(data);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "SaveListsController: ",
      error
    );

    consoleErrorSpy.mockRestore();
  });

  it("should handle empty data array correctly", () => {
    const data: string[] = [];

    saveListsController.handle(data);

    expect(mockSaveListsUseCase.execute).toHaveBeenCalledWith(
      "SLSHOPPINGLIST",
      data
    );
  });
});
