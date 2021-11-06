import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
<<<<<<< HEAD
<<<<<<< HEAD
import { FilterList } from "@mui/icons-material";
import { Chip } from "@mui/material";
=======
>>>>>>> 8fe651a (before rebasing)
=======
>>>>>>> bbd1a4f (before rebasing)
import Grid from "@mui/material/Grid";
import * as React from "react";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import { FormControl, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
<<<<<<< HEAD
<<<<<<< HEAD
=======
// import { Responsive } from "./Responsive";
>>>>>>> 8fe651a (before rebasing)
=======
// import { Responsive } from "./Responsive";
>>>>>>> bbd1a4f (before rebasing)
import PropTypes from "prop-types";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import RadioGroup from "@mui/material/RadioGroup";

const drawerBleeding = 56;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor:
    theme.palette.mode === "light" ? grey[0] : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

export default function FilterSantriMobile(props) {
<<<<<<< HEAD
<<<<<<< HEAD
  const {
    setSort,
    filter,
    ageFilter,
    setAgeFilter,
    nameFilter,
    setNameFilter,
    mutate,
  } = props;
=======
  const { setSort, filter } = props;
>>>>>>> 8fe651a (before rebasing)
=======
  const { setSort, filter } = props;
>>>>>>> bbd1a4f (before rebasing)

  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(true);
  const anchorRef = React.useRef(null);
  const [value, setValue] = React.useState();

  const { window } = props;
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // This is used only for the example
  const container =
    window !== undefined ? () => window().document.body : undefined;

<<<<<<< HEAD
<<<<<<< HEAD
  const handleChangeAge = (event) => {
    setAgeFilter(event.target.value);
    setNameFilter("");
    mutate();
  };

  const handleChangeName = (event) => {
    setNameFilter(event.target.value);
    setAgeFilter("");
    mutate();
  };
=======
=======
>>>>>>> bbd1a4f (before rebasing)
    const handleChangeSort = (event) => {
        // setChecked(event.target.checked);
        setValue(event.target.value);
        if (value === "desc") {
          setSort(filter.sort[0]);
        } else if (value === "asc") {
          setSort(filter.sort[1]);
        }
      };
    
      const handleChangeAge = (event) => {
        // setChecked(event.target.checked);
        setValue(event.target.value);
        if (value === "desc") {
          setSort(filter.age[0]);
        } else if (value === "asc") {
          setSort(filter.age[1]);
        }
      };
<<<<<<< HEAD
>>>>>>> 8fe651a (before rebasing)
=======
>>>>>>> bbd1a4f (before rebasing)

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Button
        variant="text"
        href
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
<<<<<<< HEAD
<<<<<<< HEAD
       <Chip
          data-testid="filterChipButton-at-admin-or-user-template"
          label="Filter"
          icon={<FilterList />}
        />
=======
        <FilterAltOutlinedIcon />
>>>>>>> 8fe651a (before rebasing)
=======
        <FilterAltOutlinedIcon />
>>>>>>> bbd1a4f (before rebasing)
      </Button>
      <Root>
        <CssBaseline />
        <Global
          styles={{
            ".MuiDrawer-root > .MuiPaper-root": {
              height: `calc(75% - ${drawerBleeding}px)`,
              overflow: "visible",
            },
          }}
        />

        <ClickAwayListener onClickAway={handleClose}>
          <SwipeableDrawer
            container={container}
            anchor="bottom"
            open={open}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            swipeAreaWidth={drawerBleeding}
            disableSwipeToOpen={false}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <StyledBox
              sx={{
                position: "absolute",
                top: -drawerBleeding,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                visibility: "visible",
                right: 0,
                left: 0,
                display: open ? "block" : "none",
                height: "100%",
              }}
            >
              <Typography variant="h6" ml={2}>
                Filter
              </Typography>
              <Puller
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
              />

              <ClickAwayListener onClickAway={handleClose}>
                <Box
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                  sx={{
                    overflow: "scroll",
                    height: "100%",
                  }}
                >
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>Urutkan Umur</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <FormControl component="fieldset">
                        <RadioGroup
<<<<<<< HEAD
<<<<<<< HEAD
                          value={ageFilter}
=======
                          value={value}
>>>>>>> 8fe651a (before rebasing)
=======
                          value={value}
>>>>>>> bbd1a4f (before rebasing)
                          onChange={handleChangeAge}
                        >
                          <FormControlLabel
                            control={<Radio />}
<<<<<<< HEAD
<<<<<<< HEAD
                            value="DESC"
=======
                            value="asc"
>>>>>>> 8fe651a (before rebasing)
=======
                            value="asc"
>>>>>>> bbd1a4f (before rebasing)
                            label="Termuda"
                          />
                          <FormControlLabel
                            control={<Radio />}
<<<<<<< HEAD
<<<<<<< HEAD
                            value="ASC"
=======
                            value="desc"
>>>>>>> 8fe651a (before rebasing)
=======
                            value="desc"
>>>>>>> bbd1a4f (before rebasing)
                            label="Tertua"
                          />
                        </RadioGroup>
                      </FormControl>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
<<<<<<< HEAD
<<<<<<< HEAD
                      aria-controls="panel2a-content"
                      id="panel2a-header"
=======
                      aria-controls="panel1a-content"
                      id="panel1a-header"
>>>>>>> 8fe651a (before rebasing)
=======
                      aria-controls="panel1a-content"
                      id="panel1a-header"
>>>>>>> bbd1a4f (before rebasing)
                    >
                      <Typography>Urutkan Nama</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
<<<<<<< HEAD
<<<<<<< HEAD
                      <FormControl component="fieldset">
                        <RadioGroup
                          value={nameFilter}
                          onChange={handleChangeName}
                        >
                          <FormControlLabel
                            control={<Radio />}
                            value="ASC"
                            label="A-Z"
                          />
                          <FormControlLabel
                            control={<Radio />}
                            value="DESC"
                            label="Z-A"
                          />
                        </RadioGroup>
=======
=======
>>>>>>> bbd1a4f (before rebasing)
                    <FormControl component="fieldset">
                      <RadioGroup value={value} onChange={handleChangeSort}>
                        <FormControlLabel
                          control={<Radio />}
                          value="desc"
                          label="A-Z"
                        />
                        <FormControlLabel
                          control={<Radio />}
                          value="asc"
                          label="Z-A"
                        />
                      </RadioGroup>
<<<<<<< HEAD
>>>>>>> 8fe651a (before rebasing)
=======
>>>>>>> bbd1a4f (before rebasing)
                      </FormControl>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              </ClickAwayListener>
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> bbd1a4f (before rebasing)
              {/* // </Paper> */}
              {/* </Grow> */}
              {/* )} */}
              {/* </Popper> */}
<<<<<<< HEAD
>>>>>>> 8fe651a (before rebasing)
=======
>>>>>>> bbd1a4f (before rebasing)
            </StyledBox>
          </SwipeableDrawer>
        </ClickAwayListener>
      </Root>
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> bbd1a4f (before rebasing)
      {/* <Responsive displayIn={["Laptop"]}> */}

      {/* </Responsive> */}
      {/* <Responsive displayIn={["Mobile"]}>
        noooooooo
      </Responsive> */}
<<<<<<< HEAD
>>>>>>> 8fe651a (before rebasing)
=======
>>>>>>> bbd1a4f (before rebasing)
    </>
  );
}
