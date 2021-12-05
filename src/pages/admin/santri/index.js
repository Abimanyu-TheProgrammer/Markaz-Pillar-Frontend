import { useState } from "react";
import { axiosMain } from "../../../axiosInstances";
import useSWR from "swr";
import AdminOrUserTemplate from "../../../component/templates/admin/AdminOrUserTemplate";
import GridView from "../../../component/templates/admin/GridView";
import TableView from "../../../component/templates/admin/TableView";

const fetcher = (url) => axiosMain.get(url).then((res) => res.data);

export default function AdminSantri(props) {
  const [page, setPage] = useState(1);
  const [entries, setEntries] = useState(10);
  const [searchSantri, setSearchSantri] = useState("");
  const [ageFilter, setAgeFilter] = useState();
  const [nameFilter, setNameFilter] = useState();
  const {
    data: responseSantri,
    error,
    mutate,
  } = useSWR(
    `/santri/search?page=${page - 1}&n=${entries}&${!!ageFilter ? "sortedAge=" + ageFilter : ""
    }${!!nameFilter ? "sortedName=" + nameFilter : ""}
    &${!!searchSantri && "name=" + searchSantri}
    `,
    fetcher
    // {
    //   fallbackData: allSantri,
    //   refreshInterval: 30000,
    // }
  );

  // *******************************************************
  // Delete
  // *******************************************************
  const handleDeleteSantri = async (id) => {
    await axiosMain
      .delete(`/admin/santri?id=${id}`)
      .then((response) => {
        mutate();
      })
      .catch((e) => {
        if (e.response.data.status === 401) {
          localStorage.clear();
        }
      });
  };

  const handleChangeAge = (event) => {
    setAgeFilter(event.target.value);
    setNameFilter("");
    mutate();
  };

  const handleChangeName = (event) => {
    setNameFilter(event.target.value);
    setAgeFilter("");
    mutate();
  };

  const radioSantri = [
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
    {
      title: "Urutkan Umur",
      value: ageFilter,
      onChange: handleChangeAge,
      labels: [
        {
          value: "ASC",
          label: "Tertua",
        },
        { value: "DESC", label: "Termuda" },
      ],
    },
  ];

  const GridViewAdminSantri = () => {
    return (
      <GridView
        variant='santri'
        data={responseSantri}
        detail="admin/santri"
        handleDelete={handleDeleteSantri}
      />
    );
  };

  const TableViewAdminSantri = () => {
    return (
      <TableView
        data={responseSantri}
        detail="santri"
        handleDelete={handleDeleteSantri}
        santriormarkaz="santri"
        titleTwo="Tempat Markaz"
        titleThree="Domisili"
        titleFour="Jenis Kelamin"
        titleFive="Tanggal Lahir"
      />
    );
  };

  return (
    <>
      <AdminOrUserTemplate
        isAdmin
        variant="santri"
        GridView={<GridViewAdminSantri />}
        TableView={<TableViewAdminSantri />}
        entries={entries}
        searchTerm={searchSantri}
        setSearchTerm={setSearchSantri}
        setEntries={setEntries}
        page={page}
        setPage={setPage}
        data={responseSantri}
        error={error}
        hrefCreate="/admin/santri/create"
        ageFilter={ageFilter}
        setAgeFilter={setAgeFilter}
        nameFilter={nameFilter}
        setNameFilter={setNameFilter}
        mutate={mutate}
        FilterRadioObject={radioSantri}
      />
    </>
  );
}
