import ShowAllTemplate from "../../../../../../component/templates/show_all/ShowAll";
import { useState } from "react";
import Button from "@mui/material/Button";
import TableView from "../../../../../../component/templates/admin/TableView";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Link from "@mui/material/Link";
import { axiosMain } from "../../../../../../axiosInstances";
import useSWR from "swr";
import { useRouter } from "next/router";

const fetcher = (url) => axiosMain.get(url).then((res) => res.data);

export default function TransaksiMarkaz() {
  const router = useRouter();
  const { transid } = router.query;
  const {
    data: markazs,
    error,
    mutate,
  } = useSWR("/admin/transaction?page=0&n=10&id=" + transid, fetcher);
  const [page, setPage] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");

  const [value, setValue] = useState(10);

  const [gridView, setGridView] = useState(true);

  const search = () => {
    markazs.result &&
      markazs.result.filter((data) => {
        if (searchTerm == "") {
          return data;
        } else if (data.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          return data;
        }
      });
  };

  if (error) return "An error has occurred.";
  if (!markazs) return "Loading...";
  return (
    <ShowAllTemplate
      searchBarName="Cari transaksi"
      markazOrSantri="transaksi"
      page={page}
      setPage={setPage}
      value={value}
      setValue={setValue}
      setSearchTerm={setSearchTerm}
      // add={create}
      setGridView={setGridView}
    >
      <TableView
        data={markazs}
        santriormarkaz="transaksi"
        detail="admin/markaz"
        tableTempatMarkaz="ID Transaksi"
        tableDomisili="Nominal Donasi"
        tableJenisKelamin="Status"
        isDonasi
        // transid={idtrans}
      />
    </ShowAllTemplate>
  );
}