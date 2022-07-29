import { Button, Grid } from "@mui/material";

type GridItemButtonProps = {
  value: string;
  onClick: () => void;
};

const GridItemButton = ({ onClick, value }: GridItemButtonProps) => {
  return (
    <Grid item>
      <Button variant="contained" onClick={onClick}>
        {value}
      </Button>
    </Grid>
  );
};

export default GridItemButton;
