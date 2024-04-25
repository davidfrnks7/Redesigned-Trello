import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createId } from "@paralleldrive/cuid2";

const initialState: TableSlice[] = [] as TableSlice[];

const calculatePercentageCompleted = (tasks: TableCard[]): number => {
  let totalTasks = tasks.length;
  let totalComplete = 0;

  tasks.map((task: TableCard) => {
    const { checklist, completed } = task;

    if (checklist.length) {
      totalTasks += checklist.length;
      let completedChecklistItems = 0;

      checklist.map((checklistItem: ChecklistItem) => {
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

const tablesSlice = createSlice({
  name: "Tables",
  initialState,
  reducers: {
    // Create a new table
    createNewTable(
      state: TableSlice[],
      action: PayloadAction<{ tableTitle: string; projectId: string }>
    ) {
      const { tableTitle, projectId } = action.payload;
      const newId = createId();
      const order = state.length;
      const newDate = new Date().toString();
      const newCards = [] as TableCard[];

      const newTable: TableSlice = {
        id: newId,
        projectId,
        title: tableTitle,
        order,
        percentageComplete: 0,
        upcomingDueTasks: 0,
        pastDueTasks: 0,
        cards: newCards,
        creationDate: newDate,
        updatedDate: newDate
      };

      state.push(newTable);
    },
    // Populate the tables from the database
    populateTables(state: TableSlice[], action: PayloadAction<Table[]>) {
      const tables = action.payload;
      const orderedTables = orderTables(tables);
      const sliceTables = [] as TableSlice[];

      orderedTables.map((table: Table) => {
        const {
          id,
          projectId,
          title,
          order,
          cards,
          creationDate,
          updatedDate
        } = table;

        const newTable: TableSlice = {
          id,
          projectId,
          title,
          order,
          cards,
          creationDate,
          updatedDate,
          percentageComplete: calculatePercentageCompleted(cards),
          upcomingDueTasks: countUpcomingDue(cards),
          pastDueTasks: countPastDue(cards)
        };

        sliceTables.push(newTable);
      });

      state = sliceTables;
    },
    // Remove table from project
    removeTable(state: TableSlice[], action: PayloadAction<string>) {
      const deleteId = action.payload;
      const newTables = [...state];
      let tableDeleted = false;

      state.map((table, index) => {
        if (table.id == deleteId) {
          newTables.splice(index, 1);

          tableDeleted = true;
        }

        if (tableDeleted) {
          table.order--;
        }
      });

      state = newTables;
    }
  }
});

export const { createNewTable, populateTables, removeTable } =
  tablesSlice.actions;
export default tablesSlice.reducer;
