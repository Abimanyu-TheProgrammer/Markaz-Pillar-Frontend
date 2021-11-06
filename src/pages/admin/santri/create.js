import { useState, useRef } from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography'
import Dropzone from "../../../component/modules/Dropzone";
import { useAppContext } from "../../../context/AppContext";
import { FormControl } from "@mui/material";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { dispatchTypes } from "../../../context/AppReducer";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_HOST;

function AdminSantriCreate(props) {
    const { markazs } = props


    const { state, dispatch } = useAppContext();
    const { currentAccessToken } = state;
    const [thumbnail, setThumbnail] = useState({});
    const [santri, setSantri] = useState({
        name: "",
        background: "",
        gender: "",
        markaz_id: "",
        address: "",
        category: "",
        birthDate: "",
        birtPlace: ""
    });
    const form = useRef(null);

    const handleChangeSantri = ({ target }) => {
        const { name, value } = target;
        setSantri((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // API Route usage
        const data = new FormData();
        const santriBlob = new Blob([JSON.stringify(santri)], {
            type: "application/json",
        });
        data.append("thumbnail", thumbnail);
        data.append("santri", santriBlob);
        // Display the key/value pairs


        await fetch(`${BASE_URL}/admin/santri?markaz_id=${santri.markaz_id}`, {
            body: data,
            headers: {
                Accept: "application/json, text/plain, */*",
                Authorization: `Bearer ${currentAccessToken}`,
            },
            method: "POST",
        })
            .then((preResponse) => {
                preResponse.json()
                    .then((response) => {
                        if (preResponse.status === 201) {

                            dispatch({
                                type: dispatchTypes.SNACKBAR_CUSTOM,
                                payload: {
                                    message: "Santri Created"
                                }
                            })
                        } else if (preResponse.status === 400) {

                            dispatch({
                                type: dispatchTypes.SNACKBAR_CUSTOM,
                                payload: {
                                    message: "Incorrect information"
                                }
                            })
                        } else if (preResponse.status === 413) {

                            dispatch({
                                type: dispatchTypes.SNACKBAR_CUSTOM,
                                payload: {
                                    message: "File is too large"
                                }
                            })
                        }
                    })
                    .catch(e => {
                        return;
                    })
            }).catch(e => {
                return;
            })
    };


    return (
        <div>
            <Container>
                <form ref={form} onSubmit={handleSubmit} style={{ marginTop: "5%" }}>
                    <Grid
                        container
                        direction="column"
                        justifyContent="space-between"
                        alignItems="stretch"
                        spacing={5}
                    >
                        <Grid item>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="h5" color="initial">Upload an Image</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Dropzone
                                        name="thumbnail"
                                        setFile={setThumbnail}
                                        accept={"application/pdf"}
                                    />
                                </Grid>
                                {thumbnail.name &&
                                    <Grid item xs={12}>
                                        <Typography variant="body1" color="initial">Uploaded: {thumbnail.name}</Typography>
                                    </Grid>
                                }
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="h5" color="initial">Add Santri Detail</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="name"
                                        label="Nama Santri"
                                        fullWidth
                                        onChange={handleChangeSantri}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="background"
                                        label="Background"
                                        fullWidth
                                        onChange={handleChangeSantri}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="gender-label">Jenis Kelamin</InputLabel>
                                        <Select
                                            labelId="gender-label"
                                            id="gender-select"
                                            name='gender'
                                            value={santri.gender}
                                            label="Jenis Kelamin"
                                            onChange={handleChangeSantri}
                                        >
                                            <MenuItem value={"LAKI_LAKI"}>Laki-laki</MenuItem>
                                            <MenuItem value={"PEREMPUAN"}>Perempuan</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="markaz-label">Tempat Markaz</InputLabel>
                                        <Select
                                            labelId="markaz-label"
                                            id="markaz-select"
                                            name='markaz_id'
                                            value={santri.markaz}
                                            label="Tempat Markaz"
                                            onChange={handleChangeSantri}
                                        >
                                            {markazs.map(markaz => (
                                                <MenuItem key={markaz.id} value={markaz.id}>{markaz.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="address"
                                        label="Domisili Asal"
                                        fullWidth
                                        onChange={handleChangeSantri}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="birthPlace"
                                        label="Tempat Lahir"
                                        fullWidth
                                        onChange={handleChangeSantri}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="birthDate"
                                        label="Tanggal Lahir"
                                        fullWidth
                                        onChange={handleChangeSantri}
                                        placeholder="YYYY-MM-DD"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button type="submit" variant="contained" color="primary" fullWidth>
                                        Save
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </div>
    );
}

export default AdminSantriCreate;


export async function getStaticProps(context) {
    try {
        const res = await fetch(`${BASE_URL}/markaz/search?n=1000`);
        const data = await res.json();

        return {
            props: { markazs: data.result }, // will be passed to the page component as props
        };
    } catch {
        return {
            notFound: true,
        };
    }
}
