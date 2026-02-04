export type Signal = {
  key: string;
  value: string;
  confidence: number;
};

export type ScanResult = {
  domain: string;
  scannedAt: string;
  architecture: Signal[];
  modernity: number;
};
