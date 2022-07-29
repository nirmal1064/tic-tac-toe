import { Grid, TextField } from "@mui/material";

type GridTextFieldProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const GridTextField = ({ value, label, onChange }: GridTextFieldProps) => {
  return (
    <Grid item marginBottom={"10px"}>
      <TextField
        value={value}
        label={label}
        variant="outlined"
        onChange={onChange}
      />
    </Grid>
  );
};

export default GridTextField;
