import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField } from '@mui/material';

// ----------------------------------------------------------------------

RHFTextField.propTypes = {
  name: PropTypes.string,
};

export default function RHFTextField({ name,errorOther, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          color="form"
          value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
          error={((!!error)||errorOther)?true:false}
          helperText={errorOther?errorOther:error?.message}
          {...other}
        />
      )}
    />
  );
}
