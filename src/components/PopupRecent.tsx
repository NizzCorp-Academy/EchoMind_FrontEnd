import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    DialogActions,
  } from "@mui/material";
  import CloseIcon from "@mui/icons-material/Close";
  

import ChatHook from "../hooks/chatHook";

interface PopupRecentProps {
  showRecentTab: boolean;
  setShowRecentTab: (value: boolean) => void;
}

const PopupRecent: React.FC<PopupRecentProps> = ({ showRecentTab, setShowRecentTab }) => {
  const chatHook = new ChatHook();
  const { chats } = chatHook.useGetChats();

  return (
    <Dialog
      open={showRecentTab}
      onClose={() => setShowRecentTab(false)}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        style: {
          backgroundColor: "#0F0F0F",
          color: "white",
          borderRadius: "10px",
        },
      }}
      BackdropProps={{
        style: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
      }}
    >
      <div className="flex items-center justify-between px-4 pt-4">
        <DialogTitle style={{ padding: 0 }}>All Chats</DialogTitle>
        <IconButton
          edge="end"
          color="inherit"
          onClick={() => setShowRecentTab(false)}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </div>

      <DialogContent dividers>
        {chats?.length === 0 ? (
          <p>No chats found.</p>
        ) : (
          chats?.map((chat, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-2 hover:bg-white/10 rounded cursor-pointer"
            >
              <span className="truncate">{chat.title}</span>
            </div>
          ))
        )}
      </DialogContent>

      {/* Optional: Add DialogActions if you want buttons at bottom */}
      {/* <DialogActions>
        <Button onClick={() => setShowRecentTab(false)}>Close</Button>
      </DialogActions> */}
    </Dialog>
  );
};

export default PopupRecent;
