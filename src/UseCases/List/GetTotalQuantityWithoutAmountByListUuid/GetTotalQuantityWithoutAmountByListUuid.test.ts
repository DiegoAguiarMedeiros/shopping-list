import IAmount from "../../../Model/IAmount";
import { IList } from "../../../Model/IList";
import { IProduct } from "../../../Model/IProduct";
import {
  IControllerGetListByUuid,
  IControllerGetListProductsByUuid,
  IControllerGetTagUuidByTagName,
  IControllerGetTotalAmounts,
} from "../../interface/IController";
import GetTotalQuantityWithoutAmountByListUuidUseCase from "./GetTotalQuantityWithoutAmountByListUuidUseCase";
import GetTotalQuantityWithoutAmountByListUuidController from "./GetTotalQuantityWithoutAmountByListUuidController";

// Mock data
const mockList: IList = {
  uuid: "123e4567-e89b-12d3-a456-426614174000",
  name: "Sample List",
  tags: ["tag1", "tag2"],
  items: [
    "123e4567-e89b-12d3-a456-426614174001",
    "123e4567-e89b-12d3-a456-426614174002",
    "123e4567-e89b-12d3-a456-426614174003",
  ],
  createAt: Date.now(),
};

const mockAmounts: IAmount[] = [
  {
    uuid: "123e4567-e89b-12d3-a456-426614174004",
    amount: "5",
    type: true,
    quantity: "5",
    listProductUuid:
      "123e4567-e89b-12d3-a456-426614174000-123e4567-e89b-12d3-a456-426614174001",
  },
  {
    uuid: "123e4567-e89b-12d3-a456-426614174005",
    amount: "3",
    type: true,
    quantity: "3",
    listProductUuid:
      "123e4567-e89b-12d3-a456-426614174000-123e4567-e89b-12d3-a456-426614174002",
  },
  {
    uuid: "123e4567-e89b-12d3-a456-426614174006",
    amount: "2",
    type: true,
    quantity: "2",
    listProductUuid:
      "123e4567-e89b-12d3-a456-426614174000-123e4567-e89b-12d3-a456-426614174003",
  },
];

const mockProducts: IProduct[] = [
  {
    uuid: "123e4567-e89b-12d3-a456-426614174001",
    tag: "tag1",
    name: "Product 1",
    amount: ["123e4567-e89b-12d3-a456-426614174004"],
    unit: "Kg",
  },
  {
    uuid: "123e4567-e89b-12d3-a456-426614174002",
    tag: "tag2",
    name: "Product 2",
    amount: ["123e4567-e89b-12d3-a456-426614174005"],
    unit: "Kg",
  },
  {
    uuid: "123e4567-e89b-12d3-a456-426614174003",
    tag: "tag1",
    name: "Product 3",
    amount: ["123e4567-e89b-12d3-a456-426614174006"],
    unit: "Kg",
  },
];

describe("RemoveListByUuidUseCase", () => {
  let mockGetListByUuid: IControllerGetListByUuid;
  let mockGetListProductsByUuid: IControllerGetListProductsByUuid;
  let mockGetTagUuidByTagName: IControllerGetTagUuidByTagName;
  let mockGetTotalAmount: IControllerGetTotalAmounts;
  let mockGetTotalQuantityWithoutAmountByListUuidUseCase: GetTotalQuantityWithoutAmountByListUuidUseCase;

  beforeEach(() => {
    mockGetListByUuid = {
      handle: jest.fn(() => mockList),
    } as unknown as IControllerGetListByUuid;

    mockGetListProductsByUuid = {
      handle: jest.fn(() => mockProducts),
    } as unknown as IControllerGetListProductsByUuid;

    mockGetTagUuidByTagName = {
      handle: jest.fn((tagName) => `tag-uuid-${tagName}`),
    } as unknown as IControllerGetTagUuidByTagName;

    mockGetTotalAmount = {
      handle: jest.fn((key) => {
        if (
          key ===
          "123e4567-e89b-12d3-a456-426614174000-123e4567-e89b-12d3-a456-426614174001"
        )
          return 5 * 5;
        if (
          key ===
          "123e4567-e89b-12d3-a456-426614174000-123e4567-e89b-12d3-a456-426614174002"
        )
          return 3 * 3;
        if (
          key ===
          "123e4567-e89b-12d3-a456-426614174000-123e4567-e89b-12d3-a456-426614174003"
        )
          return 2 * 2;

        return 0;
      }),
    } as unknown as IControllerGetTotalAmounts;

    mockGetTotalQuantityWithoutAmountByListUuidUseCase =
      new GetTotalQuantityWithoutAmountByListUuidUseCase(
        mockGetListByUuid,
        mockGetListProductsByUuid,
        mockGetTagUuidByTagName,
        mockGetTotalAmount
      );
  });

  it('should calculate total quantity for all products when filter is "Todos"', () => {
    const total = mockGetTotalQuantityWithoutAmountByListUuidUseCase.execute(
      "123e4567-e89b-12d3-a456-426614174000",
      "Todos"
    );
    expect(total).toBe(38);
  });

  it("should calculate total quantity for filtered products", () => {
    mockGetTagUuidByTagName.handle = jest.fn((tagName) => "tag1");
    const total = mockGetTotalQuantityWithoutAmountByListUuidUseCase.execute(
      "123e4567-e89b-12d3-a456-426614174000",
      "tag1"
    );
    expect(total).toBe(29);
  });

  it("should handle errors gracefully", () => {
    const error = new Error("Test Error");

    mockGetListByUuid.handle = jest.fn(() => {
      throw error;
    });

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    mockGetTotalQuantityWithoutAmountByListUuidUseCase.execute(
      "123e4567-e89b-12d3-a456-426614174000",
      "Todos"
    );

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "GetTotalQuantityWithoutAmountByListUuidUseCase: ",
      error
    );

    consoleErrorSpy.mockRestore();
  });
});

