// UserSearch.tsx
import { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

interface User {
  id: string;
  name: string;
  avatar: string;
}
interface UserSearchProps {
  users: User[];
  onSelectUser: (user: User) => void;
}
function UserSearch({ users, onSelectUser }: UserSearchProps) {
  const [value, setValue] = useState<User | null>(null);
  const [inputValue, setInputValue] = useState<string>('');

  console.log('value', value);
  console.log('inputValue', inputValue);

  return (
    <Autocomplete
      sx={{ width: 'full' }}
      size="small"
      options={users}
      getOptionLabel={(option) => option.name}
      value={value}
      onChange={(event, newValue) => {
        if (newValue) {
          onSelectUser(newValue);
          setValue(null);
        }
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderOption={(props, option) => (
        <li
          {...props}
          key={option.id}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <img
            // src={option.avatar}
            src="https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366_960_720.png"
            alt=""
            style={{
              width: 30,
              height: 30,
              borderRadius: '50%',
              marginRight: 8,
            }}
          />
          {option.name}
        </li>
      )}
      renderInput={(params) => (
        <TextField {...params} label="Search user" variant="outlined" />
      )}
    />
  );
}

export default UserSearch;
