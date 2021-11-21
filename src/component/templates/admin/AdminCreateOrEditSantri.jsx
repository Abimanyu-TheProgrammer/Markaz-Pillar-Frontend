import { useRef, useState } from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography'
import Dropzone from "../../../component/modules/Dropzone";
import { FormControl } from "@mui/material";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { useAppContext } from "../../../context/AppContext";
import { dispatchTypes } from "../../../context/AppReducer";


function AdminCreateOrEditSantri(props) {
    const {
        isCreate,
        santri,
        setSantri,
        allMarkaz,
        error,
        apiCall,
    } = props;

    const { dispatch } = useAppContext();
    const form = useRef(null);

    const handleChangeSantri = ({ target }) => {
        const { name, value } = target;
        setSantri((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const [thumbnail, setThumbnail] = useState({});
    const handleSubmit = async (event) => {
        setLoading(true)
        event.preventDefault();
        const data = buildSantriFormData(santri, thumbnail)

        apiCall(isCreate ? santri.markaz_id : santri.id, data)
            .then(response => {
                setLoading(false)
                dispatch({
                    type: dispatchTypes.SNACKBAR_CUSTOM,
                    payload: {
                        severity: 'success',
                        message: isCreate ? "Santri Created" : "Santri Edited"
                    }
                })
            })
            .catch(e => {
                setLoading(false)
                // Check & Handle if e.response is defined
                if (!!e.response) {
                    // Check & Handle if bad request (empty fields, etc)
                    dispatch({
                        type: dispatchTypes.SNACKBAR_CUSTOM,
                        payload: {
                            severity: 'error',
                            message: 'Incorrect information'
                        }
                    });
                }
            })
    };


    const buildSantriFormData = (santriJson, thumbnailFile) => {
        const data = new FormData();
        const santriBlob = new Blob([JSON.stringify(santriJson)], {
            type: "application/json",
        });
        data.append("thumbnail", thumbnailFile);
        data.append("santri", santriBlob);
        return data;
    }

    const [loading, setLoading] = useState(false)
    if (error) return "Error has occured"
    if (!allMarkaz || loading) return "Loading..."
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
                                        accept={"image/*"}
                                        fileSize={1048576}
                                    />
                                </Grid>
                                {thumbnail.name &&
                                    <Grid item xs={12}>
                                        <Typography data-testid='dropzone-uploaded' variant="body1" color="initial">Uploaded: {thumbnail.name}</Typography>
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
                                        data-testid='santri-name-at-AdminCreateOrEditSantri-module'
                                        name="name"
                                        value={santri.name}
                                        label="Nama Santri"
                                        fullWidth
                                        onChange={handleChangeSantri}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        data-testid='santri-background-at-AdminCreateOrEditSantri-module'
                                        name="background"
                                        value={santri.background}
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
                                            data-testid='santri-gender-at-AdminCreateOrEditSantri-module'
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
                                        <InputLabel id="santri-label">Tempat Markaz</InputLabel>
                                        <Select
                                            labelId="santri-label"
                                            data-testid='santri-markaz-at-AdminCreateOrEditSantri-module'
                                            id="santri-select"
                                            name='markaz_id'
                                            value={santri.markaz_id}
                                            label="Tempat Markaz"
                                            onChange={handleChangeSantri}
                                        >
                                            {!!allMarkaz && allMarkaz.map(markaz => (
                                                <MenuItem key={markaz.id} value={markaz.id}>{markaz.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        data-testid='santri-address-at-AdminCreateOrEditSantri-module'
                                        name="address"
                                        value={santri.address}
                                        label="Domisili Asal"
                                        fullWidth
                                        onChange={handleChangeSantri}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        data-testid='santri-birthPlace-at-AdminCreateOrEditSantri-module'
                                        name="birthPlace"
                                        value={santri.birthPlace}
                                        label="Tempat Lahir"
                                        fullWidth
                                        onChange={handleChangeSantri}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        data-testid='santri-birthDate-at-AdminCreateOrEditSantri-module'
                                        name="birthDate"
                                        value={santri.birthDate}
                                        label="Tanggal Lahir"
                                        fullWidth
                                        onChange={handleChangeSantri}
                                        placeholder="YYYY-MM-DD"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        data-testid='santri-submit-button-at-AdminCreateOrEditSantri-module'
                                        type="submit" variant="contained" color="primary" fullWidth>
                                        Simpan
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Container>

        </div>
    )
}

export default AdminCreateOrEditSantri
