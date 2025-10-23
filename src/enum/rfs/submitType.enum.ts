export enum SubmitType {
  NOT_SUBMITED = 'draft',
  SUBMITED = 'pending',
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
  FINISHED = 'finished',
  INACTIVE = "inactive",
  ESCALATE ="escalated"
}

export enum StatusType {
  ALL = "all",
  NOT_SUBMITED = 'draft',
  PENDING = 'pending',
  CANCELLED = 'cancelled',
  FINISHED = 'finished'
}
// export enum SubmitType {
//   NOT_SUBMITED = 'not_submited',
//   SUBMITED = 'submited',
//   PENDING = 'pending',
//   APPROVED = 'approved',
//   REJECTED = 'rejected'
// }