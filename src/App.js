import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Table from "./Table";
import Search from "./Search";

const App = () => {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      )
      .then((response) => {
        setTableData(response.data);
      });
  }, []);

  const handleDeleteSelectedFromSource = (selectedRows) => {
    setTableData(tableData.filter((node) => !selectedRows.includes(node.id)));
  };

  return (
    <div className="App">
      <Table
        data={tableData}
        deleteSelectedFrmSrc={handleDeleteSelectedFromSource}
      />
    </div>
  );
};

export default App;
