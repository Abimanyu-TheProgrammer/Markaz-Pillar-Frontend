import { useState } from "react";
import AdminOrUserTemplate from "../../../component/templates/admin/AdminOrUserTemplate";
import useSWR from "swr";
import { axiosMain } from "../../../axiosInstances";
import TableView from "../../../component/templates/admin/TableView";

const fetcher = (url) => axiosMain.get(url).then((res) => res.data);

export default function AdminUsers() {
  const [page, setPage] = useState(1);
  const [entries, setEntries] = useState(10);
  const {
    data: responsePengguna,
    error,
    mutate,
  } = useSWR(`/admin/user?page=${page - 1}&n=${entries}`, fetcher);

  const handleDeletePengguna = async (id) => {
    await axiosMain
      .delete(`/admin/user?id=${id}`)
      .then((response) => {
        mutate();
      })
      .catch((e) => {
        if (e.response.data.status === 401) {
          localStorage.clear();
        }
      });
  };

  const TableViewDataPengguna = () => {
    return (
      <TableView
        data={responsePengguna}
        handleDelete={handleDeletePengguna}
        santriormarkaz="pengguna"
        titleTwo="Username"
        titleThree="Email"
        titleFour="Nomor Telpon"
        titleFive="Alamat"
        mutate={mutate}
      />
    );
  };

  return (
    <>
      <AdminOrUserTemplate
        isAdmin
        variant="pengguna"
        data={responsePengguna}
        page={page}
        setPage={setPage}
        entries={entries}
        setEntries={setEntries}
        error={error}
        mutate={mutate}
        TableView={<TableViewDataPengguna />}
      />
    </>
  );
}
