import { useState, useEffect, useCallback } from "react";
import { enumRoutes } from "../../../../context/AppReducer";
import AdminCreateOrEditSantri from "../../../../component/templates/admin/AdminCreateOrEditSantri";
import { axiosMain, axiosFormData } from "../../../../axiosInstances";
import ArrowBack from "../../../../component/modules/ArrowBack";
import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = (url) => axiosMain.get(url).then((res) => res.data);

export default function AdminSantriEdit() {
    const router = useRouter();
    const { santri_id } = router.query
    const { data: responseDetailAdminSantri, error: errorDetailAdminSantri } = useSWR(router.isReady ? `/santri?id=${santri_id}` : null,
        fetcher,
    );
    const { data: responseAllMarkaz, error: errorResponseAllMarkaz } = useSWR(router.isReady ? `/markaz/search?n=1000` : null,
        fetcher,
    );

    const [editedSantri, setEditedSantri] = useState({
        markazId: ""
    });

    
    const editSantri = useCallback(async (data) => {
        return axiosFormData.post(`/admin/santri/edit?id=${santri_id}`, data)
    }, [santri_id])

    const [allMarkaz, setAllMarkaz] = useState()

    // We use useEffect because we store the useSwr Data into
    useEffect(() => {
        if (responseDetailAdminSantri) {
            setEditedSantri({
                ...responseDetailAdminSantri.result,
                markazId: responseDetailAdminSantri.result.markaz.id
            })
        }
        if (responseAllMarkaz) {
            setAllMarkaz([...responseAllMarkaz.result])
        }
    }, [responseAllMarkaz, responseDetailAdminSantri])


    if (errorDetailAdminSantri || errorResponseAllMarkaz) {
        return "Error"
    }
    if (!responseDetailAdminSantri) return "wait.."
    if (!responseAllMarkaz) return "wait.."
    return (
        <>
            <ArrowBack href={`${enumRoutes.ADMIN_SANTRI}/${santri_id}`} />
            <AdminCreateOrEditSantri
                variant='edit'
                santri={editedSantri}
                santri_id={santri_id}
                setSantri={setEditedSantri}
                originalSantri={responseDetailAdminSantri}
                allMarkaz={allMarkaz}
                apiCall={editSantri}
            />
        </>
    )
}
