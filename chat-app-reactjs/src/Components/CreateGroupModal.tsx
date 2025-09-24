import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Autocomplete,
  Button,
} from '@mui/material';
import { useState } from 'react';
import { ref, set } from 'firebase/database';
import { database } from '../FireBase/config';

interface User {
  id: string;
  name: string;
  avatar: string;
}

interface CreateGroupModalProps {
  open: boolean;
  onClose: () => void;
  users: User[];
  currentUser: User;
}

const CreateGroupModal = ({
  open,
  onClose,
  users,
  currentUser,
}: CreateGroupModalProps) => {
  const [groupName, setGroupName] = useState<string>('');
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const handleCreateGroup = async () => {
    const groupId = `group_${Date.now()}`;
    const allMembers: string[] = [
      ...selectedUsers.map((u) => u.id),
      currentUser.id,
    ];
    console.log(allMembers, 'allMembers');
    const conversationRef = ref(database, `conversations/${groupId}`);
    await set(conversationRef, {
      type: 'group',
      groupName,
      members: allMembers,
      lastMessage: '',
      lastTimestamp: Date.now(),
    });

    // Reset
    setGroupName('');
    setSelectedUsers([]);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Tạo Nhóm Chat</DialogTitle>
      <DialogContent>
        <TextField
          label="Tên nhóm"
          fullWidth
          margin="dense"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <Autocomplete
          multiple
          options={users.filter((u) => u.id !== currentUser.id)}
          getOptionLabel={(option) => option.name}
          onChange={(_, value) => setSelectedUsers(value)}
          value={selectedUsers}
          renderInput={(params) => (
            <TextField {...params} label="Thành viên" margin="dense" />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button
          variant="contained"
          onClick={handleCreateGroup}
          disabled={!groupName || selectedUsers.length === 0}
        >
          Tạo nhóm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateGroupModal;
