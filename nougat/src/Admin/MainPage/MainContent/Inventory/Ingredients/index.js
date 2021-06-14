import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { OverlayTrigger, Popover } from "react-bootstrap";
import Api from "../../../../../utils/Api";
import EditableInput from "../../../../../Components/EditableInput";
import Update from "./Edit/UpdateIngredient";
import AddIngredient from "./Edit/AddIngredient";
import Delete from "../DeleteIventory";
import SearchBar from "../../../../../Components/SearchBar";
import pageSplitter from "../../../../../utils/pageSplitter";

import TablePagination from "@material-ui/core/TablePagination";
import {
  ProductsTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Notes,
  UpdateIcon,
  PopoverContent,
  Add,
  Search,
  HasNote,
} from "./styles";

export default function Ingredients() {
  const ingredients = useSelector((state) => state.ingredients);
  const products = useSelector((state) => state.products);
  const [deleteItems, setDeleteItems] = useState([]);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [search, setSearch] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = (id) => setShowUpdate(id);
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  function handleNoteEdit(id, data) {
    Api.updateIngredients(id, { notes: data });
  }

  function handleChecked(event, id) {
    setDeleteItems(
      event.target.checked
        ? [...deleteItems, id]
        : deleteItems.filter((item) => item !== id)
    );
  }

  function handleDeleteIngredients() {
    if (
      window.confirm("刪除後資料無法復原，並會從相關產品中移除，確認刪除？")
    ) {
      Api.removeMultipleIngredients(deleteItems, products)
        .then(() => {
          alert("刪除完畢");
          setDeleteItems([]);
        })
        .catch((error) => {
          throw error;
        });
    }
  }

  function handleSearch(ingredients) {
    if (search) {
      const filteredIng = Object.entries(ingredients).filter((ingredient) =>
        ingredient[1].name.includes(search)
      );

      return filteredIng.length === 0
        ? {}
        : filteredIng.reduce(
            (obj, ingredient) => ({
              ...obj,
              [ingredient[0]]: ingredient[1],
            }),
            {}
          );
    }
    return ingredients;
  }

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  useEffect(() => {
    setPage(0);
  }, [search]);

  if (ingredients) {
    return (
      <>
        <Search>
          <SearchBar setSearchValue={setSearch} searchValue={search} />
        </Search>
        <ProductsTable striped bordered hover responsive variant="dark">
          <Thead>
            <Tr>
              <Th>
                <Delete
                  deleteItems={deleteItems}
                  handleDelete={handleDeleteIngredients}
                />
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
            {(
              pageSplitter(
                Object.values(handleSearch(ingredients)).sort(
                  (least, most) => least.stock - most.stock
                ),
                rowsPerPage
              )[page] || []
            ).map((ingredient) => {
              const stock = ingredient.stock;
              const used = ingredient.used;
              return (
                <Tr key={ingredient.id}>
                  <td>
                    <input
                      type="checkbox"
                      onChange={(event) => handleChecked(event, ingredient.id)}
                    />
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
                          <PopoverContent>{ingredient.notes}</PopoverContent>
                        </Popover>
                      }
                    >
                      <Notes />
                    </OverlayTrigger>
                    {ingredient.notes ? <HasNote /> : ""}
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
              <td colSpan="7" style={{ textAlign: "left" }}>
                <Add onClick={handleShowAdd} />
                <AddIngredient handleClose={handleCloseAdd} show={showAdd} />
              </td>
            </Tr>
          </Tbody>
        </ProductsTable>
        <TablePagination
          component="div"
          count={Object.values(handleSearch(ingredients)).length}
          page={page}
          onChangePage={handleChangePage}
          rowsPerPage={rowsPerPage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </>
    );
  } else {
    return <div>Loading</div>;
  }
}
