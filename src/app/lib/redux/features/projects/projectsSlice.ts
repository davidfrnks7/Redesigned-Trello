import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createId } from "@paralleldrive/cuid2";

const initialState: ProjectSlice = {
  id: "",
  ownerId: "",
  title: "",
  slug: "",
  tables: [] as TableSlice[],
  creationDate: new Date().toString(),
  updatedDate: new Date().toString()
};

const calculatePercentageCompleted = (tasks: TableCard[]): number => {
  let totalTasks = tasks.length;
  let totalComplete = 0;

  tasks.map((task: TableCard) => {
    const { checklist, completed } = task;

    if (checklist.length) {
      totalTasks += checklist.length;
      let completedChecklistItems = 0;

      checklist.map((checklistItem: CardChecklistItem) => {
        const { completed } = checklistItem;

        if (completed) {
          completedChecklistItems++;
        }
      });

      totalComplete += completedChecklistItems;
    }

    if (completed) {
      totalComplete++;
    }
  });

  return totalTasks / totalComplete;
};

const countUpcomingDue = (tasks: TableCard[]): number => {
  const upcomingDueCount = 0;

  tasks.map((task: TableCard) => {
    const { plannedDueDate } = task;
    if (plannedDueDate !== null) {
      // TODO: Use date-fns to check if the due date is within 2 dates of th current day.
    }
  });

  return upcomingDueCount;
};

const countPastDue = (tasks: TableCard[]): number => {
  const pastDueCount = 0;

  tasks.map((task) => {
    const { plannedDueDate } = task;
    if (plannedDueDate !== null) {
      // TODO: Use date-fns to check if the due date is within 2 dates of th current day.
    }
  });

  return pastDueCount;
};

const orderCards = (cards: TableCard[]): TableCard[] => {
  const sortedCards = [...cards];

  sortedCards.sort((a, b) => (a.order > b.order ? 1 : -1));

  return sortedCards;
};

const orderTables = (tables: Table[]): Table[] => {
  const sortedTables = [...tables];

  sortedTables.sort((a, b) => (a.order > b.order ? 1 : -1));

  sortedTables.map((table) => {
    const { cards } = table;
    const orderedCard = orderCards(cards);

    table.cards = orderedCard;
  });

  return sortedTables;
};

const projectSlice = createSlice({
  name: "Project",
  initialState,
  reducers: {
    // Create a new project
    createProject: (state: ProjectSlice, action: PayloadAction<string>) => {
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
    updateProjectTitle: (
      state: ProjectSlice,
      action: PayloadAction<string>
    ) => {
      const newTitle = action.payload || state.title;
      const newDate = new Date().toString();

      state.title = newTitle;
      state.updatedDate = newDate;
    },
    // Delete Project
    removeProject: (state: ProjectSlice) => {
      const newDate = new Date().toString();

      state.id = "";
      state.ownerId = "";
      state.title = "";
      state.creationDate = newDate;
      state.updatedDate = newDate;
    },
    // Create Table
    createTable: (state: ProjectSlice, action: PayloadAction<string>) => {
      // Current state
      const { id, tables } = state;
      // Incoming sting
      const tableName = action.payload;

      // New data
      const newDate = new Date().toString();
      const newId = createId();
      const newOrder = tables.length - 1;
      const newCards = [] as TableCard[];

      const newTable: TableSlice = {
        id: newId,
        projectId: id,
        title: tableName,
        order: newOrder,
        cards: newCards,
        creationDate: newDate,
        updatedDate: newDate,
        percentageComplete: 0,
        upcomingDueTasks: 0,
        pastDueTasks: 0
      };

      state.tables.push(newTable);
    },
    // Create card
    createCard: (
      state: ProjectSlice,
      action: PayloadAction<{ tableIndex: number; newCardTitle: string }>
    ) => {
      // Incoming data
      const { tableIndex, newCardTitle } = action.payload;

      // Current table
      const currTable = state.tables[tableIndex];

      // New data
      const newDate = new Date().toString();
      const newId = createId();
      const newTags = [] as CardTag[];
      const newChecklist = [] as CardChecklistItem[];
      const newComments = [] as CardComment[];
      const newOrder = currTable.cards.length - 1;

      const newCard: TableCard = {
        id: newId,
        tableId: currTable.id,
        title: newCardTitle,
        description: "",
        complexity: null,
        tags: newTags,
        plannedDueDate: null,
        checklist: newChecklist,
        activity: newComments,
        order: newOrder,
        completed: false,
        creationDate: newDate,
        updatedDate: newDate
      };

      currTable.cards.push(newCard);
    }
  }
});

export const {
  createProject,
  updateProjectTitle,
  removeProject,
  createTable,
  createCard
} = projectSlice.actions;
export default projectSlice.reducer;
