import { useState, useEffect } from "react";
import { axiosMain } from "../../axiosInstances";
import useSWR from "swr";

import AdminOrUserTemplate from "../../component/templates/admin/AdminOrUserTemplate";

import GridView from "../../component/templates/admin/GridView";

const fetcher = (url) => axiosMain.get(url).then((res) => res.data);

export default function Santri(props) {
  const { allSantri } = props;
  const [searchSantri, setSearchSantri] = useState("");
  const [page, setPage] = useState(1);
  const [entries, setEntries] = useState(10);
  const [ageFilter, setAgeFilter] = useState();
  const [nameFilter, setNameFilter] = useState();
  const {
    data: responseSantri,
    error,
    mutate,
  } = useSWR(
    `/santri/search?${!!ageFilter ? "sortedAge=" + ageFilter : ""}${
      !!nameFilter ? "sortedName=" + nameFilter : ""
    }&page=${page - 1}&n=${entries}&${
      !!searchSantri && "name=" + searchSantri
    }`,
    fetcher,
    { fallbackData: allSantri, refreshInterval: 30000 }
  );

  useEffect(() => {
    mutate();
  }, [ageFilter, nameFilter, mutate]);

  const GridViewSantri = () => {
    return (
      <GridView data={responseSantri} detail="santri" />
    );
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

  return (
    <>
      <AdminOrUserTemplate
        variant="santri"
        GridView={<GridViewSantri/>}
        entries={entries}
        setEntries={setEntries}
        searchTerm={searchSantri}
        setSearchTerm={setSearchSantri}
        page={page}
        setPage={setPage}
        data={responseSantri}
        error={error}
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

export async function getStaticProps() {
  const staticAllSantriResponse = await axiosMain.get("/santri/search?n=1000");
  const staticAllSantri = staticAllSantriResponse.data;
  return {
    props: {
      allSantri: staticAllSantri,
    },
    revalidate: 10,
  };
}
