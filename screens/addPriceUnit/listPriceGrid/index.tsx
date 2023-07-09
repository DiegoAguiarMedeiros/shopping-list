import * as Styled from "./styles";
import { ItemInterface, ItemAmountInterface } from "../../../types/types";

import ListPriceItem from "./listPriceItem";
import { useShoppingListContext } from "../../../context/ShoppingList";
import { removeUndefinedFromArray } from "../../../utils/functions";

interface ListProps {
  item: ItemInterface;
}

export default function ListPriceGrid({ item }: ListProps) {
  const { getAmountOfListItems } = useShoppingListContext();
  const amountOfListItems = removeUndefinedFromArray(
    getAmountOfListItems(item.amount)
  );
  
  return (
    <Styled.Container>
      <Styled.ContainerListPriceItem>
        {amountOfListItems.map((itemAmount: ItemAmountInterface) => {
          return itemAmount ? (
            <ListPriceItem
              itemAmount={itemAmount}
              listItemId={item.uuid}
              key={itemAmount.uuid}
            />
          ) : null;
        })}
      </Styled.ContainerListPriceItem>
    </Styled.Container>
  );
}
