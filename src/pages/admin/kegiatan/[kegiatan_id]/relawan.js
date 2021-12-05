import { useEffect, useState } from "react";
import { axiosMain } from "../../../../axiosInstances";
import useSWR from "swr";
import AdminOrUserTemplate from "../../../../component/templates/admin/AdminOrUserTemplate";
import GridView from "../../../../component/templates/admin/GridView";
import TableView from "../../../../component/templates/admin/TableView";
import ArrowBack from "../../../../component/modules/ArrowBack";
import { useRouter } from "next/router";

const fetcher = (url) => axiosMain.get(url).then((res) => res.data);

export default function AdminRelawan(props) {
  const [page, setPage] = useState(1);
  const [entries, setEntries] = useState(10);
  const [searchVolunteer, setSearchVolunteer] = useState("");
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState();
  const { kegiatan_id } = router.query;
  const {
    data: responseVolunteer,
    error,
    mutate,
  } = useSWR(
    router.isReady
      ? `/admin/volunteer/registration?page=${page - 1
      }&n=${entries}&id=${kegiatan_id}&name=${searchVolunteer}${!!statusFilter ? "&status=" + statusFilter : ""
      }
`
      : null,
    fetcher
  );

  // useEffect(() => {
  //   mutate();
  // }, [statusFilter, mutate]);

  //

  const changeStatus = async (ids, status) => {
    return axiosMain.post(`/admin/volunteer/registration/status?id=${ids}`, {
      status: `${status}`,
    });
  };

  const GridViewAdminVolunteerDetail = () => {
    return <GridView data={responseVolunteer} variant="relawan" disableCTA />;
  };

  const TableViewAdminVolunteerDetail = () => {
    return (
      <TableView
        data={responseVolunteer}
        // detail="admin/kegiatan"
        santriormarkaz="volunteer"
        titleTwo="Nomor KTP"
        titleThree="Email"
        titleFour="Nomor Telpon"
        titleFive="Status"
        apiCall={changeStatus}
        mutate={mutate}
        dialogType="statusVolunteer"
      />
    );
  };

  const handleChangeStatus = (event) => {
    setStatusFilter(event.target.value);
    mutate();
  };

  const radioRegister = [
    {
      title: "Status",
      value: statusFilter,
      onChange: handleChangeStatus,
      labels: [
        {
          value: "MENUNGGU_KONFIRMASI",
          label: "Menunggu Konfirmasi",
        },
        { value: "PENDAFTARAN_DITERIMA", label: "Pendaftaran Diterima" },
        { value: "PENDAFTARAN_DITOLAK", label: "Pendaftaran Ditolak" },
      ],
    },
  ];

  return (
    <>
      <ArrowBack href={"/admin/kegiatan"} />
      <AdminOrUserTemplate
        isAdmin
        variant="relawan"
        GridView={<GridViewAdminVolunteerDetail />}
        TableView={<TableViewAdminVolunteerDetail />}
        entries={entries}
        setEntries={setEntries}
        searchTerm={searchVolunteer}
        setSearchTerm={setSearchVolunteer}
        page={page}
        setPage={setPage}
        data={responseVolunteer}
        error={error}
        mutate={mutate}
        FilterRadioObject={radioRegister}
      />
    </>
  );
}
