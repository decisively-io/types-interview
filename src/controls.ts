import type { EntityInstance, EntityValue } from "./core";

interface BaseControl {
  id: string;
  type: string;
  attribute?: string;
  version?: number;
}

// schema controls

/**
 * A control to collect a true or false response from a user. Usually rendered as a checkbox.
 * Note: the control needs to allow for an indeterminate (or uncertain) response - i.e. the
 * user did not provide an answer. You can't send back undefined as the server will interpret
 * that as requiring an answer again later. Send back null to mark the question as reviewed
 * but not
 }answered.
 */
export interface BooleanControl extends BaseControl {
  // unique id of the control
  id: string;
  type: "boolean";
  label?: string;
  labelLength?: number;
  required?: true;
  disabled?: true;
  default?: boolean;
  value?: boolean | null;
  // The GUID of the attribute
  attribute: string;
  showExplanation?: boolean;
}

/**
 * @deprecated Use `BooleanControl` instead
 */
export type IBoolean = BooleanControl;

/**
 * A number input for inputting currency values. This should:
 * - Show the currency symbol
 * - Allow only numbers to be inputted. There is no restriction on the number of decimal places
 * - Negative numbers are allowed (unless the min is set to 0)
 */
export interface CurrencyControl extends BaseControl {
  /** unique id of the control */
  id: string;
  type: "currency";
  label?: string;
  labelLength?: number;
  required?: true;
  disabled?: true;
  default?: number;
  /** uuid */
  attribute: string;
  value?: number | null;
  /** @default '$'' */
  symbol?: string;
  /** Minimum number allowed - if not set assume no restriction */
  min?: number;
  /** Maximum number allowed - if not set assume no restriction */
  max?: number;
  showExplanation?: boolean;
}

/**
 * @deprecated Use `CurrencyControl` instead
 */
export type ICurrency = CurrencyControl;

/**
 * Allow a user to enter a date. This should send an ISO date string back to the server ('YYYY-MM-DD').
 * Do not send a time component back.
 */
export interface DateControl extends BaseControl {
  /** unique id of the control */
  id: string;
  type: "date";
  label?: string;
  labelLength?: number;
  required?: true;
  disabled?: true;
  allowManual?: true;
  /** uuid */
  attribute: string;
  /** 'YYYY-MM-DD' */
  value?: string | null;
  /** 'YYYY-MM-DD' */
  default?: string;
  /** Minimum date allowed, YYYY-MM-DD */
  min?: string | "now";
  /** Maximum date allowed, YYYY-MM-DD */
  max?: string | "now";
  showExplanation?: boolean;
}

/**
 * @deprecated Use `DateControl` instead
 */
export type IDate = DateControl;

/**
 * pretty strange format, because it's from date-fns
 * @link https://date-fns.org/v2.16.1/docs/format. \
 * For some reason their approach is that dd is "day \
 * of month" but DD is "day of year" (in dayjs DD is\
 * "day of month")
 */
export const DATE_FORMAT = "yyyy-MM-dd";

/**
 * Allow a user to enter a time. This should send an ISO time string back to the server ('HH:mm:ss').
 * Do not send a date component back.
 */
export interface TimeControl extends BaseControl {
  /** unique id of the control */
  id: string;
  type: "time";
  label?: string;
  labelLength?: number;
  required?: true;
  disabled?: true;
  /** uuid */
  attribute: string;
  /** 'HH:mm:ss' */
  value?: string | null;
  /** 'HH:mm:ss' */
  default?: string;
  /** Minimum time allowed, 'HH:mm:ss' */
  min?: string;
  /** Maximum time allowed, 'HH:mm:ss' */
  max?: string;
  /**
   * Whether to display time with an 'AM/PM' or in 24 hour time.
   * Regardless of this input the server expects 24 hour time
   */
  amPmFormat?: true;
  /** Eg: 15 = only allow time in 15 minute increments (3:00, 3:15, 3:30, 3:45). The increment is assumed to start from the hour and will not be greater than 60 */
  minutes_increment?: number;
  allowSeconds?: true;
  showExplanation?: boolean;
}

/**
 * @deprecated Use `TimeControl` instead
 */
export type ITime = TimeControl;

export const TIME_FORMAT_24 = "HH:mm:ss";
export const TIME_FORMAT_12 = "h:mm:ss a";

/**
 * Allow a user to enter a date and time in one control. This should send an ISO date time string back to the server ('YYYY-MM-DD HH:mm:ssZ').
 * It's metadata is basically a merge of the date and time, but with seperate min/max.
 */
