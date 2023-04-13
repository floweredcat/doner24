export const selectOrgModule = (state) => state.organization;

export const selectOrgType = (state) => selectOrgModule(state).WORK_TYPE;