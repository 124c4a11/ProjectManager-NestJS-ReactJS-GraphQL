export enum ProjectStatus {
  NOT_STARTED = 'Not Started',
  IN_PROGRESS = 'In Progress',
  COMPLETE = 'Complete',
}

export interface IProject {
  id: number;
  name: string;
  descritpion: string;
  status: ProjectStatus;
  clientId: number;
}
