import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { FilterList } from "@mui/icons-material";
import { Chip } from "@mui/material";
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
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RadioGroup from "@mui/material/RadioGroup";
import { Box } from "@mui/system";
import { FormControl } from "@mui/material";

export default function FilterMarkaz(props) {
  const {
    setNameFilter,
    setLocationFilter,
    setCategoryFilter,
    mutate,
  } = props;

  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(
    // new Array(3).fill(false)
  );
  const anchorRef = React.useRef(null);
  const [value, setValue] = React.useState();

  // const { PEMBANGUNAN_MARKAZ, RENOVASI, PENAMBAHAN_FASILITAS } = categoryFilter;

  const handleChangeName = (event) => {
    setNameFilter(event.target.value);
    setLocationFilter("");
    setCategoryFilter("");
    mutate();
  };

  const handleChangeLocation = (event) => {     
    setLocationFilter(event.target.value);
    setNameFilter("");
    setCategoryFilter("");
    mutate();
  };

  const handleChangeCategory = (event) => {
  //   setChecked(event.target.checked);
  //   const updatedCheck = checked.map((item,index)=>
  //   index === position? !item: item
  // );

  //   setChecked(updatedCheck);
    // setCategoryFilter({  
    //   ...categoryFilter,
    //   [event.target.name]: event.target.checked,
    // });

    setCategoryFilter(event.target.value);

    // const prevs = event.target.value
    // prevs != event.target.value? setCategoryFilter2(event.target.value):setCategoryFilter2("");
    // const prevs2 = event.target.value;
    // prevs2 != event.target.value? setCategoryFilter3(event.target.value):setCategoryFilter3("");
    setNameFilter("");
    mutate();
  };

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
         <Chip
          data-testid="filterChipButton-at-admin-or-user-template"
          label="Filter"
          icon={<FilterList />}
        />
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
        style={{ zIndex: '1000'}}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <Box
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  <Typography variant="h6" ml={2}>
                    Filter
                  </Typography>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>Lokasi</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <FormControl component="fieldset">
                        <RadioGroup
                          value={value}
                          onChange={handleChangeLocation}
                        >
                          <FormControlLabel
                            control={<Radio />}
                            value="false"
                            label="Luar Jabodetabek"
                          />
                          <FormControlLabel
                            control={<Radio />}
                            value="true"
                            label="Jabodetabek"
                          />
                        </RadioGroup>
                      </FormControl>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>Urutkan Nama</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <FormControl component="fieldset">
                        <RadioGroup value={value} onChange={handleChangeName}>
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
                      </FormControl>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>Kategori</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <FormControl component="fieldset">
                        <FormGroup
                        // value={value}
                        // onChange={handleChangeCategory}
                        >
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={checked}
                                onChange={handleChangeCategory}
                                name="PEMBANGUNAN_MARKAZ"
                              />
                            }
                            value="PEMBANGUNAN_MARKAZ"
                            label="Pembangunan Markaz"
                          />

                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={checked}
                                onChange={handleChangeCategory}
                                name="RENOVASI"
                              />
                            }
                            value="RENOVASI"
                            label="Renovasi"
                          />

                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={checked}
                                onChange={handleChangeCategory}
                                name="PENAMBAHAN_FASILITAS"
                              />
                            }
                            value="PENAMBAHAN_FASILITAS"
                            label="Penambahan Fasilitas"
                          />
                        </FormGroup>
                      </FormControl>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}