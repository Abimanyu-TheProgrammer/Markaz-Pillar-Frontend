import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import { Grid, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import Link from "next/link";
import LandingGridView from "../../../component/templates/LandingGridView";
import { axiosMain } from "../../../axiosInstances";
import useSWR from "swr";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAppContext } from '../../../context/AppContext';
import { dispatchTypes, enumRoutes } from '../../../context/AppReducer';

const useStyles = makeStyles((theme) => ({
  content: {
    padding: "7%",
    textAlign: "left",
    width: "100%",
  },
  contentCenter: {
    padding: "7%",
    textAlign: "center",
  },
  bg: {
    backgroundColor: "#f1f4f5",
  },
  sub: {
    color: "#004F5D",
  },
  heading: {
    fontSize: "200%",
    padding: "7%",
    textAlign: "center",
  },
  btn: {
    backgroundColor: "#004F5D",
    color: "#FFFFFF",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  pad1: {
    padding: "3%",
  },
  email: {
    textAlign: "center",
  },
}));

const fetcher = (url) => axiosMain.get(url).then((res) => res.data);

export default function Home(props) {
  const { allKegiatanRandom, allKegiatanOpen, allKegiatanDone } = props
  const classes = useStyles();
  const theme = useTheme();
  const [page1, setPage1] = useState(1);
  const [page2, setPage2] = useState(1);

    const { data: responseRandomProgram, error: error1 } = useSWR(
      `/volunteer/random
  `,
      fetcher,
      { fallbackData: allKegiatanRandom, refreshInterval: 10000 }
    );

  const { data: responseProgram, error: error2 } = useSWR(
    `/volunteer?n=4&page=${page1 - 1}&status=MEMBUKA_PENDAFTARAN
`,
    fetcher, { fallbackData: allKegiatanOpen, refreshInterval: 10000 }
  );

  const { data: responseProgram2, error: error3 } = useSWR(
    `/volunteer?n=4&page=${page2 - 1}&status=SUDAH_DILAKSANAKAN
`,
    fetcher, { fallbackData: allKegiatanDone, refreshInterval: 10000 }
  );
  
  const router = useRouter();

  const { state, dispatch } = useAppContext()
  const { currentUser, stateLoaded } = state;


  const handleKegiatan = (href) => {
    if (stateLoaded && currentUser) {
        router.push({ pathname: href, query: { ...router.query } })
    } else {
        dispatch({ type: dispatchTypes.LOGIN_NEEDED_RELAWAN })
        router.push(enumRoutes.LOGIN)
    }
}

  const matches = useMediaQuery("(max-width:600px)");
  const size = matches ? "small" : "medium";



  if (error3 && error2 && error1) {
    return "an error has occured.";
  }
  if (!responseProgram) {
    return "loading..";
  }
  if (!responseProgram2) {
    return "loading.."
  }
  if (!responseRandomProgram) {
    return "loading...";
  }

  return (
    <>
      {!!responseProgram && !!responseProgram2 &&!!responseRandomProgram && (
        <>
          <div className={classes.bg}>
            <div className={classes.pad1}>
              <Grid container spacing={0}>
                <Grid
                  item
                  xs={10}
                  sm={6}
                  md={6}
                  className={classes.heading}
                  sx={{
                    backgroundImage: `url(${responseRandomProgram.result.thumbnailURL})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <Grid item xs={12} sm={6} md={6} className={classes.content}>
                  <Typography component="h1">
                    <b className={classes.sub}>
                      Kegiatan Relawan <br />
                      <br />
                    </b>
                  </Typography>
                  <Typography component="h2" variant="h5">
                    {responseRandomProgram.result.name}
                  </Typography>
                  <br />
                  <Typography>
                    {responseRandomProgram.result.description}
                  </Typography>
                  <Stack
                    direction="row"
                    width="100%"
                    spacing={2}
                    sx={{ p: 1 }}
                    mt={4}
                  >
                      <Button
                        data-testid="daftar-sekarang-button-relawan-kegiatan"
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="small"
                        onClick={() => handleKegiatan(`${enumRoutes.MEMBER_KEGIATAN}/${responseRandomProgram.result.id}/registrasi`)}
                      >
                        Daftar Sekarang
                      </Button>
                    <Link
                      href={`kegiatan/${responseRandomProgram.result.id}`}
                      passHref
                    >
                      <Button
                        data-testid="lihat-detail-button-relawan-kegiatan"
                        variant="outlined"
                        color="primary"
                        fullWidth
                        size="small"
                      >
                        Lihat Detail
                      </Button>
                    </Link>
                  </Stack>
                </Grid>
              </Grid>
            </div>
          </div>
          <Grid container mt={9}>
            <LandingGridView
              data-testid="landing-grid-view"
              type={"open"}
              data={responseProgram}
              size={size}
              page={page1}
              setPage={setPage1}
              variant='kegiatan'
            />
            <LandingGridView
              data-testid="landing-grid-view"
              type={"close"}
              data={responseProgram2}
              size={size}
              page={page2}
              setPage={setPage2}
              variant='kegiatan'
            />
          </Grid>
        </>
      )}
    </>
  );
}

export async function getStaticProps() {
  const staticKegiatanRandomResponse = await axiosMain.get(`/volunteer/random`);
  const staticKegiatanRandom = await staticKegiatanRandomResponse.data

  const staticKegiatanOpenResponse = await axiosMain.get(`/volunteer?n=1000&status=MEMBUKA_PENDAFTARAN`);
  const staticKegiatanOpen = await staticKegiatanOpenResponse.data

  const staticKegiatanDoneResponse = await axiosMain.get(`/volunteer?n=1000&status=SUDAH_DILAKSANAKAN`);
  const staticKegiatanDone = await staticKegiatanDoneResponse.data

  return {
    props: {
      allKegiatanRandom: staticKegiatanRandom,
      allKegiatanOpen: staticKegiatanOpen,
      allKegiatanDone: staticKegiatanDone,
    },
    revalidate: 10,
  };
}
