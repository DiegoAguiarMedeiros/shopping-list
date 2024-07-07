import IMMKVStorage from "../../../Service/IMMKVStorage";
import SaveListByUuidUseCase from "./SaveListByUuidUseCase";
import SaveListByUuidController from "./SaveListByUuidController";
import {
  IControllerGetLists,
  IControllerSaveList,
} from "../../interface/IController";
import { IList } from "../../../Model/IList";

// Mock data
const mockIList: IList = {
  uuid: "123e4567-e89b-12d3-a456-426614174000",
  name: "Sample List",
  tags: ["tag1", "tag2"],
  items: ["item1", "item2", "item3"],
  createAt: Date.now(),
};

describe("SaveListByUuidUseCase", () => {
  let mockMMKVStorage: IMMKVStorage;
  let mockSaveLists: IControllerSaveList;
  let mockGetLists: IControllerGetLists;
  let saveListByUuidUseCase: SaveListByUuidUseCase;

  beforeEach(() => {
    mockMMKVStorage = {
      clearAll: jest.fn(),
      getAll: jest.fn(),
      get: jest.fn(),
      set: jest.fn(),
      delete: jest.fn(),
    };

    mockSaveLists = {
      handle: jest.fn(),
    };
    mockGetLists = {
      handle: jest.fn(() => ["existing-uuid"]),
    };

    saveListByUuidUseCase = new SaveListByUuidUseCase(
      mockMMKVStorage,
      mockSaveLists,
      mockGetLists
    );
  });

  it("should save the list data correctly", () => {
    const key = "testKey";
    const data = mockIList;

    saveListByUuidUseCase.execute(key, data);

    expect(mockMMKVStorage.set).toHaveBeenCalledWith(key, JSON.stringify(data));
  });

  it("should add new uuid to the list if not present", () => {
    const key = "testKey";
    const data = mockIList;

    mockGetLists.handle = jest.fn(() => ["existing-uuid"]);

    saveListByUuidUseCase.execute(key, data);

    expect(mockSaveLists.handle).toHaveBeenCalledWith([
      "existing-uuid",
      data.uuid,
    ]);
  });

  it("should not add uuid to the list if already present", () => {
    const key = "testKey";
    const data = {
      ...mockIList,
      uuid: "existing-uuid",
    };

    mockGetLists.handle = jest.fn(() => ["existing-uuid"]);

    saveListByUuidUseCase.execute(key, data);

    expect(mockSaveLists.handle).not.toHaveBeenCalled();
  });

  it("should handle errors gracefully", () => {
    const key = "testKey";
    const data = mockIList;
    const error = new Error("Test Error");
    mockMMKVStorage.set = jest.fn(() => {
      throw error;
    });

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    saveListByUuidUseCase.execute(key, data);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "SaveListByUuidUseCase: ",
      error
    );

    consoleErrorSpy.mockRestore();
  });

  it("should handle empty data array correctly", () => {
    const key = "testKey";
    const data = mockIList;

    saveListByUuidUseCase.execute(key, data);

    expect(mockMMKVStorage.set).toHaveBeenCalledWith(key, JSON.stringify(data));
  });
});
describe("SaveListByUuidController", () => {
  let mockSaveListByUuidUseCase: SaveListByUuidUseCase;
  let saveListByUuidController: SaveListByUuidController;

  beforeEach(() => {
    mockSaveListByUuidUseCase = {
      execute: jest.fn(),
    } as unknown as SaveListByUuidUseCase;

    saveListByUuidController = new SaveListByUuidController(
      mockSaveListByUuidUseCase
    );
  });

  it("should call execute method of SaveListByUuidUseCase with correct parameters", () => {
    const data = mockIList;

    saveListByUuidController.handle(data);

    expect(mockSaveListByUuidUseCase.execute).toHaveBeenCalledWith(
      data.uuid,
      data
    );
  });

  it("should handle errors gracefully", () => {
    const data = mockIList;
    const error = new Error("Test Error");
    mockSaveListByUuidUseCase.execute = jest.fn(() => {
      throw error;
    });

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    saveListByUuidController.handle(data);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "SaveListByUuidController: ",
      error
    );

    consoleErrorSpy.mockRestore();
  });
});
