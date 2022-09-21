import React, { useState } from 'react';
import './JobDetail.css';

import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import { AccordionDetails, AccordionSummary, CircularProgress, TextField } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

//delete
export type JobParameter = {
  name: string;
  value: string;
};

function JobDetail() {
  const [loading, setLoading] = useState(false);

  let props = {
    jobId: "job-12"
  }

  let advancedOptions: JobParameter[] = [{ "name": "option 1", "value": "hello" }, { "name": "option 2", "value": "value 2" }];

  return (
    <>
      <Button onClick={_ => setLoading(!loading)}> Toggle loading </Button>
      <Box>
        {/* rework to conditionally SHOW/HIDE content */}
        {loading ? <CircularProgress /> :
          <Stack spacing={1}>
            <div role="presentation" onClick={_ => alert("breadcrumb click!")}>
              <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                  Jobs
                </Link>
                <Link
                  underline="hover"
                  color="inherit"
                  href="/material-ui/getting-started/installation/"
                >
                  {props.jobId}
                </Link>
              </Breadcrumbs>
            </div>
            <Stack direction="row" spacing={1} justifyContent="flex-end">
              <Button> Rerun Job </Button>
              <Button> Delete </Button>
            </Stack>
            <Box sx={{
              border: 1,
              borderColor: 'black',
              width: 300,
              height: 300
            }}> Core Properties </Box>

            <Accordion defaultExpanded={advancedOptions.length > 0} disabled={advancedOptions.length === 0}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel-content"
                id="panel-header"
              >
                Advanced options
              </AccordionSummary>
              <AccordionDetails id="panel-content">
                <Stack spacing={1}>
                  {advancedOptions.length > 0 ? advancedOptions.map((option, idx) => (
                    <Stack direction="row" spacing={1}>
                      <TextField
                        label={`Name ${idx + 1}`}
                        defaultValue={option.name}
                        size="small"
                        variant="outlined"
                        sx={{ width: '50%' }}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                      <TextField
                        label={`Value ${idx + 1}`}
                        defaultValue={option.value}
                        size="small"
                        variant="outlined"
                        sx={{ width: '50%' }}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Stack>
                  )) : ''}
                </Stack>
              </AccordionDetails>
            </Accordion>
          </Stack>
        }
      </Box>
    </>
  );
}

export default JobDetail;
