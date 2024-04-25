interface Table {
  id: string;
  projectId: string;
  title: string;
  order: number;
  cards: TableCard[];
  creationDate: string;
  updatedDate: string;
}

interface TableSlice extends Table {
  percentageComplete: number;
  upcomingDueTasks: number;
  pastDueTasks: number;
}
