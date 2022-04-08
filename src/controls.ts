/**
 * A control to collect a true or false response from a user. Usually rendered as a checkbox.
 * Note: the control needs to allow for an indeterminate (or uncertain) response - i.e. the
 * user did not provide an answer. You can't send back undefined as the server will interpret
 * that as requiring an answer again later. Send back null to mark the question as reviewed
 * but not answered.
 */
export interface IBoolean {
  // unique id of the control
  id: string;
  type: 'boolean';
  label?: string;
  required?: true;
  default?: boolean;
  value?: boolean | null,
  // The GUID of the attribute
  attribute: string;
}

/**
 * A number input for inputting currency values. This should:
 * - Show the currency symbol
 * - Allow only numbers to be inputted. There is no restriction on the number of decimal places
 * - Negative numbers are allowed (unless the min is set to 0)
 */
export interface ICurrency {
  /** unique id of the control */
  id: string;
  type: 'currency';
  label?: string;
  required?: true;
  default?: number;
  /** uuid */
  attribute: string;
  value?: number | null;
  /** @default '$'' */
  symbol?: string;
  // /**
  //  * ??? If not set at design time, this will use the currency symbol in the locale settings for the release
  //  * @example 'EUR'
  //  * @default 'AUD'
  //  * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
  //  */
  // symbol?: string;
  // /**
  //  * @example 'de-DE'
  //  * @default 'en-AU'
  //  * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
  //  */
  // locale?: string;
  /** Minimum number allowed - if not set assume no restriction */
  min?: number;
  /** Maximum number allowed - if not set assume no restriction */
  max?: number;
}
/**
 * Allow a user to enter a date. This should send an ISO date string back to the server ('YYYY-MM-DD').
 * Do not send a time component back.
 */
export interface IDate {
  /** unique id of the control */
  id: string;
  type: 'date';
  label?: string;
  required?: true;
  /** uuid */
  attribute: string;
  value?: string | null;
  /** YYYY-MM-DD */
  default?: string;
  /** Minimum date allowed, YYYY-MM-DD */
  min?: string | 'now';
  /** Maximum date allowed, YYYY-MM-DD */
  max?: string | 'now';
}
export const DATE_FORMAT = 'yyyy-MM-dd';

/**
 * Allow a user to enter a time. This should send an ISO time string back to the server ('HH:mm:ss').
 * Do not send a date component back.
 */
export interface ITime {
  /** unique id of the control */
  id: string;
  type: 'time';
  label?: string;
  required?: true;
  /** uuid */
  attribute: string;
  value?: string | null;
  /** HH:mm:ss */
  default?: string;
  /** Minimum time allowed, HH:mm:ss */
  min?: string;
  /** Maximum time allowed, HH:mm:ss */
  max?: string;
  /**
   * Whether to display time with an 'AM/PM' or in 24 hour time.
   * Regardless of this input the server expects 24 hour time
   */
  amPmFormat?: true;
  /** Eg: 15 = only allow time in 15 minute increments (3:00, 3:15, 3:30, 3:45). The increment is assumed to start from the hour and will not be greater than 60 */
  minutes_increment?: number;
  allowSeconds?: true;
}

export const TIME_FORMAT_24 = 'HH:mm:ss';
export const TIME_FORMAT_12 = 'h:mm:ss a';

/**
 * Allow a user to enter a date and time in one control. This should send an ISO date time string back to the server ('YYYY-MM-DD HH:mm:ssZ').
 * It's metadata is basically a merge of the date and time, but with seperate min/max.
 */
export interface IDateTime {
  /** unique id of the control */
  id: string;
  type: 'datetime',
  label?: string;
  required?: true;
  /** uuid */
  attribute: string;
  value?: string | null;
  /** YYYY-MM-DD HH:mm:ss */
  default?: string;
  /** YYYY-MM-DD */
  date_min?: string | 'now';
  /** YYYY-MM-DD */
  date_max?: string | 'now';
  /** HH:mm:ss */
  time_min?: string;
  /** HH:mm:ss */
  time_max?: string;
  /** Whether to display time with an 'AM/PM' or in 24 hour time.
   *  Regardless of this input the server expects 24 hour time
   */
  amPmFormat?: true;
  /** Eg: 15 = only allow time in 15 minute increments (3:00, 3:15, 3:30, 3:45). The increment is assumed to start from the hour and will not be greater than 60 */
  minutes_increment?: number;
  /** mui picker doesn't have this control */
  // allow_seconds?: true;
}

