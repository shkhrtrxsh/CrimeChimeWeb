import React, { useEffect } from 'react';
import { 
  Grid, 
  FormControlLabel,
  Checkbox
} from '@mui/material';

// const useStyles = makeStyles({
//   table: {
//     minWidth: 650,
//   },
//   permissionGroup:{
//     marginBottom: '30px',
//   },
// });


export default function RolePermission(props) {
  const { permission } = props;

  const [changePermission, setChangePermission] = React.useState(false);
  const [changes, setChanges] = React.useState(false);


  const handlePermissionChange = (event) => {
    setChangePermission(event.target.checked);
    setChanges(true)
  }

  useEffect(() => {
    setChangePermission(Boolean(permission.role_permissions.status))
  },[permission]);

  
  useEffect(() => {
    props.changePermissionFunc(changes, permission.role_permissions.id, changePermission)
  },[changePermission]);

  return (         
    <Grid item xs={3}>
      <FormControlLabel
        value="end"
        control={<Checkbox
          checked={changePermission} 
          onChange={handlePermissionChange}
          />}
        label={permission.name}
        labelPlacement="end"
      />
    </Grid>
  );
}
