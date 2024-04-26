import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createId } from "@paralleldrive/cuid2";

const initialState: Project = {
  id: "",
  ownerId: "",
  title: "",
  slug: "",
  creationDate: new Date().toString(),
  updatedDate: new Date().toString()
};

const projectSlice = createSlice({
  name: "Project",
  initialState,
  reducers: {
    // Create a new project
    createProject: (state: Project, action: PayloadAction<string>) => {
      const newTitle = action.payload;
      const newDate = new Date().toString();
      const newUserId = createId();
      const newId = createId();

      state.id = newId;
      state.slug = newTitle.replaceAll(" ", "-");
      state.ownerId = newUserId;
      state.title = newTitle;
      state.creationDate = newDate;
      state.updatedDate = newDate;
    },
    // Update title or updated date
    updateProject: (
      state: Project,
      action: PayloadAction<string | undefined>
    ) => {
      const newTitle = action.payload || state.title;
      const newDate = new Date().toString();

      state.title = newTitle;
      state.updatedDate = newDate;
    },
    // Delete Project
    removeProject: (state: Project) => {
      const newDate = new Date().toString();

      state.id = "";
      state.ownerId = "";
      state.title = "";
      state.creationDate = newDate;
      state.updatedDate = newDate;
    }
  }
});

export const { createProject, updateProject, removeProject } =
  projectSlice.actions;
export default projectSlice.reducer;