export interface DateTimeControl extends BaseControl {
  /** unique id of the control */
  id: string;
  type: "datetime";
  label?: string;
  labelLength?: number;
  required?: true;
  disabled?: true;
  /** uuid */
  attribute: string;
  /** 'YYYY-MM-DD HH:mm:ss' */
  value?: string | null;
  /** 'YYYY-MM-DD HH:mm:ss' */
  default?: string;
  /** 'YYYY-MM-DD', 'now' */
  date_min?: string | "now";
  /** 'YYYY-MM-DD', 'now' */
  date_max?: string | "now";
  /** 'HH:mm:ss' */
  time_min?: string;
  /** 'HH:mm:ss' */
  time_max?: string;
  /** Whether to display time with an 'AM/PM' or in 24 hour time.
   *  Regardless of this input the server expects 24 hour time
   */
  amPmFormat?: true;
  /** Eg: 15 = only allow time in 15 minute increments (3:00, 3:15, 3:30, 3:45). The increment is assumed to start from the hour and will not be greater than 60 */
  minutes_increment?: number;
  /** mui picker doesn't have this control */
  // allow_seconds?: true;
  showExplanation?: boolean;
}

/**
 * @deprecated Use `DateTimeControl` instead
 */
export type IDateTime = DateTimeControl;

export const DATE_TIME_FORMAT_24 = `${DATE_FORMAT} ${TIME_FORMAT_24}`;
export const DATE_TIME_FORMAT_12 = `${DATE_FORMAT} ${TIME_FORMAT_12}`;

export interface Option {
  label?: string;
  value: any;
}

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
export interface OptionsControl extends BaseControl {
  /** unique id of the control */
  id: string;
  type: "options";
  /**
   * Display as a series of radio buttons. \
   * Default display as standart select
   */
  asRadio?: true;
  label?: string;
  labelLength?: number;
  required?: true;
  disabled?: true;
  value?: string | boolean | null;
  default?: string | boolean;
  /** uuid */
  attribute: string;
  /** design and runtime */
  options?: Array<Option>;
  /** Allow a user to add their own option, not in the list, in */
  allow_other?: true;
  /** uuid, design time only */
  enum_id?: string;
  showExplanation?: boolean;
}

/**
 * @deprecated Use `OptionsControl` instead
 */
export type IOptions = OptionsControl;

/**
 * **IMPORTANT** This is not currently supported\
 * Allow a user to upload a file. This metadata is still under construction
 */
export interface FileControl extends BaseControl {
  /** unique id of the control */
  id: string;
  type: "file";
  label?: string;
  labelLength?: number;
  required?: true;
  /** uuid */
  attribute: string;
  /** The max number of files that can be uploaded. Defaults to 1 */
  max?: number;
  /** The types of file allowed (pdf docx etc) */
  file_type?: string;
  /** The maximum size of a document, in Mb */
  max_size?: number;
  showExplanation?: boolean;
}

/**
 * @deprecated Use `FileControl` instead
 */
export type IFile = FileControl;

/**
 * Display an image to the user. This does not collect any information from the user
 * ```text
 * Note: We may need other attributes to help display the image properly (height, width, stretch?).
 * Should provide enough to show an image reasonably, but more advanced stuff should really
 * be done in code in the SDK
 * ```
 */
export interface ImageControl extends BaseControl {
  id: string;
  type: "image";
  /** The base64 date URI of the image */
  data: string;
}

/**
 * @deprecated Use `ImageControl` instead
 */
export type IImage = ImageControl;

/**
 * Collects the number of instances of an entity the user will want. \
 * This will be used to control the repetition of steps to collect information \
 * for these instances. See . This should be displayed as a number input field \
 * or a dropdown (if the max is known and it makes more sense to display that way)\
 * \
 * The response to the server at run time is a little different for this control.\
 * See the link above for more detail.
 */
export interface NumberOfInstancesControl extends BaseControl {
  /** unique id of the control */
  id: string;
  type: "number_of_instances";
  label?: string;
  labelLength?: number;
  required?: true;
  default?: EntityInstance[];
  disabled?: true;
  value?: NumberOfInstancesControl["default"] | null;
  template?: Control[];
  /** The name of the entity */
  entity: string;
  /**
   * The minimum number of instances. 0 or greater.
   */
  min?: number;
  max?: number;
}

/**
 * @deprecated Use `NumberOfInstancesControl` instead
 */
export type INumberOfInstances = NumberOfInstancesControl;