export const DATE_TIME_FORMAT_24 = `${ DATE_FORMAT } ${ TIME_FORMAT_24 }`;
export const DATE_TIME_FORMAT_12 = `${ DATE_FORMAT } ${ TIME_FORMAT_12 }`;
/**
 * Allow a user to select from a predefined list of options (eg: a dropdown or a radio button).
 * ```text
 * Note: the design time UI shows the options within a single field in the form:
 * <label>:<value>
 * <label>:<value>
 * This should be converted into (and out of) the above format when sending to the server
 * ```
 * <br/>
 *
 * ```text
 * Note: the enum_id is only used in design time.
 * It signifies if the attribute should use a predefined enumeration.
 * The run time API will detect this and auto populate the options
 * attribute (and not send the enum_id to the client.
 * ```
 */
export interface IOptions {
  /** unique id of the control */
  id: string;
  type: 'options';
  /**
   * Display as a series of radio buttons. \
   * Default display as standart select
   */
  asRadio?: true;
  label?: string;
  required?: true;
  value?: string | boolean | null;
  default?: string | boolean;
  /** uuid */
  attribute: string;
  options: Array<{ label: string, value: string | boolean }>;
  /** Allow a user to add their own option, not in the list, in */
  allow_other?: true;
  /** uuid */
  enum_id: string;
}

/**
 * **IMPORTANT** This is not currently supported\
 * Allow a user to upload a file. This metadata is still under construction
 */
export interface IFile {
  /** unique id of the control */
  id: string;
  type: 'file';
  label?: string;
  required?: true;
  /** uuid */
  attribute: string;
  /** The max number of files that can be uploaded. Defaults to 1 */
  max?: number;
  /** The types of file allowed (pdf docx etc) */
  file_type?: string;
  /** The maximum size of a document, in Mb */
  max_size?: number;
}

/**
 * Display an image to the user. This does not collect any information from the user
 * ```text
 * Note: We may need other attributes to help display the image properly (height, width, stretch?).
 * Should provide enough to show an image reasonably, but more advanced stuff should really
 * be done in code in the SDK
 * ```
 */
export interface IImage {
  id: string;
  type: 'image';
  /** The base64 date URI of the image */
  data: string;
}

export interface IEntityInstance {
  id: string;
}

/**
 * Collects the number of instances of an entity the user will want. \
 * This will be used to control the repetition of steps to collect information \
 * for these instances. See . This should be displayed as a number input field \
 * or a dropdown (if the max is known and it makes more sense to display that way)\
 * \
 * The response to the server at run time is a little different for this control.\
 * See the link above for more detail.
 */
export interface INumberOfInstances {
  /** unique id of the control */
  id: string;
  type: 'number_of_instances',
  label?: string;
  default?: IEntityInstance[];
  value?: INumberOfInstances[ 'default' ] | null;
  /** The name of the entity */
  entity: string;
  /**
   * The minimum number of instances. 0 or greater.
   */
  min: number;
  max?: number;
}

/** Collects text from the user.  */
export interface IText {
  /** unique id of the control */
  id: string;
  type: 'text';
  label?: string;
  required?: true;
  default?: string;
  /** uuid */
  attribute: string;
  value?: string | null;
  /** The maximum length of the string */
  max?: number;
}

/**
 * Display text to the user. This differs from the text control above, \
 * which collects text from the user.\
 * The end-styling of the text is up to the run time.
 */
export interface ITypography {
  id: string;
  type: 'typography',
  text: string;
  style:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'caption'
}

export type NonNestedControl = Exclude< Control, IEntity >;

/**
 * Collect information about instances (of an entity) within a tabular structure.
 */
export interface IEntity {
  /** unique id of the control */
  id: string;
  type: 'entity';
  label?: string;
  /** The name of the entity */
  entity: string;
  /** Should all the fields be vertical (like table columns) or horizontal (individual rows, table-like) */
  /** describes single 'row' of entries, each of which has all controls from `template` */
  display?: 'horizontal' | 'vertical';
  template: NonNestedControl[];
  value?: null | any[][];
  /** min number of instances */
  min?: number;
  max?: number;
}

export type Control =
  | IBoolean
  | ICurrency
  | IDate
  | ITime
  | IDateTime
  | IOptions
  | IFile
  | IImage
  | INumberOfInstances
  | IText
  | ITypography
  | IEntity;

export interface IControlsValue {
  [ controlUUID: string ]: any;
}