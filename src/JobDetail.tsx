import { useState } from 'react';
import './JobDetail.css';

import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import { AccordionDetails, AccordionSummary, CircularProgress, OutlinedInputProps, TextField } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

//delete
export type JobParameter = {
  name: string;
  value: string;
};

export interface IOutputFormatOption {
  readonly name: string;
  readonly label: string;
}

export type CreateJobFormState = {
  jobName: string;
  inputFile: string;
  outputPath: string;
  environment: string;
  parameters?: JobParameter[];
  outputFormats?: IOutputFormatOption[];
};

interface TextFieldStyledProps {
  label: string;
  defaultValue?: string;
  InputProps?: Partial<OutlinedInputProps> | undefined
}

function TextFieldStyled(props: TextFieldStyledProps) {
  return <TextField
    {...props}
    label={props.label}
    defaultValue={props.defaultValue}
    size="small"
    variant="outlined"
    sx={{ width: '50%' }}
  />
}

export function JobDetail() {
  const [loading, setLoading] = useState(true);

  let props = {
    jobId: "job-12"
  }

  let advancedOptions: JobParameter[] = [{ "name": "option 1", "value": "hello" }, { "name": "option 2", "value": "value 2" }];

  let basicOptions: CreateJobFormState = {
    jobName: "my job",
    inputFile: "foobar",
    outputPath: "foobar.jptr",
    environment: "conda3",
    parameters: advancedOptions,
    outputFormats: [{ name: "hello", label: "label" }]
  };


  return (
    <>
      <Button onClick={_ => setLoading(!loading)}> Toggle loading </Button>
      <Box>
        {/* rework to conditionally SHOW/HIDE content */}
        <Stack spacing={4}>
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
          {mainArea()}
        </Stack>
      </Box>
    </>
  );

  function mainArea() {
    if (loading) {
      return (
        <Stack direction="row" justifyContent="center">
          <CircularProgress />
        </Stack>
      )
    } else {
      return (
        <>
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <Button> Rerun Job </Button>
            <Button> Delete </Button>
          </Stack>
          <Stack spacing={4}>
            <TextFieldStyled
              label="Job name"
              defaultValue={basicOptions.jobName}
              InputProps={{
                readOnly: true
              }} />
            <TextFieldStyled
              label="Job name"
              defaultValue={basicOptions.jobName}
              InputProps={{
                readOnly: true
              }} />
            <TextFieldStyled
              label="Input file"
              defaultValue={basicOptions.inputFile}
              InputProps={{
                readOnly: true
              }} />
            <TextFieldStyled
              label="Output path"
              defaultValue={basicOptions.outputPath}
              InputProps={{
                readOnly: true
              }} />
            <TextFieldStyled
              label="Environment"
              defaultValue={basicOptions.environment}
              InputProps={{
                readOnly: true
              }} />
          </Stack>

          <Accordion defaultExpanded={advancedOptions.length > 0} disabled={advancedOptions.length === 0}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel-content"
              id="panel-header"
            >
              Advanced options
            </AccordionSummary>
            <AccordionDetails id="panel-content">
              <Stack component="form" spacing={4}>
                {advancedOptions.length > 0 ? advancedOptions.map((option, idx) => (
                  <Stack key={idx} direction="row" spacing={1}>
                    <TextFieldStyled
                      label={`Name`}
                      defaultValue={option.name}
                      InputProps={{
                        readOnly: true
                      }} />
                    <TextFieldStyled
                      label={`Value`}
                      defaultValue={option.value}
                      InputProps={{
                        readOnly: true
                      }} />
                  </Stack>
                )) : ''}
              </Stack>
            </AccordionDetails>
          </Accordion>
        </>)
    }
  }
}

export default JobDetail;
