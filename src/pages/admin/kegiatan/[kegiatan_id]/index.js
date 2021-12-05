import React, { useEffect, useState } from "react";
import DetailView from "../../../../component/templates/DetailView";
import { axiosMain } from '../../../../axiosInstances';
import useSWR from "swr";
import { useRouter } from "next/router";
import ArrowBack from "../../../../component/modules/ArrowBack";
import { Button, Typography } from "@mui/material";
import Link from 'next/link'
import TestimoniKegiatanFooter from "../../../../component/modules/TestimoniKegiatanFooter";
import Add from "@mui/icons-material/Add";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useAppContext } from '../../../../context/AppContext';
import { dispatchTypes, enumRoutes } from '../../../../context/AppReducer';

const fetcher = url => axiosMain.get(url).then(res => res.data)
export default function DetailKegiatan() {
    const router = useRouter();

    const { state, dispatch } = useAppContext()
    const { currentUser, stateLoaded } = state;


    const deleteKegiatan = async (id) => {
        return axiosMain.delete(`/admin/volunteer?id=${id}`)
    }

    const handleRelawan = (href) => {
        if (stateLoaded && currentUser) {
            router.push({ pathname: href, query: { ...router.query } })
        } else {
            dispatch({ type: dispatchTypes.LOGIN_NEEDED_RELAWAN })
            router.push(enumRoutes.LOGIN)
        }
    }
    const { kegiatan_id } = router.query
    const { data: responseDetailKegiatan, error, mutate } = useSWR(router.isReady ? `/volunteer?id=${kegiatan_id}` : null, fetcher)


    const [convertedData, setConvertedData] = useState()
    useEffect(() => {
        if (!!responseDetailKegiatan) {
            const dataResult = responseDetailKegiatan.result
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
                            subtitle: "Tanggal Pelaksanaan",
                            detail: dataResult.schedule,
                        },
                        {
                            subtitle: "Lokasi",
                            detail: dataResult.location,
                        },
                        {
                            subtitle: "Markaz Pelaksana",
                            detail: dataResult.markaz.name,
                        },
                        {
                            subtitle: "Pendaftaran Dibuka",
                            detail: dataResult.programOpened,
                        },
                        {
                            subtitle: "Pendaftaran Ditutup",
                            detail: dataResult.programClosed,
                        },
                        {
                            subtitle: "Program Selesai",
                            detail: dataResult.programCompleted.split("T").join(" "),
                        },
                        {
                            subtitle: "Status Kegiatan",
                            detail: dataResult.status.split('_').join(" ").toLowerCase(),
                        },
                    ],
                },
            })
        }

    }, [responseDetailKegiatan])

    const KelolaKegiatanCTA = () => {
        return (
            <>
                <Button variant='contained' onClick={() => handleRelawan(`${enumRoutes.ADMIN_KEGIATAN}/${kegiatan_id}/relawan`)}>Kelola Relawan</Button>
            </>
        )
    }

    const deleteTestimoni = async (id) => {
        return axiosMain.delete(`/admin/volunteer/testimony?id=${id}`)
    }

    const AdminDetailKegiatanActions = [
        {
            name: "Kelola Relawan",
            icon: <PeopleAltIcon />,
            onClick: `${enumRoutes.ADMIN_KEGIATAN}/${kegiatan_id}/relawan`
        },
        {
            name: "Create Testimoni",
            icon: <Add />,
            onClick: `${enumRoutes.ADMIN_KEGIATAN}/${kegiatan_id}/testimoni/create`
        },
    ]


    if (error) return (<ArrowBack href={enumRoutes.ADMIN_KEGIATAN} />);
    if (!responseDetailKegiatan) return (
        <>
            <ArrowBack href={enumRoutes.ADMIN_KEGIATAN} />
            <Typography component='p'>Loading Kegiatan Information..</Typography>
        </>
    );
    return (
        <>
            <ArrowBack href={enumRoutes.ADMIN_KEGIATAN} />
            <DetailView isAdmin disableDonasi CTA={<KelolaKegiatanCTA />} variant='kegiatan' data={convertedData} deleteApiCall={deleteKegiatan} speedDialActions={AdminDetailKegiatanActions} />
            <TestimoniKegiatanFooter isAdmin data={convertedData} mutate={mutate} apiCall={deleteTestimoni} />
        </>
    );
}

