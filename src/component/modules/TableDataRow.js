import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import Link from "next/link";
import Dialog from "./Dialog";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DownloadIcon from "@mui/icons-material/Download";
import ListIcon from "@mui/icons-material/List";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#004f5d",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.white,
  },
  "&:nth-of-type(even)": {
    backgroundColor: "rgba(0,79,93,0.06)",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function TableDataRow(props) {
  const {
    id,
    nama,
    markaz,
    domisili,
    kelamin,
    tanggal,
    santriormarkaz,
    detail,
    iddonasi,
    paymenturl,
    handleDelete,
    mutate,
  } = props;
  const router = useRouter();

  function TableButtons() {
    if (
      santriormarkaz === "santri" ||
      santriormarkaz === "markaz" ||
      santriormarkaz === "pengguna"
    ) {
      return (
        <>
          {santriormarkaz !== "pengguna" ? (
            <Tooltip title="Edit ">
              <IconButton
                onClick={() =>
                  router.push(`/admin/${santriormarkaz}/${id}/edit`)
                }
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          ) : null}
          <Tooltip title="Delete">
            <IconButton onClick={() => handleDelete(id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      );
    } else if (santriormarkaz === "donasi") {
      return (
        <>
          <Link
            href={{
              pathname: `donasi/${iddonasi}/transaksi`,
              query: { ...router.query },
            }}
            passHref
          >
            <Tooltip title="Manage">
              <IconButton>
                <ListIcon />
              </IconButton>
            </Tooltip>
          </Link>
          <Link
            href={{
              pathname: `donasi/${iddonasi}/edit`,
              query: { ...router.query },
            }}
            passHref
          >
            <Tooltip title={"Edit"}>
              <IconButton>
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Link>
        </>
      );
    } else if (santriormarkaz === "transaksi") {
      return (
        <>
          <Tooltip title="Download File">
            <IconButton
              passHref
              href={paymenturl}
              target="_blank"
              underline="none"
            >
              <DownloadIcon />
            </IconButton>
          </Tooltip>
          <Dialog
            mutate={mutate}
            isStatus
            dialogButtons={<MoreVertIcon />}
            {...props}
            tooltip={"Change Status"}
          />
        </>
      );
    } else if (santriormarkaz === "kegiatan") {
      return (
        <>
          <Tooltip title="Manage">
            <IconButton
              onClick={() => router.push(`/admin/kegiatan/${id}/relawan`)}
            >
              <ListIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton
              onClick={() => router.push(`/admin/kegiatan/${id}/edit`)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>

          <Dialog
            mutate={mutate}
            isStatus
            dialogButtons={<MoreVertIcon />}
            tooltip={"Change Status"}
            {...props}
          />
        </>
      );
    } else if (santriormarkaz === "volunteer") {
      return (
        <>
          <Dialog
            mutate={mutate}
            isDownloadVolunteer
            dialogButtons={<DownloadIcon />}
            tooltip={"Download Files"}
            {...props}
          />
          <Dialog
            mutate={mutate}
            isStatus
            dialogButtons={<MoreVertIcon />}
            tooltip={"Change Status"}
            {...props}
          />
        </>
      );
    } else {
      return "buttons";
    }
  }

  return (
    <StyledTableRow>
      {!!detail ? (
        <StyledTableCell component="th" scope="row">
          <Typography color="primary">
            <Link data-testid="name-at-table-row" href={`${detail}/` + id}>
              {nama}
            </Link>
          </Typography>
        </StyledTableCell>
      ) : (
        <StyledTableCell component="th" scope="row">
          <Typography>{nama}</Typography>
        </StyledTableCell>
      )}
      <StyledTableCell align="left">
        <Typography>{markaz}</Typography>
      </StyledTableCell>
      <StyledTableCell align="left">
        <Typography>{domisili}</Typography>
      </StyledTableCell>
      <StyledTableCell align="left">
        <Typography>{kelamin}</Typography>
      </StyledTableCell>
      {!!tanggal && (
        <StyledTableCell id="tableCellFive" align="left">
          <Typography>{tanggal}</Typography>
        </StyledTableCell>
      )}
      {santriormarkaz === "santri" || santriormarkaz === "markaz" ? (
        <StyledTableCell align="left">
          <Button
            variant="outlined"
            onClick={() => router.push(`/admin/${santriormarkaz}/${id}/donasi`)}
          >
            Lihat Daftar
          </Button>
        </StyledTableCell>
      ) : null}
      <StyledTableCell align="center" width="auto">
        <Stack
          direction="row"
          justifyContent="center"
          spacing={0}
          margin={0}
          padding={0}
        >
          <TableButtons />
        </Stack>
      </StyledTableCell>
    </StyledTableRow>
  );
}

export default TableDataRow;
