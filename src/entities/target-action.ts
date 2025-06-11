export interface ActionLink {
  href: string;
  name?: string;
}

export interface ActionLinks {
  self: ActionLink;
  target: ActionLink;
  distributionset: ActionLink;
  status: ActionLink;
  rollout: ActionLink;
}

export interface TargetAction {
  id: number;
  createdBy: string;
  createdAt: number;
  lastModifiedBy: string;
  lastModifiedAt: number;
  type: string;
  status: string;
  detailStatus: string;
  rollout: number;
  rolloutName: string;
  forceType: string;
  _links: ActionLinks;
}
