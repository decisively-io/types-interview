import { Control } from './controls';

export type StepId = string;
export type ReleaseId = string;
export type ProjectId = string;
export type SessionId = string;
export type InterviewId = string;
export type AttributeId = string;

/** Navigation can be step id, or true for next, false for no navigation */
export type Navigate = StepId | boolean;

export interface Data {
  [name: AttributeId]: string | number | boolean;
};

/** Defines the context that the attributes within the screen exist within (whether they belong to the global object, or a sub-entity) */
export interface Context {
  /** Entity defines the entity that the screen belongs to. Either 'global' for the global object or the name of the entity */
  entity: string,
  /** Defines the id of the instance of the entity that is being referred to. For instance, if a project had an entity called 'household_member' the id would be used to determine which instance of the household_member is being referred to. This field will only appear when the entity is not 'global' */
  id?: string,
  /** Defines the parent path (if present) to the specific instance. The parent is of the form \<parent entity\>/\<parent index\> repeated for every parent up the global object (though global is never included in a parent path) */
  parent?: string
};

/** Data structure used to calculate the value for a Dynamic Attribute.  */
export interface Simulate {
  goals: AttributeId[];
  data: Data;
};

/** The state attribute provides the values and additional information about attributes that will be displayed on the screen, but may require checking with the server for the latest information (aka: Dynamic Attributes). */
export interface State {
  [name: AttributeId]: {
    dependencies: AttributeId[];
    value: any;
  }
};

export interface Step {
  /** Unique ID of the screen */
  id: string;
  /** Title of the step. The screen may have a different title, so this title is intended for any menu UI */
  title: string;
  /** The context of the step */
  context: Context,
  /** Whether the step is the current step of the interview. Only one step is marked current at any time */
  current: boolean,
  /** Is the screen complete, that is has data been provided for the attributes in this step? A step will also be marked complete only when all of it's sub-steps are complete */
  complete: boolean,
  /** Has this step been visited by the user. A screen is marked as visited when either data is submitted from it or the user navigates away from it. A screen is not 'visited' until the user leaves it - so the current screen will always be marked as visited: false (unless it had been previously visited) */
  visited: boolean,
  /** True if the screen was skipped due to relevancy or conditional rules. The user cannot navigate to this screen */
  skipped: boolean,
  /** Whether a user can navigate to this screen. Some screens only exist as grouping of other screens (eg: just a header and some context info). */
  visitable: boolean
  /** An array of sub-steps */
  steps?: Step[]
};

export interface Screen {
  /** The title of the screen. This may differ from the title in the step */
  title: string,
  /** Unique ID of the screen */
  id: string,
  /** The list of controls to be displayed on the screen */
  controls: Control[]
};

export interface Session {
  /** Unique ID of the session */
  sessionId: string;
  status: 'in-progress' |'complete' | 'error';
  context: Context;
  data: Data;
  state: State;
  steps: Step[]
  screen: Screen;
};