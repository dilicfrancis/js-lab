import { createAction } from "@reduxjs/toolkit";

export const apiCallBegan = createAction("api/CallBegan");
export const apiCallSucceeded = createAction("api/apiCallSucceeded");
export const apiCallFailed = createAction("api/CallFailed");

//

export const bugsReceived = createAction("bugs/bugsReceived");
