import React, { useState } from "react";
import { useSelector } from "react-redux";
import { OverlayTrigger, Popover } from "react-bootstrap";
import Api from "../../../../../utils/Api";
import EditableInput from "../../../../../Components/EditableInput";
import Update from "./Edit/UpdateIngredient";
import AddIngredient from "./Edit/AddIngredient";

import {
  ProductsTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Notes,
  DisableRemove,
  EnableRemove,
  UpdateIcon,
  PopoverContent,
  Add,
} from "./styles";

export default function Ingredients() {
  const ingredients = useSelector((state) => state.ingredients);
  const [deleteItems, setDeleteItems] = useState([]);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = (id) => setShowUpdate(id);
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  function handleNoteEdit(id, data) {
    Api.updateIngredients(id, { notes: data });
  }

  if (ingredients) {
    return (
      <ProductsTable striped bordered hover responsive variant="dark">
        <Thead>
          <Tr>
            <Th>
              {deleteItems.length === 0 ? <DisableRemove /> : <EnableRemove />}
            </Th>
            <Th>食材</Th>
            <Th>總購買量</Th>
            <Th>已使用</Th>
            <Th>剩餘庫存</Th>
            <Th>備註</Th>
            <Th>編輯</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Object.values(ingredients)
            .sort((least, most) => least.stock - most.stock)
            .map((ingredient) => {
              const stock = ingredient.stock;
              const used = ingredient.used;
              return (
                <Tr key={ingredient.id}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{ingredient.name}</td>
                  <td>{`${stock + used} 克`}</td>
                  <td>{`${used} 克`}</td>
                  <td>{`${stock} 克`}</td>
                  <td>
                    <OverlayTrigger
                      trigger="click"
                      key="top"
                      placement="top"
                      overlay={
                        <Popover id={`popover-positioned-top`}>
                          <Popover.Title as="h4">{`備註`}</Popover.Title>
                          <PopoverContent>
                            <EditableInput
                              notes={true}
                              initValue={ingredient.notes}
                              handleFinishEdit={(data) =>
                                handleNoteEdit(ingredient.id, data)
                              }
                            />
                          </PopoverContent>
                        </Popover>
                      }
                    >
                      <Notes />
                    </OverlayTrigger>
                  </td>
                  <td>
                    <UpdateIcon
                      onClick={() => handleShowUpdate(ingredient.id)}
                    />
                    <Update
                      ingredient={ingredient}
                      handleClose={handleCloseUpdate}
                      show={showUpdate === ingredient.id}
                    />
                  </td>
                </Tr>
              );
            })}
          <Tr>
            <td colSpan="7">
              <Add onClick={handleShowAdd} />
              <AddIngredient handleClose={handleCloseAdd} show={showAdd} />
            </td>
          </Tr>
        </Tbody>
      </ProductsTable>
    );
  } else {
    return <div>Loading</div>;
  }
}
