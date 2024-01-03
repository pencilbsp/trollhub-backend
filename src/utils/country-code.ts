const countryCodes = [
  ["Thailand", "Thái Lan", "TH", "THA"],
  ["China", "Trung Quốc", "CN", "CHN"],
  ["Japan", "Nhật Bản", "JP", "JPN"],
  ["Korea", "Hàn Quốc", "JP", "KOR"],
  ["U.S. UK", "Âu Mỹ", "USUK", "USUK"],
];

export default function getCountryCode(vieName: string | undefined) {
  return countryCodes.find((country) => country[1] === vieName);
}
