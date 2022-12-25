export const selectFoldersModule = (state) => state.folders;

export const selectFoldersIds = (state) => selectFoldersModule(state).ids;

export const selectFoldersIsLoading = (state) =>
  selectFoldersModule(state).status === "loading";

export const selectFolderById = (state, { folderId }) =>
  selectFoldersModule(state).entities[folderId];

export const selectFolderNameById = (state, { folderId }) =>
  selectFolderById(state, { folderId })?.NAME;
