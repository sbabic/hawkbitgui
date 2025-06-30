export type HawkbitConfigValue = {
  value: string | number | boolean;
  global: boolean;
  links: {
    rel: string;
    href: string;
  }[];
};

export type HawkbitSystemConfiguration = Record<string, HawkbitConfigValue>;

export enum HawkbitSystemConfigKey {
  USER_CONFIRMATION_FLOW_ENABLED = 'user.confirmation.flow.enabled',
  AUTH_GATEWAYTOKEN_ENABLED = 'authentication.gatewaytoken.enabled',
  AUTH_HEADER_AUTHORITY = 'authentication.header.authority',
  AUTH_GATEWAYTOKEN_KEY = 'authentication.gatewaytoken.key',
  ACTION_CLEANUP_ENABLED = 'action.cleanup.enabled',
  ACTION_CLEANUP_STATUS = 'action.cleanup.actionStatus',
  POLLING_TIME = 'pollingTime',
  AUTH_TARGETTOKEN_ENABLED = 'authentication.targettoken.enabled',
  ROLLOUT_APPROVAL_ENABLED = 'rollout.approval.enabled',
  MAINTENANCE_WINDOW_POLL_COUNT = 'maintenanceWindowPollCount',
  REPO_AUTO_CLOSE_ENABLED = 'repository.actions.autoclose.enabled',
  DEFAULT_DS_TYPE = 'default.ds.type',
  ACTION_CLEANUP_EXPIRY = 'action.cleanup.actionExpiry',
  AUTH_HEADER_ENABLED = 'authentication.header.enabled',
  POLLING_OVERDUE_TIME = 'pollingOverdueTime',
  MIN_POLLING_TIME = 'minPollingTime',
  IMPLICIT_LOCK_ENABLED = 'implicit.lock.enabled',
  BATCH_ASSIGNMENTS_ENABLED = 'batch.assignments.enabled',
  MULTI_ASSIGNMENTS_ENABLED = 'multi.assignments.enabled',
  ANONYMOUS_DOWNLOAD_ENABLED = 'anonymous.download.enabled',
}

export type GetSystemConfigurationResponse = HawkbitSystemConfiguration;

export type GetSystemConfigurationOutput = HawkbitSystemConfiguration;
