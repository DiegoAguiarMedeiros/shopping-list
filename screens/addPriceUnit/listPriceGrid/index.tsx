import * as Styled from "./styles";
import { ItemInterface, ItemAmountInterface } from "../../../types/types";

import ListPriceItem from "./listPriceItem";
import { useShoppingListContext } from "../../../context/ShoppingList";
import { removeUndefinedFromArray } from "../../../utils/functions";
import IAmount from "../../../Domain/Model/IAmount";

interface ListProps {
  item: IAmount[];
}

export default function ListPriceGrid({ item }: ListProps) {

  return (
    <Styled.Container>
      <Styled.ContainerListPriceItem>
        {item.map((itemAmount: IAmount) => {
          return itemAmount ? (
            <ListPriceItem
              itemAmount={itemAmount}
              listItemId={itemAmount.listProductUuid}
              key={itemAmount.uuid}
            />
          ) : <></>;
        })}
      </Styled.ContainerListPriceItem>
    </Styled.Container>
  );
}
