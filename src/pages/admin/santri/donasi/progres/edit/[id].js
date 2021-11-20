import { useState, useRef } from "react";
import { useAppContext } from "../../../../../../context/AppContext";
import { dispatchTypes } from "../../../../../../context/AppReducer";
import { axiosFormData } from "../../../../../../axiosInstances";
import { useRouter } from 'next/router';
import AdminCreateOrEditProgres from "../../../../../../component/templates/admin/AdminCreateOrEditProgres";

function AdminEditSantriProgressDonasi(props) {
    const { dispatch } = useAppContext();
    const [thumbnail, setThumbnail] = useState({});
    const { responseMarkaz } = props
    const [editedProgres, setEditedProgres] = useState({
        progressDate: "",
        description: "",
    });
    const form = useRef(null);

    const handleChangeProgres = ({ target }) => {
        const { name, value } = target;
        setEditedProgres((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        setLoading(true)
        event.preventDefault();
        const data = new FormData();
        const progresBlob = new Blob([JSON.stringify(editedProgres)], {
            type: "application/json",
        });
        data.append("thumbnail", thumbnail);
        data.append("progres", progresBlob);

        await axiosFormData
            .post("/admin/santri", data)
            .then(response => {
                setLoading(false)

                dispatch({
                    type: dispatchTypes.SNACKBAR_CUSTOM,
                    payload: {
                        severity: 'success',
                        message: "Progres Edited"
                    }
                })
            })
            .catch(error => {
                setLoading(false)

                // Check & Handle if error.response is undefined
                if (!!error.response) {
                    if (error.response.status === 400) {

                        dispatch({
                            type: dispatchTypes.SNACKBAR_CUSTOM,
                            payload: {
                                severity: 'error',
                                message: 'Incorrect information'
                            }
                        });
                    } else if (error.response.status === 413) {

                        dispatch({
                            type: dispatchTypes.SNACKBAR_CUSTOM,
                            payload: {
                                severity: 'error',
                                message: 'The image size is too large'
                            }
                        });
                    } else {

                        dispatch({
                            type: dispatchTypes.SERVER_ERROR
                        });
                    }
                } else {
                    dispatch({
                        type: dispatchTypes.SERVER_ERROR
                    });
                }
            })
    };

    const router = useRouter()
    const pathname = router.pathname;
    const [loading, setLoading] = useState(false)
    return (
        <AdminCreateOrEditProgres
            form={form}
            handleSubmit={handleSubmit}
            thumbnail={thumbnail}
            setThumbnail={setThumbnail}
            loading={loading}
            createOrEdit="Edit"
            markazOrSantri="Santri"
            handleChangeProgres={handleChangeProgres}
            progres={editedProgres}
            />
    );
}

export default AdminEditSantriProgressDonasi;