/** Collects text from the user.  */
export interface TextControl extends BaseControl {
  /** unique id of the control */
  id: string;
  type: "text";
  label?: string;
  labelLength?: number;
  required?: true;
  disabled?: true;
  default?: string;
  /** uuid */
  attribute: string;
  value?: string | null;
  /** The maximum length of the string */
  max?: number;
  variation?: { type: "email" } | { type: "number" };
  multi?: {
    maxRows?: number;
    minRows?: number;
  };
  showExplanation?: boolean;
}

/**
 * @deprecated Use `TextControl` instead
 */
export type IText = TextControl;

/**
 * Display text to the user. This differs from the text control above, \
 * which collects text from the user.\
 * The end-styling of the text is up to the run time.
 */
export interface TypographyControl extends BaseControl {
  id: string;
  type: "typography";
  text: string;
  style: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle1" | "subtitle2" | "body1" | "body2" | "caption" | "banner-green" | "banner-yellow" | "banner-red";
  emoji?: string;
}

/**
 * @deprecated Use `TypographyControl` instead
 */
export type ITypography = TypographyControl;

/**
 * Collect information about instances (of an entity) within a tabular structure.
 */
export interface EntityControl<C = Control> extends BaseControl {
  /** unique id of the control */
  id: string;
  type: "entity";
  label?: string;
  labelLength?: number;
  /** The name of the entity */
  entity: string;
  /** Should all the fields be vertical (like table columns) or horizontal (individual rows, table-like) */
  /** describes single 'row' of entries, each of which has all controls from `template` */
  display?: "horizontal" | "vertical";
  template: C[];
  value?: EntityValue[];
  /** min number of instances */
  min?: number;
  max?: number;
  showExplanation?: boolean;
  entityId?: string;
}

/**
 * @deprecated Use `EntityControl` instead
 */
export type IEntity = EntityControl;

//#region container

export interface RepeatingContainerControl extends BaseControl {
  id: string;
  type: "repeating_container";
  entity: string;
  /** if `display` is `undefined` we should assume `"list"` */
  display?: "list" | "table";
  /** `filter` is an attributeId */
  filter?: string | null;
  /** `sort` is an attributeId */
  sort?: string | null;
  controls: Control[];
}

export interface CertaintyContainerControl<C = Control> extends BaseControl {
  id: string;
  type: "certainty_container";
  attribute: string;
  certain: C[];
  uncertain: C[];
}

export interface SwitchContainerControl<C = Control> extends BaseControl {
  id: string;
  type: "switch_container";
  outcome_true: C[];
  outcome_false: C[];
  condition?: ConditionExpression;
  kind?: "dynamic" | "static";
}

// renderable controls

export type RenderableEntityControl = EntityControl<RenderableControl>;

export interface RenderableSwitchContainerControl extends SwitchContainerControl<RenderableControl> {
  branch?: "true" | "false";
}

export interface RenderableCertaintyContainerControl extends CertaintyContainerControl<RenderableControl> {
  branch?: "certain" | "uncertain";
}

// conditions

export type ConditionType = "equals" | "not-equals" | "and" | "or" | "less-than" | "less-than-equals" | "greater-than" | "greater-than-equals";

export interface ConditionValue {
  type: "value" | "attribute";
  // one or the other, not both
  value?: string | boolean | null;
  attributeId?: string | null;
}

export interface ConditionExpression {
  type: ConditionType;
  elements: Array<ConditionValue | ConditionExpression>;
}

//#endregion

export type RenderableControl = (
  | BooleanControl
  | CurrencyControl
  | DateControl
  | TimeControl
  | DateTimeControl
  | OptionsControl
  | FileControl
  | ImageControl
  | NumberOfInstancesControl
  | TextControl
  | TypographyControl
  | RenderableEntityControl
  | RenderableSwitchContainerControl
  | RenderableCertaintyContainerControl
) & {
  loading?: boolean;
  dynamicAttributes?: string[];
};
export type RenderableControlType = RenderableControl["type"];

export type Control = BooleanControl | CurrencyControl | DateControl | TimeControl | DateTimeControl | OptionsControl | FileControl | ImageControl | NumberOfInstancesControl | TextControl | TypographyControl | EntityControl | RepeatingContainerControl | CertaintyContainerControl | SwitchContainerControl;
export type ControlType = Control["type"];

export interface ControlsValue {
  [controlUUID: string]: any;
}

/**
 * @deprecated Use `ControlValue` instead
 */
export type IControlsValue = ControlsValue;
