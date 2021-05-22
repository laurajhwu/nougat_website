import React, { useState } from "react";
import { useSelector, UseSelector } from "react-redux";
import { OverlayTrigger, Popover } from "react-bootstrap";
import EditableInput from "../../../../../Components/EditableInput";

import {
  ProductsTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Notes,
  DisableRemove,
  EnableRemove,
  EditIcon,
  PopoverContent,
  Add,
} from "./styles";

export default function Ingredients() {
  const ingredients = useSelector((state) => state.ingredients);
  const orders = useSelector((state) => state.orders);
  const [deleteItems, setDeleteItems] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => setShow(id);

  function handleNoteEdit(data, ingredient) {
    ingredient.notes = data;
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
            <Th>筆記</Th>
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
                        <Popover id={`popover-positioned-$"top"`}>
                          <Popover.Title as="h4">{`筆記`}</Popover.Title>
                          <PopoverContent>
                            <EditableInput
                              notes={true}
                              initValue={ingredient.notes}
                              handleFinishEdit={(data) =>
                                handleNoteEdit(data, ingredient)
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
                    <EditIcon />
                  </td>
                </Tr>
              );
            })}
          <Tr>
            <td colSpan="7">
              <Add />
            </td>
          </Tr>
        </Tbody>
      </ProductsTable>
    );
  } else {
    return <div>Loading</div>;
  }
}
