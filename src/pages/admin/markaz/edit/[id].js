import { useState, useRef } from "react";
import { useAppContext } from "../../../../context/AppContext";
import { dispatchTypes } from "../../../../context/AppReducer";
import AdminCreateOrEditMarkaz from "../../../../component/templates/admin/AdminCreateOrEditMarkaz";
import { axiosFormData } from "../../../../axiosInstances";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_HOST;

export default function AdminMarkazEdit(props) {
    const { responseMarkaz } = props
    const { dispatch } = useAppContext();
    const [thumbnail, setThumbnail] = useState({});
    const [editedMarkaz, setEditedMarkaz] = useState({
        name: responseMarkaz.name,
        background: responseMarkaz.background,
        category: responseMarkaz.category,
        address: responseMarkaz.address,
        contactName: responseMarkaz.contactName,
        contactInfo: responseMarkaz.contactInfo
    });
    const form = useRef(null);

    const handleChangeMarkaz = ({ target }) => {
        const { name, value } = target;
        setEditedMarkaz((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        setLoading(true)
        event.preventDefault();
        const data = new FormData();
        const editedMarkazBlob = new Blob([JSON.stringify(editedMarkaz)], {
            type: "application/json",
        });
        data.append("thumbnail", thumbnail);
        data.append("markaz", editedMarkazBlob);

        await axiosFormData
            .post(`/admin/markaz/edit?id=${responseMarkaz.id}`, data)
            .then(response => {
                setLoading(false)
                console.log(response);
                dispatch({
                    type: dispatchTypes.SNACKBAR_CUSTOM,
                    payload: {
                        severity: 'success',
                        message: "Markaz Edited"
                    }
                })
            })
            .catch(error => {
                setLoading(false)
                console.log(error);
                // Check & Handle if error.response is undefined
                if (!!error.response) {
                    if (error.response.status === 400) {
                        console.log(error.response.message);
                        dispatch({
                            type: dispatchTypes.SNACKBAR_CUSTOM,
                            payload: {
                                severity: 'error',
                                message: 'Incorrect edited information'
                            }
                        });
                    } else if (error.response.status === 413) {
                        console.log(error.response.message);
                        dispatch({
                            type: dispatchTypes.SNACKBAR_CUSTOM,
                            payload: {
                                severity: 'error',
                                message: 'The new thumbnail size is too large'
                            }
                        });
                    } else {
                        console.log(error.response.message);
                        dispatch({
                            type: dispatchTypes.SERVER_ERROR
                        });
                    }
                } else {
                    console.log(error.response);
                    dispatch({
                        type: dispatchTypes.SERVER_ERROR
                    });
                }
            })
    };

    const [loading, setLoading] = useState(false)
    return (
        <AdminCreateOrEditMarkaz
            form={form}
            loading={loading}
            handleSubmit={handleSubmit}
            handleChangeMarkaz={handleChangeMarkaz}
            setThumbnail={setThumbnail}
            thumbnail={thumbnail}
            markaz={editedMarkaz}
        />
    )
}

export async function getStaticProps(context) {
    const id = context.params.id;
    const response = await fetch(`${BASE_URL}/markaz?id=` + id);
    const data = await response.json();
    const markaz = data.result;

    return {
        props: {
            responseMarkaz: markaz,
        },
    };
}

export async function getStaticPaths() {
    const response = await fetch(`${BASE_URL}/markaz/search`);
    const data = await response.json();
    const markaz = data.result;

    const paths = markaz.map((markaz) => ({
        params: { id: markaz.id.toString() },
    }));

    return {
        paths: paths,
        fallback: false,
    };
}

