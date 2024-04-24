interface Table {
  id: string;
  projectId: string;
  title: string;
  order: number;
  cards: TableCard[];
  creationDate: Date;
  updatedDate: Date;
}

interface TableSlice extends Table {
  percentageComplete: number;
  upcomingDueTasks: number;
  pastDueTasks: number;
}
