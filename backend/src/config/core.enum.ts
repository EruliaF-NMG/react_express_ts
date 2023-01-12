export enum ModuleProperties {
    Controller   = "controllers",
    Repositories = "repositories",
    Service      = "services",
    Modules      = "modules",
    Routes       = "routes",
    Prefix       = "prefix",
}

export enum HTTPMethods {
    Get   = "get",
    Post  = "post",
    Put   = "put",
    Patch = "patch",
}

export enum UserStatus {
  UNBLOCKED = 1,
  BLOCKED = 0,
}

export const errorMessageList :any = {
  required: 'Please enter the :attribute',
  max: 'The :attribute may not be greater than :max.',
  min: 'The :attribute must be at least :min.',
  maxAmount: 'The :attribute may not be greater than :max.',
  minAmount: 'The :attribute must be at least :min.',
  digits: 'The :attribute must have :min digits.',
  between: 'The :attribute must be between :min and :max.',
  string: 'The :attribute must be a string.',
  numeric: 'The :attribute must be a number.',
  email: 'The :attribute must be a valid email address.',
  requiredIf: 'The :attribute field is required when :other is :value.',
  after_or_equal: 'The :attribute must be a date after or equal to :startDate.',
  unique: 'The :attribute has already been taken.',
  same: 'The :attribute and :other must match.',
  isArray: 'The :attribute must be an array.',
};