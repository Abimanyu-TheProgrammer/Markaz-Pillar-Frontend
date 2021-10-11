import React from "react";
import ShowAllTemplate from "../../../component/templates/show_all/ShowAll";
import { useState } from "react";
import Button from "@mui/material/Button";
import GridView from "../../../component/templates/admin/admin-grid";
import TableView from "../../../component/templates/admin/admin-table";
import AdminTemplate from "../../../component/templates/admin/AdminTemplate";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Link from "@mui/material/Link";

const BASE_URL = process.env.BACKEND_HOST;

export async function getStaticProps(context) {
  try {
    const res = await fetch(`${BASE_URL}/markaz/search?sortedAge=DESC`);
    const data = await res.json();

    return {
      props: { responseUsers: data }, // will be passed to the page component as props
    };
  } catch {
    return {
      notFound: true,
    };
  }
}
export default function AdminMarkaz(props) {
  const { responseUsers } = props;
  console.log("res", responseUsers);
  const [gridView, setGridView] = useState(true);
  const notFound = false;
  try {
    notFound = props.notFound;
  } catch {
    console.log(responseUsers);
  }

  const gridview = (
    <Button
      style={{
        color: "#004f5d",
        backgroundColor: "#ffffff",
        fontWeight: "bold",
        textDecoration: "underline",
      }}
      onClick={() => setGridView(true)}
    >
      Grid View
    </Button>
  );
  const tableview = (
    <Button
      style={{
        color: "#004f5d",
        backgroundColor: "#ffffff",
        fontWeight: "bold",
        textDecoration: "underline",
      }}
      onClick={() => setGridView(false)}
    >
      Table View
    </Button>
  );

  const create = (
    <Link href="markaz/create" underline="none">
      <Fab
        sx={{ position: "fixed", right: "3em", bottom: "3em" }}
        color="primary"
        aria-label="add"
      >
        <AddIcon />
      </Fab>
    </Link>
  );

  return (
    <AdminTemplate
      searchBarName="Cari Markaz"
      view1={gridview}
      view2={tableview}
      markazOrSantri="Markaz"
      add={create}
    >
      <div>
        {gridView ? (
          <GridView
            data={responseUsers}
            intr1Butt="admin/markaz/edit"
            markazOrSantri="admin/markaz/delete"
          />
        ) : (
          <TableView data={responseUsers} santriormarkaz="markaz" />
        )}
      </div>
    </AdminTemplate>
  );
}
