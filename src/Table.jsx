import React, { useEffect, useState } from "react";
import Search from "./Search";
import "./App.css";
const Table = ({ data, deleteSelectedFrmSrc }) => {
  const perPage = 10;
  const [selecteAll, setSelectAll] = useState(false);
  const [visibleData, setVisibleData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [editableRows, setEditableRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const getPages = () => {
    let arr = [];
    for (let i = 0; i < data?.length / perPage; i++) {
      arr.push(i + 1);
    }
    return arr;
  };
  const pages = getPages();

  const handleLastPage = () => {
    setCurrentPage(pages.length);
  };
  const handleFirstPage = () => {
    setCurrentPage(pages[0]);
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageChanges = (pageNo) => {
    let start = pageNo * perPage - perPage + 1;
    let end = pageNo * perPage;
    setVisibleData(data?.slice(start, end + 1));
    setCurrentPage(pageNo);
  };

  const handleSelectAll = (action) => {
    if (action) setSelectedRows(visibleData.map((node) => node.id));
    else setSelectedRows([]);
    setSelectAll(action);
  };
  const handleSelectSingleRow = (action, id) => {
    if (action) setSelectedRows([...selectedRows, id]);
    else setSelectedRows(selectedRows.filter((node) => node != id));
  };
  const handleDeleteSelected = () => {
    setVisibleData(
      visibleData.filter((node) => !selectedRows.includes(node.id))
    );
    //if want to delete from source
    deleteSelectedFrmSrc(selectedRows);
    //reset selectall checkbox
    setSelectAll(false);
  };
  const handleDeleteSpecific = (id) => {
    setVisibleData(visibleData.filter((node) => node.id != id));
    //if want to delete from source
    deleteSelectedFrmSrc([id]);
  };
  const handleSearch = (searchValue) => {
    if (searchValue.length) {
      setVisibleData(
        visibleData.filter(
          (node) =>
            node.name.includes(searchValue) ||
            node.email.includes(searchValue) ||
            node.role.includes(searchValue)
        )
      );
    } else {
      setVisibleData(data?.slice(0, perPage));
    }
  };
  const handleInputChange = (fieldName, value, id) => {
    setVisibleData(
      visibleData.map((node) => {
        if (node.id == id) {
          node[fieldName] = value;
        }
        return { ...node };
      })
    );
  };

  useEffect(() => {
    setVisibleData(data?.slice(0, perPage));
  }, [data]);

  return (
    <div>
      <Search search={handleSearch} />
      <table>
        <thead>
          <th>
            <input
              type="checkbox"
              onChange={(e) => handleSelectAll(e.target.checked)}
              checked={selecteAll}
            />
          </th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Action</th>
        </thead>
        <tbody>
          {visibleData.length === 0 ? (
            <div>Nothing Found!</div>
          ) : (
            visibleData?.map((rowData) => {
              return (
                <tr className={selectedRows.includes(rowData.id) && "selected"}>
                  <td>
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        handleSelectSingleRow(e.target.checked, rowData.id)
                      }
                      checked={selectedRows.includes(rowData.id)}
                    />
                  </td>
                  <td>
                    {editableRows.includes(rowData.id) ? (
                      <input
                        type="text"
                        value={rowData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value, rowData.id)
                        }
                      />
                    ) : (
                      rowData.name
                    )}
                  </td>
                  <td>
                    {editableRows.includes(rowData.id) ? (
                      <input
                        type="email"
                        value={rowData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value, rowData.id)
                        }
                      />
                    ) : (
                      rowData.email
                    )}
                  </td>
                  <td>
                    {editableRows.includes(rowData.id) ? (
                      <input
                        type="text"
                        value={rowData.role}
                        onChange={(e) =>
                          handleInputChange("role", e.target.value, rowData.id)
                        }
                      />
                    ) : (
                      rowData.role
                    )}
                  </td>
                  <td>
                    <span className="pointerContent">
                      <button
                        onClick={() =>
                          !editableRows.includes(rowData.id) &&
                          setEditableRows([...editableRows, rowData.id])
                        }
                      >
                        edit
                      </button>
                      <button onClick={() => handleDeleteSpecific(rowData.id)}>
                        delete
                      </button>
                    </span>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      <div className="pointerContent">
        <span onClick={handleFirstPage}>{"<<"}</span>&nbsp;
        <span onClick={handlePreviousPage}>{"<"}</span>&nbsp;
        {pages.map((pageNo) => {
          return (
            <>
              <span onClick={() => handlePageChanges(pageNo)}>
                {pageNo === currentPage ? <b>{pageNo}</b> : <>{pageNo}</>}
              </span>
              &nbsp;
            </>
          );
        })}
        <span onClick={handleNextPage}>{">"}</span>
        <span onClick={handleLastPage}>{">>"}</span>
      </div>
      <button onClick={handleDeleteSelected}>Delete Selected</button>
    </div>
  );
};
export default Table;
