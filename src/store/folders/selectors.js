export const selectFoldersModule = (state) => state.folders;

export const selectFoldersIds = (state) => selectFoldersModule(state).ids;

export const selectFolderIdsByFolderId = (state, {pid}) => 
  selectFoldersModule(state).entities[pid]?.folders?.ids;

export const selectFoldersIsLoading = (state) =>
  selectFoldersModule(state).status === "loading";

export const selectFolderById = (state, { folderId }) =>
  selectFoldersModule(state).entities[folderId];

export const selectFolderNameById = (state, { folderId, pid }) =>
  selectFolderById(state, { folderId: pid }).folders?.entities[folderId]?.NAME;


