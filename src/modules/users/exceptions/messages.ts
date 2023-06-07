const generateRequiredFieldText = (entity: string) => `The ${entity} field is required`;

export const INVALID_EMAIL_FORMAT = 'Invalid email format';
export const PASSWORD_FIELD_REQUIRED = generateRequiredFieldText('password');
export const NAME_FIELD_REQUIRED = generateRequiredFieldText('name');
export const CODE_FIELD_REQUIRED = generateRequiredFieldText('code');
