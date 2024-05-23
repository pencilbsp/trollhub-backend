type Segment = {
  title: string;
  byterange: {
    length: number;
    offset: number;
  };
  duration: number;
  programDateTime: number;
  attributes: any;
  discontinuity: number;
  uri: string;
  timeline: number;
  key: {
    method: string;
    uri: string;
    iv: string;
  };
  map: {
    uri: string;
    byterange: {
      length: number;
      offset: number;
    };
  };
  "cue-out": string;
  "cue-out-cont": string;
  "cue-in": string;
  custom: any;
};

type LineStream = any;
type ParseStream = any;

type Manifest = {
  allowCache: boolean;
  endList: boolean;
  mediaSequence: number;
  dateRanges: any[];
  discontinuitySequence: number;
  playlistType: string;
  custom: any;
  playlists: [
    {
      attributes: any;
    }
  ];
  mediaGroups: {
    AUDIO: {
      "GROUP-ID": {
        NAME: {
          default: boolean;
          autoselect: boolean;
          language: string;
          uri: string;
          instreamId: string;
          characteristics: string;
          forced: boolean;
        };
      };
    };
    VIDEO: any;
    "CLOSED-CAPTIONS": any;
    SUBTITLES: any;
  };
  dateTimeString: string;
  dateTimeObject: Date;
  targetDuration: number;
  totalDuration: number;
  discontinuityStarts: number[];
  segments: Segment[];
};

declare module "m3u8-parser" {
  export class Parser {
    lineStream: LineStream;
    parseStream: ParseStream;
    lastProgramDateTime: any;

    manifest: Manifest;

    constructor();

    end: () => void;
    push: (chunk: string) => void;
    addParser: (options: {
      segment: boolean;
      expression: RegExp;
      customType: string;
      dataParser: VoidFunction;
    }) => void;
    addTagMapper: (options: { expression: RegExp; map: VoidFunction }) => void;
  }
}
