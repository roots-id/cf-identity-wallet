import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../index";
import { SSIAgentState } from "./ssiAgent.types";

const initialState: SSIAgentState = {
  connectUrl: undefined,
  bootUrl: undefined,
  passcode: undefined,
};

const ssiAgentSlice = createSlice({
  name: "ssiAgent",
  initialState,
  reducers: {
    setConnectUrl: (state, action: PayloadAction<string | undefined>) => {
      state.connectUrl = action.payload;
    },
    setBootUrl: (state, action: PayloadAction<string | undefined>) => {
      state.bootUrl = action.payload;
    },
    setPasscode: (state, action: PayloadAction<string | undefined>) => {
      state.passcode = action.payload;
    },
    clearSSIAgent: (state) => {
      state.connectUrl = undefined;
      state.bootUrl = undefined;
      state.passcode = undefined;
    },
  },
});

const { clearSSIAgent, setBootUrl, setConnectUrl, setPasscode } =
  ssiAgentSlice.actions;

const getSSIAgent = (state: RootState) => state.ssiAgentCache;

export {
  clearSSIAgent,
  getSSIAgent,
  ssiAgentSlice,
  setBootUrl,
  setConnectUrl,
  setPasscode,
};
