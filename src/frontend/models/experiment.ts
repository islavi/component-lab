export interface Experiment {
  id: string;
  name: string;
  order?: number;
  groups: ExperimentGroup[];
  module?: NodeModule;
}

export interface ExperimentGroup {
  id: string;
  cases: ExperimentCase[];
}

export interface ExperimentCase {
  id: string;
  title?: string;
  description?: string;
  context?: any;
  template: string;
  styles?: string[];
  showSource?: boolean;
}
