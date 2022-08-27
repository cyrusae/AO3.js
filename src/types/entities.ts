export type TagCategory =
  | "fandom"
  | "character"
  | "relationship"
  | "archive warning"
  | "additional tags";

export interface Tag {
  name: string;
  // Not all tags have user-facing IDs Example: additional tags.
  // TODO: figure out other types (or whether they can be extracted from somewhere else).
  id: string | null;
  category: TagCategory;
  canonical: boolean;
  common: boolean;
  // Canonical name will be the same as "name" on canonical tags, and different on tags
  // that have been synned to a canonical. It will be null when tags haven't been marked as
  // common and cannot be filtered on.
  canonicalName: string | null;
}

export interface User {
  id: string;
  name: string;
  pseuds: string;
  url: string;
  joined: string;
  location: string | null;
  email: string | null;
  birthday: string | null;
  bioHtml: string | null;
}

export enum WorkRatings {
  NOT_RATED = "Not Rated",
  GENERAL_AUDIENCES = "General Audiences",
  TEEN_AND_UP_AUDIENCES = "Teen And Up Audiences",
  MATURE = "Mature",
  EXPLICIT = "Explicit",
}

export enum WorkCategory {
  FF = "F/F",
  FM = "F/M",
  GEN = "Gen",
  MM = "M/M",
  MULTI = "Multi",
  OTHER = "Other",
}

export enum WorkWarningStatus {
  NO_WARNINGS_APPLY = "Author indicated no warnings apply",
  CHOOSE_NOT_TO_WARN = "Author chose not to warn",
  EXTERNAL = "External work",
  HAS_WARNING = "Work has one or more warning",
}

export enum WorkWarnings {
  GRAPHIC_VIOLENCE = "Graphic depictions of violence",
  MAJOR_CHARACTER_DEATH = "Major character death",
  NONCON = "Rape/non-con",
  UNDERAGE = "Underage",
}

export interface WorkSummary {
  id: number;
  title: string;
  category: WorkCategory | null;
  // Date in ISO format. See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
  // Note that AO3 doesn't publish the actual time of publish, just the date.
  publishedAt: string;
  updatedAt: string | null;
  // TODO: should this be in HTML?
  summary: string;
  rating: WorkRatings;
  // Whether this work will display the "this work could have adult content" banner
  // upon access.
  adult: boolean;
  fandoms: string[];
  warningStatus: WorkWarningStatus;
  tags: {
    warnings: WorkWarnings[];
    characters: string[];
    relationships: string[];
    additional: string[];
  };
  authors: (
    | "anonymous"
    | "orphan_account"
    | {
        username: string;
        // This is the name the work is published under. Might be the same as username.
        pseud: string;
      }
  )[];
  language: string;
  words: number;
  chapters: {
    published: number;
    total: number | null;
    complete: boolean;
  };
  stats: {
    bookmarks: number;
    comments: number;
    kudos: number;
    hits: number;
  };
}