describe("GetTotalQuantityWithoutAmountByListUuidController", () => {
  let mockGetTotalQuantityWithoutAmountByListUuidUseCase: GetTotalQuantityWithoutAmountByListUuidUseCase;
  let mockGetTotalQuantityWithoutAmountByListUuidController: GetTotalQuantityWithoutAmountByListUuidController;

  beforeEach(() => {
    mockGetTotalQuantityWithoutAmountByListUuidUseCase = {
      execute: jest.fn((key, filter) => {
        if (
          key === "123e4567-e89b-12d3-a456-426614174000" &&
          filter === "Todos"
        )
          return 5 * 5 + 3 * 3 + 2 * 2;
        if (key === "123e4567-e89b-12d3-a456-426614174000" && filter === "tag1")
          return 5 * 5 + 2 * 2;
        if (key === "123e4567-e89b-12d3-a456-426614174000" && filter === "tag2")
          return 5 * 5 + 1 * 56;
        if (key === "123e4567-e89b-12d3-a456-426614174000" && filter === "tag3")
          return 5 * 5 + 3 * 2;

        return -1;
      }),
    } as unknown as GetTotalQuantityWithoutAmountByListUuidUseCase;

    mockGetTotalQuantityWithoutAmountByListUuidController =
      new GetTotalQuantityWithoutAmountByListUuidController(
        mockGetTotalQuantityWithoutAmountByListUuidUseCase
      );
  });

  it('should calculate total quantity for all products when filter is "Todos"', () => {
    const total = mockGetTotalQuantityWithoutAmountByListUuidController.handle(
      "123e4567-e89b-12d3-a456-426614174000",
      "Todos"
    );
    expect(total).toBe(38);
  });

  it("should calculate total quantity for filtered products", () => {
    const total = mockGetTotalQuantityWithoutAmountByListUuidController.handle(
      "123e4567-e89b-12d3-a456-426614174000",
      "tag1"
    );
    expect(total).toBe(29);
  });

  it("should handle errors gracefully", () => {
    const error = new Error("Test Error");

    mockGetTotalQuantityWithoutAmountByListUuidUseCase.execute = jest.fn(() => {
      throw error;
    });

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    mockGetTotalQuantityWithoutAmountByListUuidController.handle(
      "123e4567-e89b-12d3-a456-426614174000",
      "Todos"
    );

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "GetTotalQuantityWithoutAmountByListUuidUseCase: ",
      error
    );

    consoleErrorSpy.mockRestore();
  });

  it("should calculate total quantity for different filters", () => {
    const filters = ["Todos", "tag1", "tag2", "tag3"];
    const expectedTotals = [38, 29, 81, 31];
    filters.forEach((filter, index) => {
      const total =
        mockGetTotalQuantityWithoutAmountByListUuidController.handle(
          "123e4567-e89b-12d3-a456-426614174000",
          filter
        );
      expect(total).toBe(expectedTotals[index]);
    });
  });
});
