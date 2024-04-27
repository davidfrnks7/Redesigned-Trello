interface Project {
  id: string;
  title: string;
  slug: string;
  ownerId: string;
  creationDate: string;
  updatedDate: string;
}

interface ProjectSlice extends Project {
  tables: TableSlice[];
}
