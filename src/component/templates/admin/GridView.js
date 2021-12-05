import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import GridViewCard from "../../modules/GridViewCard";
import Masonry from "@mui/lab/Masonry";
import { Box } from "@mui/system";
import { Container } from "@mui/material";

export default function GridView(props) {
  const { variant, data, disableMasonry, type } = props;
  // array of objects
  let fullResponseResult = data.result;



  const imageConverter = each => {
    if (variant === 'relawan') {
      return each.pictureURL;
    }
    return each.thumbnailURL
  }

  const descriptionConverter = each => {
    if (variant === 'kegiatan') {
      return each.description;
    }
    if (variant === 'relawan') {
      return each.ktp;
    }
    return each.background
  }


  if (!disableMasonry && !!fullResponseResult) {
    return (
      <Grid
        container
        spacing={3}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        {fullResponseResult.map((result) => (
          <Grid item key={result.id}>
            <GridViewCard fullResponseResult={result} image={imageConverter(result)} title={result.name} description={descriptionConverter(result)} {...props} />
          </Grid>
        ))}
      </Grid>
    );
  }


  return (
    <Container
      disableGutters
      maxWidth='lg'
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      {!!data && (
        <Box
          sx={{
            pl: 2,
            width: { xs: 300, sm: 552, md: 836, lg: 1200, xl: 1200 },
            minHeight: 300
          }}
        >
          <Masonry
            columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4 }}
            sx={{ justifyItems: "center", alignContent: "center" }}
          >
            {fullResponseResult.map((result) => (
              <Box key={result.id} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <GridViewCard fullResponseResult={result} image={result.thumbnailURL} title={result.name} description={result.background} {...props} />
              </Box>
            ))}
          </Masonry>
        </Box>
      )}
    </Container>
  );
}

