type FiqlOperator = ',' | ';' | '==' | '!=' | '<' | '<=' | '>' | '>=' | 'in' | 'not in';
type JoinerOperator = ',' | ';';

export class FilterFiql {
  property: string;
  joinerOperator: JoinerOperator;
  values: [FiqlOperator, string][];

  constructor(property: string, joinerOperator: ',' | ';') {
    this.property = property;
    this.joinerOperator = joinerOperator;
    this.values = [];
  }

  setValues(values: [FiqlOperator, string][]) {
    this.values = values;
  }

  addValue(operator: FiqlOperator, value: string) {
    this.values.push([operator, value]);
  }

  isEmpty(): boolean {
    return this.values.length === 0;
  }

  parseToFiql(): string {
    const values = this.values.map(([operator, value]) => `${this.property}${operator}"${value}"`);
    return values.join(this.joinerOperator);
  }

  static parseFiltersToFeedItemQueryLanguage(filters: FilterFiql[], joinerOperator: JoinerOperator = ';'): string {
    if (filters.length === 0) {
      return '';
    }

    const notEmptyFilters = filters.filter((filter) => !filter.isEmpty());

    return notEmptyFilters.map((filter) => `${filter.parseToFiql()}`).join(joinerOperator);
  }

  static parseFiltersToFiqlQueryParam(filters: FilterFiql[]): string {
    if (filters.length === 0) {
      return '';
    }
    const fiql = this.parseFiltersToFeedItemQueryLanguage(filters, ';');
    const fiqlQueryParam = fiql && fiql !== '' ? `q=${fiql}` : '';
    console.log(fiqlQueryParam);
    return fiqlQueryParam;
  }
}
