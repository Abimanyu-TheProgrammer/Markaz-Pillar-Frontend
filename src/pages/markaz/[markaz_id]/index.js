import React from "react";
import DetailView from '../../../component/templates/DetailView'
import { axiosMain } from '../../../axiosInstances';
import useSWR from "swr";
import { useRouter } from "next/router";
import ArrowBack from "../../../component/modules/ArrowBack";
import ProgresDonasiFooter from "../../../component/modules/ProgresDonasiFooter"
import { enumRoutes, markazCategory } from "../../../context/AppReducer";
import { Typography } from "@mui/material";

const fetcher = url => axiosMain.get(url).then(res => res.data)
export default function MarkazDetail(props) {
  const { detailMarkaz } = props
  const router = useRouter();
  const { markaz_id } = router.query
  const { data: responseDetailMarkaz, error } = useSWR(router.isReady ? `/markaz?id=${markaz_id}` : null,
    fetcher,
    { fallbackData: detailMarkaz, refreshInterval: 10000 }
  )

  const dataResult = {
    ...responseDetailMarkaz.result
  }
  const convertedDataMarkaz = {
    title: dataResult.name,
    description: dataResult.background,
    image: dataResult.thumbnailURL,
    details: [
      {
        subtitle: "Kategori",
        detail: dataResult.category.split("_").join(" ").toLowerCase(),
      },
      {
        subtitle: "Contact Person",
        detail: dataResult.contactInfo,
      },
      {
        subtitle: "Contact Name",
        detail: dataResult.contactName,
      },
      {
        subtitle: "Alamat",
        detail: dataResult.contactInfo,
      },
    ],
    donation: [
      {
        subtitle: "Nominal yang dibutuhkan",
        detail: dataResult.nominal
      },
    ],
    progress: dataResult.progress
  }

  const convertedData = {
    ...responseDetailMarkaz,
    result: {
      ...dataResult,
      ...convertedDataMarkaz
    }
  }

  if (error) return (<ArrowBack href={enumRoutes.MEMBER_MARKAZ} />);
  if (!responseDetailMarkaz) return (
    <>
      <ArrowBack href={enumRoutes.MEMBER_MARKAZ} />
      <Typography component='p'>Loading Markaz Information..</Typography>
    </>
  );
  return (
    <>
      <ArrowBack href={enumRoutes.MEMBER_MARKAZ} />
      <DetailView variant='markaz' data={convertedData} hrefDonasi={enumRoutes.MEMBER_MARKAZ_DONASI} />
      {convertedData.result.nominal && (
        <ProgresDonasiFooter data={convertedData} />
      )}
    </>
  );
}

export async function getStaticProps(context) {
  const id = context.params.markaz_id;
  const staticDetailMarkazResponse = await axiosMain.get(`/markaz?id=${id}`)
  const staticDetailMarkaz = staticDetailMarkazResponse.data
  return {
    props: {
      detailMarkaz: staticDetailMarkaz,
    },
    revalidate: 10
  };
}

export async function getStaticPaths() {
  const staticAllMarkazResponse = await axiosMain.get(`/markaz/search?n=1000`)
  const staticAllMarkaz = await staticAllMarkazResponse.data

  const paths = await staticAllMarkaz.result.map((markaz) => ({
    params: { markaz_id: markaz.id.toString() },
  }));

  return {
    paths: paths,
    fallback: false,
  };
}

