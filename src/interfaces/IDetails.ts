export interface ICountryDetails {
  Introduction: any;
  Geography: any;
  "People and Society": any;
  Government: any;
  Economy: any;
  Energy: any;
  Communications: any;
  Transportation: any;
  "Military and Security": any;
  "Transnational Issues": any;
}

export interface ITextEntry {
  text: string;
}

export interface IIntroduction {
  Background: ITextEntry;
}

export interface IArea {
  total: ITextEntry;
  land: ITextEntry;
  water: ITextEntry;
}

export interface IMaritimeClaims {
  "territorial sea": ITextEntry;
}

export interface IElevation {
  "mean elevation": ITextEntry;
  "elevation extremes": ITextEntry;
}

export interface ILandUse {
  "agricultural land": ITextEntry;
  forest: ITextEntry;
  other: ITextEntry;
}

export interface IGeography {
  Location: ITextEntry;
  "Geographic coordinates": ITextEntry;
  "Map references": ITextEntry;
  Area: IArea;
  "Area - comparative": ITextEntry;
  "Land boundries": ITextEntry;
  Coastline: ITextEntry;
  "Maritime claims": IMaritimeClaims;
  Climate: ITextEntry;
  Terrain: ITextEntry;
  Elevtation: IElevation;
  "Natural resources": ITextEntry;
  "Land use": ILandUse;
  "Irrigated land": ITextEntry;
  "Populdation - distribution": ITextEntry;
  "Natural hazards": ITextEntry;
  "Environment - current issues": ITextEntry;
  "Geography - note": ITextEntry;
}