import React, { useEffect, useState } from "react";
import DetailView from '../../../component/templates/DetailView'
import { axiosMain } from '../../../axiosInstances';
import useSWR from "swr";
import { useRouter } from "next/router";
import ArrowBack from "../../../component/modules/ArrowBack";
import ProgresDonasiFooter from "../../../component/modules/ProgresDonasiFooter"
import { Typography } from "@mui/material";
import { enumRoutes } from "../../../context/AppReducer";
import Fallback from "../../_offline";
import useOnlineStatus from "../../../hook/useOnlineStatus";

const fetcher = url => axiosMain.get(url).then(res => res.data)
export default function DetailSantri(props) {
  const { detailSantri } = props
  const router = useRouter();
  const { santri_id } = router.query
  const { data: responseDetailSantri, error, mutate } = useSWR(router.isReady ? `/santri?id=${santri_id}` : null,
    fetcher,
    { fallbackData: detailSantri, refreshInterval: 10000 }
  )

  const [convertedData, setConvertedData] = useState()
  useEffect(() => {
    if (!!responseDetailSantri) {
      const dataResult = responseDetailSantri.result
      setConvertedData({
        ...responseDetailSantri,
        result: {
          ...dataResult,
          title: dataResult.name,
          description: dataResult.background,
          image: dataResult.thumbnailURL,
          details: [
            {
              subtitle: "Tempat Markaz",
              detail: dataResult.markaz.name
            },
            {
              subtitle: "Jenis Kelamin",
              detail: dataResult.gender
            },
            {
              subtitle: "Domisili Asal",
              detail: dataResult.birthPlace
            },
            {
              subtitle: "Kebutuhan Beasiswa",
              detail: dataResult.desc
            },
            {
              subtitle: "Tempat & Tanggal Lahir",
              detail: `${dataResult.birthPlace}, ${dataResult.birthDate}`
            },
          ],
          progress: dataResult.progress
        }
      })
    } else {
      mutate()
    }
  }, [mutate, responseDetailSantri])

  const isOnline = useOnlineStatus()
  if (error) {
    if (!isOnline) return (<Fallback />)
    return (<ArrowBack href={enumRoutes.MEMBER_SANTRI} />);
  }
  if (!responseDetailSantri) return (
    <>
      <ArrowBack href={enumRoutes.MEMBER_SANTRI} />
      <Typography component='p'>Loading Santri Information..</Typography>
    </>
  );
  return (
    <>
      <ArrowBack href={enumRoutes.MEMBER_SANTRI} />
      <DetailView variant='santri' data={convertedData} hrefDonasi={enumRoutes.MEMBER_SANTRI_DONASI} />
      <ProgresDonasiFooter data={convertedData} />
    </>
  );
}

export async function getStaticProps(context) {
  const id = context.params.santri_id;
  const staticDetailSantriResponse = await axiosMain.get(`/santri?id=${id}`)
  const staticDetailSantri = staticDetailSantriResponse.data
  return {
    props: {
      detailSantri: staticDetailSantri,
    },
    revalidate: 10
  };
}

export async function getStaticPaths() {
  const staticAllSantriResponse = await axiosMain.get(`/santri/search?n=1000`)
  const staticAllSantri = await staticAllSantriResponse.data

  const paths = await staticAllSantri.result.map((santri) => ({
    params: { santri_id: santri.id.toString() },
  }));

  return {
    paths: paths,
    fallback: false,
  };
}

