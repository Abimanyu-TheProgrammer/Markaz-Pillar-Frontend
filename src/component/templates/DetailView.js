import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import {
  Backdrop,
  Button,
  Container,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import Add from "@mui/icons-material/Add";
import { useRouter } from "next/router";
import { makeStyles } from "@mui/styles";
import ProgresDonasiBar from "../modules/ProgresDonasiBar";

import Link from 'next/link'
import { dispatchTypes, enumRoutes } from "../../context/AppReducer";
import { useAppContext } from "../../context/AppContext";

const useStyles = makeStyles((theme) => ({
  staticTooltipLabel: {
    whiteSpace: "nowrap",
    maxWidth: "none",
  },
  /// speed dial stuff
}));

export default function DetailView(props) {
  const { isAdmin, data, variant, CTA, speedDialActions, hrefDonasi, disableDonasi, deleteApiCall } = props

  const { dispatch } = useAppContext()
  const result = !!data ? data.result : null;
  const router = useRouter();
  const path = router.pathname;


  const isDisabled = disableDonasi || !!result && result.nominal === null



  // *******************************************************
  // Delete
  // *******************************************************
  const handleDeleteSantri = async (id) => {
    await deleteApiCall(id)
      .then((response) => {
        // Dispatch Successfully deleted
        dispatch({
          type: dispatchTypes.DELETE_SUCCEED
        })
        router.push(`/admin/${variant}`)
      })
      .catch((e) => {
        if (e.response.data.status === 401) {
          localStorage.clear();
        }
      });
  };

  const actions = speedDialActions
    ? speedDialActions
    : [
      {
        name: "Create Donasi",
        icon: <Add />,
        onClick: `${path}/donasi/create`,
      },
    ];

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const classes = useStyles();
  const isSM = useMediaQuery("(max-width:600px)");

  if (!data) {
    return (
      <>
        <Box>
          <Typography>Loading...</Typography>
        </Box>
      </>
    );
  }


  return (
    <>
      <Grid
        container
        spacing={3}
        sx={{ display: "flex", justifyContent: "center", mb: "2em" }}
        direction="row-reverse"
      >
        <Grid item xs={12} md={6} >
          {variant === "kegiatan" ?
            (<Container disableGutters >
              <Image src={result.image} layout='responsive'
                width={16} height={16} quality={65} sizes={20} alt='Backdrop' />
              <Container disableGutters sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mt: 2, mb: 2, p: 2 }} >
                {CTA}
              </Container>
            </Container>) : (
              <Container disableGutters >
                <Image src={result.image} layout='responsive'
                  width={16} height={16} quality={65} sizes={20} alt='' />
                {isDisabled ? null : (
                  <ProgresDonasiBar {...props} donated={result.donated} nominal={result.nominal} hrefDonasi={hrefDonasi} />
                )}
              </Container>
            )}
        </Grid>
        <Grid item xs={12} md={6} width="100%">
          <Typography
            variant="h4"
            color="primary"
            component="h1"
            gutterBottom
            sx={{ textTransform: "capitalize", fontWeight: "600", overflowX: 'scroll', overflowY: 'hidden' }}
          >
            {!!data ? result.title : variant + "..."}
          </Typography>
          {!!data ? (
            <Box display="flex" flexDirection="column" height="100%">
              <Typography
                variant={isSM ? "h4" : "h2"}
                component="p"
                gutterBottom
                mb={4}
                sx={{ fontWeight: "200" }}
              >
                {result.description}
              </Typography>
              <Grid data-testid="detail-at-detailview" container spacing={2}>
                {result.details.map((detail, index) => (
                  <>
                    {!!detail.detail && (
                      <Grid key={index + detail.subtitle} item xs={12} sm={6}>
                        <Typography
                          color="secondary"
                          variant="h6"
                          component="h6"
                          sx={{ textTransform: 'capitalize' }}
                        >
                          {detail.subtitle}
                        </Typography>
                        <Typography variant="h5" component="p" sx={{ textTransform: 'capitalize' }}>
                          {detail.detail}
                        </Typography>
                      </Grid>
                    )}
                  </>
                ))}
                {isAdmin && (
                  <Grid item xs={12} sm={6} md={12} mt={4}>
                    <Stack direction='row' spacing={2}>
                      <Link href={`/admin/${variant}/${result.id}/edit`} passHref>
                        <Button fullWidth variant='outlined' color='primary'>Edit {variant}</Button>
                      </Link>
                      <Button fullWidth variant='outlined' onClick={() => handleDeleteSantri(result.id)}>Delete {variant}</Button>
                    </ Stack>
                  </Grid>)}
              </Grid>
            </Box>
          ) : (
            "Loading.."
          )}
        </Grid>
      </Grid>
      {isAdmin && (
        <>
          <Backdrop open={open} sx={{ zIndex: 100 }} />
          <SpeedDial
            ariaLabel="SpeedDial Detail View"
            sx={{ position: "fixed", bottom: "3em", right: "2em" }}
            icon={<SpeedDialIcon />}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                tooltipOpen
                classes={classes}
                TooltipClasses={classes}
                onClick={() => router.push({ pathname: `${action.onClick}`, query: { ...router.query } })}
              />
            ))}
          </SpeedDial>
        </>
      )}
    </>
  );
}
