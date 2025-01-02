export interface Leave {
  teamMemberId: {
    name: string;
    id: string;
  };
  leaveType: string;
  comment: string;
  dateType: "single" | "range"; 
  dates: string[];
  status: "approved" | "rejected" | string; 
  createdAt: string;
  updatedAt: string;
  adminComment?: string; 
  id: string;
}

export interface RequestLeaveprops {
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  drawerOpen: boolean;
  currentbtn: {
    id: any;
  };
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
  selectedValue: string;
  textareaValue: string;
  setTextareaValue: React.Dispatch<React.SetStateAction<string>>;
  setLeave: React.Dispatch<React.SetStateAction<string>>;
  teamMember: {
    id: string;
    title: string;
  };
  setTeamMember: React.Dispatch<
    React.SetStateAction<{
      id: string;
      title: string;
    }>
  >;
  leave: string;
  setMultiDate: any;
  rageDate: any;
  setRangeDate: any;
  multiDate: any;
}
