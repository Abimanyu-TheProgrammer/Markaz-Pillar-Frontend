import { useState } from "react";
import { axiosMain } from "../../../axiosInstances";
import useSWR from "swr";
import AdminOrUserTemplate from "../../../component/templates/admin/AdminOrUserTemplate";
import GridView from "../../../component/templates/admin/GridView";
import TableView from "../../../component/templates/admin/TableView";
import { enumRoutes } from "../../../context/AppReducer";

const fetcher = (url) => axiosMain.get(url).then((res) => res.data);

export default function AdminMarkaz() {
  const [page, setPage] = useState(1);
  const [entries, setEntries] = useState(10);
  const [searchMarkaz, setSearchMarkaz] = useState("");
  const [locationFilter, setLocationFilter] = useState();
  const [nameFilter, setNameFilter] = useState();
  const [categoryFilter, setCategoryFilter] = useState();
  const [categoryFilter2, setCategoryFilter2] = useState();
  const [categoryFilter3, setCategoryFilter3] = useState();
  const {
    data: responseMarkaz,
    error,
    mutate,
  } = useSWR(
    `/markaz/search?page=${page - 1}&n=${entries}&${!!locationFilter ? "address=" + locationFilter : ""
    }${!!nameFilter ? "sortedName=" + nameFilter : ""}${!!categoryFilter ? "category=" + categoryFilter : ""
    }&${!!categoryFilter2 ? "category=" + categoryFilter2 : ""}&${!!categoryFilter3 ? "category=" + categoryFilter3 : ""
    }&${!!searchMarkaz && "name=" + searchMarkaz}
`,
    fetcher
    // {
    //   fallbackData: allMarkaz,
    //   refreshInterval: 30000,
    // }
  );

  // *******************************************************
  // Delete
  // *******************************************************
  const handleDeleteMarkaz = async (id) => {
    await axiosMain
      .delete(`/admin/markaz?id=${id}`)
      .then((response) => {
        mutate();
      })
      .catch((e) => {
        if (e.response.data.status === 401) {
          localStorage.clear();
        }
      });
  };

  const GridViewAdminMarkaz = () => {
    return (
      <GridView
        variant='markaz'
        data={responseMarkaz}
        detail={enumRoutes.ADMIN_MARKAZ}
        handleDelete={handleDeleteMarkaz}
      />
    );
  };
  const TableViewMarkaz = () => {
    return (
      <TableView
        data={responseMarkaz}
        detail="markaz"
        handleDelete={handleDeleteMarkaz}
        santriormarkaz="markaz"
        titleTwo="Kategori"
        titleThree="Contact Person"
        titleFour="Kontak"
      />
    );
  };

  const handleChangeName = (event) => {
    setNameFilter(event.target.value);
    mutate();
  };

  const handleChangeLocation = (event) => {
    setLocationFilter(event.target.value);
    mutate();
  };

  const radioMarkaz = [
    {
      title: "Lokasi",
      value: locationFilter,
      onChange: handleChangeLocation,
      labels: [
        {
          value: "false",
          label: "Luar Jabodetabek",
        },
        { value: "true", label: "Jabodetabok" },
      ],
    },
    {
      title: "Urutkan Nama",
      value: nameFilter,
      onChange: handleChangeName,
      labels: [
        {
          value: "ASC",
          label: "A-Z",
        },
        { value: "DESC", label: "Z-A" },
      ],
    },
  ];

  return (
    <>
      <AdminOrUserTemplate
        isAdmin
        variant="markaz"
        GridView={<GridViewAdminMarkaz />}
        TableView={<TableViewMarkaz />}
        searchTerm={searchMarkaz}
        setSearchTerm={setSearchMarkaz}
        entries={entries}
        setEntries={setEntries}
        page={page}
        setPage={setPage}
        data={responseMarkaz}
        error={error}
        hrefCreate={enumRoutes.ADMIN_MARKAZ_CREATE}
        locationFilter={locationFilter}
        setLocationFilter={setLocationFilter}
        nameFilter={nameFilter}
        setNameFilter={setNameFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        categoryFilter2={categoryFilter2}
        setCategoryFilter2={setCategoryFilter2}
        categoryFilter3={categoryFilter3}
        setCategoryFilter3={setCategoryFilter3}
        mutate={mutate}
        FilterRadioObject={radioMarkaz}
      />
    </>
  );
}
