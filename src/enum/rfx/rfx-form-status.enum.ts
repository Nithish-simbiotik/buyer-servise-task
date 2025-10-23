export enum RfxFormStatus {
  NOT_SUBMITED = 'draft',
  SUBMITED = 'pending',
  PENDING = 'pending',
  ACTIVE = 'active',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
  FINISHED = 'finished',
  INACTIVE = 'inactive',
  ESCALATE = 'escalated',

  // new statuses for rfx/sourcing.
  PENDING_BUYER_EVALUATION = 'pending buyer evaluation',
  PENDING_REQUESTOR_EVALUATION = 'pending requestor evaluation',
  COMPLETE = 'complete',
  SOURCING_PROPOSAL_DRAFT = 'sourcing proposal draft',
  SOURCING_PROPOSAL_PENDING = 'sourcing proposal pending',
  CLOSED = 'closed',
}
export enum SupplierStatus {
  INVITED = 'INVITED',
  PREVIEWED = 'PREVIEWED',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  SUBMITTED = 'SUBMITTED',
}

export enum ApprovalLevelStatus {
  DRAFT = 'draft',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export enum RfxApprovalAction {
  APPROVED = 'approved',

  REJECTED = 'rejected',

  PRE_PR_REJECTED = 'pre pr rejected',
}
