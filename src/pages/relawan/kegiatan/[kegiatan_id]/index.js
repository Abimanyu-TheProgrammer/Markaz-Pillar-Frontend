import React, { useEffect, useState } from "react";
import DetailView from "../../../../component/templates/DetailView";
import { axiosMain } from "../../../../axiosInstances";
import useSWR from "swr";
import { useRouter } from "next/router";
import ArrowBack from "../../../../component/modules/ArrowBack";
import { Button, Typography } from "@mui/material";
import Link from "next/link";
import TestimoniKegiatanFooter from "../../../../component/modules/TestimoniKegiatanFooter";
import { useAppContext } from "../../../../context/AppContext";
import { dispatchTypes, enumRoutes } from "../../../../context/AppReducer";

const fetcher = (url) => axiosMain.get(url).then((res) => res.data);


export default function DetailKegiatan(props) {
  const { detailKegiatan } = props;
  const router = useRouter();

  const { state, dispatch } = useAppContext();
  const { currentUser, stateLoaded } = state;

  const handleKegiatan = (href) => {
    if (stateLoaded && currentUser) {
      router.push({ pathname: href, query: { ...router.query } });
    } else {
      dispatch({ type: dispatchTypes.LOGIN_NEEDED_RELAWAN });
      router.push(enumRoutes.LOGIN);
    }
  };
  const { kegiatan_id } = router.query;
  const {
    data: responseDetailKegiatan,
    error,
    mutate,
  } = useSWR(router.isReady ? `/volunteer?id=${kegiatan_id}` : null, fetcher, {
    fallbackData: detailKegiatan,
    refreshInterval: 10000,
  });
  const [convertedData, setConvertedData] = useState();

  useEffect(() => {
    if (!!responseDetailKegiatan) {
      const dataResult = responseDetailKegiatan.result;
      setConvertedData({
        ...responseDetailKegiatan,
        result: {
          ...dataResult,
          title: dataResult.name,
          description: dataResult.description,
          image: dataResult.thumbnailURL,
          details: [
            {
              subtitle: "Syarat",
              detail: dataResult.term,
            },
            {
              subtitle: "Manfaat",
              detail: dataResult.benefit,
            },
            {
              subtitle: "Jumlah Volunteer",
              detail: `${dataResult.volunteerApplied} / ${dataResult.volunteerNeeded}`,
            },
            {
              subtitle: "Jadwal",
              detail: dataResult.schedule,
            },
            {
              subtitle: "Lokasi",
              detail: dataResult.location,
            },
          ],
        },
      });
    } else {
      mutate();
    }
  }, [mutate, responseDetailKegiatan]);

  const DaftarKegiatanCTA = () => {
    return (
      <>
        <Button
          variant="contained"
          onClick={() =>
            handleKegiatan(
              `${enumRoutes.MEMBER_KEGIATAN}/${kegiatan_id}/registrasi`
            )
          }
        >
          Daftar Sekarang
        </Button>
      </>
    );
  };

  if (error) return <ArrowBack href={enumRoutes.MEMBER_KEGIATAN} />;
  if (!responseDetailKegiatan) {
    return (
      <>
        <ArrowBack href={enumRoutes.MEMBER_KEGIATAN} />
        <Typography component="p">Loading Kegiatan Information..</Typography>
      </>
    );
  }
  return (
    <>
      <ArrowBack href={enumRoutes.MEMBER_KEGIATAN} />
      <DetailView
        disableDonasi
        CTA={<DaftarKegiatanCTA />}
        variant="kegiatan"
        data={convertedData}
      />
      <TestimoniKegiatanFooter data={convertedData} />
    </>
  );
}


export async function getStaticProps(context) {
  const id = context.params.kegiatan_id;
  const staticDetailKegiatanResponse = await axiosMain.get(
    `/volunteer?id=${id}`
  );
  const staticDetailKegiatan = staticDetailKegiatanResponse.data;
  return {
    props: {
      detailKegiatan: staticDetailKegiatan,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const staticAllKegiatanResponse = await axiosMain.get(`/volunteer`);
  const staticAllKegiatan = await staticAllKegiatanResponse.data;

  const paths = await staticAllKegiatan.result.map((kegiatan) => ({
    params: {
      kegiatan_id: kegiatan.id.toString()
    },
  }));

  return {
    paths: paths,
    fallback: false,
  };
}
