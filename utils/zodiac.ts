export function calculateZodiac(d: Date) {
  const m = d.getUTCMonth() + 1;
  const day = d.getUTCDate();
  // Batı zodyağı aralıkları
  if ((m === 3 && day >= 21) || (m === 4 && day <= 19)) return "Koç";
  if ((m === 4 && day >= 20) || (m === 5 && day <= 20)) return "Boğa";
  if ((m === 5 && day >= 21) || (m === 6 && day <= 20)) return "İkizler";
  if ((m === 6 && day >= 21) || (m === 7 && day <= 22)) return "Yengeç";
  if ((m === 7 && day >= 23) || (m === 8 && day <= 22)) return "Aslan";
  if ((m === 8 && day >= 23) || (m === 9 && day <= 22)) return "Başak";
  if ((m === 9 && day >= 23) || (m === 10 && day <= 22)) return "Terazi";
  if ((m === 10 && day >= 23) || (m === 11 && day <= 21)) return "Akrep";
  if ((m === 11 && day >= 22) || (m === 12 && day <= 21)) return "Yay";
  if ((m === 12 && day >= 22) || (m === 1 && day <= 19)) return "Oğlak";
  if ((m === 1 && day >= 20) || (m === 2 && day <= 18)) return "Kova";
  return "Balık";
}
