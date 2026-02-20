// Villes du Maroc avec coordonnées GPS et fuseau horaire
// Toutes les villes utilisent UTC+1 (heure normale du Maroc)
// En été (DST) le Maroc passe à UTC+2, mais Ramadan 2026 est en hiver donc UTC+1

export const MOROCCAN_CITIES = [
  // Grandes villes
  { id: 'casablanca', name: 'الدار البيضاء', nameFr: 'Casablanca', region: 'الدار البيضاء-سطات', lat: 33.5731, lon: -7.5898, timezone: 1 },
  { id: 'rabat', name: 'الرباط', nameFr: 'Rabat', region: 'جهة الرباط-سلا-القنيطرة', lat: 34.0209, lon: -6.8416, timezone: 1 },
  { id: 'fes', name: 'فاس', nameFr: 'Fès', region: 'فاس-مكناس', lat: 34.0333, lon: -5.0000, timezone: 1 },
  { id: 'marrakech', name: 'مراكش', nameFr: 'Marrakech', region: 'مراكش-آسفي', lat: 31.6295, lon: -7.9811, timezone: 1 },
  { id: 'meknes', name: 'مكناس', nameFr: 'Meknès', region: 'فاس-مكناس', lat: 33.8935, lon: -5.5473, timezone: 1 },
  { id: 'oujda', name: 'وجدة', nameFr: 'Oujda', region: 'الشرق', lat: 34.6814, lon: -1.9086, timezone: 1 },
  { id: 'tanger', name: 'طنجة', nameFr: 'Tanger', region: 'طنجة-تطوان-الحسيمة', lat: 35.7595, lon: -5.8340, timezone: 1 },
  { id: 'agadir', name: 'أكادير', nameFr: 'Agadir', region: 'سوس-ماسة', lat: 30.4202, lon: -9.5981, timezone: 1 },
  { id: 'tetouan', name: 'تطوان', nameFr: 'Tétouan', region: 'طنجة-تطوان-الحسيمة', lat: 35.5785, lon: -5.3684, timezone: 1 },
  { id: 'sale', name: 'سلا', nameFr: 'Salé', region: 'جهة الرباط-سلا-القنيطرة', lat: 34.0531, lon: -6.7985, timezone: 1 },
  
  // Villes moyennes
  { id: 'kenitra', name: 'القنيطرة', nameFr: 'Kénitra', region: 'جهة الرباط-سلا-القنيطرة', lat: 34.2610, lon: -6.5802, timezone: 1 },
  { id: 'safi', name: 'آسفي', nameFr: 'Safi', region: 'مراكش-آسفي', lat: 32.2994, lon: -9.2372, timezone: 1 },
  { id: 'el_jadida', name: 'الجديدة', nameFr: 'El Jadida', region: 'الدار البيضاء-سطات', lat: 33.2316, lon: -8.5007, timezone: 1 },
  { id: 'nador', name: 'الناظور', nameFr: 'Nador', region: 'الشرق', lat: 35.1681, lon: -2.9294, timezone: 1 },
  { id: 'settat', name: 'سطات', nameFr: 'Settat', region: 'الدار البيضاء-سطات', lat: 33.0010, lon: -7.6207, timezone: 1 },
  { id: 'taza', name: 'تازة', nameFr: 'Taza', region: 'فاس-مكناس', lat: 34.2100, lon: -4.0100, timezone: 1 },
  { id: 'beni_mellal', name: 'بني ملال', nameFr: 'Béni Mellal', region: 'بني ملال-خنيفرة', lat: 32.3394, lon: -6.3498, timezone: 1 },
  { id: 'khouribga', name: 'خريبكة', nameFr: 'Khouribga', region: 'بني ملال-خنيفرة', lat: 32.8811, lon: -6.9063, timezone: 1 },
  { id: 'essaouira', name: 'الصويرة', nameFr: 'Essaouira', region: 'مراكش-آسفي', lat: 31.5085, lon: -9.7595, timezone: 1 },
  { id: 'errachidia', name: 'الراشيدية', nameFr: 'Errachidia', region: 'درعة-تافيلالت', lat: 31.9314, lon: -4.4231, timezone: 1 },
  { id: 'ouarzazate', name: 'ورزازات', nameFr: 'Ouarzazate', region: 'درعة-تافيلالت', lat: 30.9335, lon: -6.9370, timezone: 1 },
  { id: 'guelmim', name: 'كلميم', nameFr: 'Guelmim', region: 'كلميم-واد نون', lat: 28.9870, lon: -10.0574, timezone: 1 },
  { id: 'laayoune', name: 'العيون', nameFr: 'Laâyoune', region: 'العيون-الساقية الحمراء', lat: 27.1253, lon: -13.1625, timezone: 1 },
  { id: 'dakhla', name: 'الداخلة', nameFr: 'Dakhla', region: 'الداخلة-وادي الذهب', lat: 23.6848, lon: -15.9570, timezone: 1 },
  { id: 'al_hoceima', name: 'الحسيمة', nameFr: 'Al Hoceïma', region: 'طنجة-تطوان-الحسيمة', lat: 35.2517, lon: -3.9372, timezone: 1 },
  { id: 'khemisset', name: 'الخميسات', nameFr: 'Khémisset', region: 'جهة الرباط-سلا-القنيطرة', lat: 33.8200, lon: -6.0700, timezone: 1 },
  { id: 'berkane', name: 'بركان', nameFr: 'Berkane', region: 'الشرق', lat: 34.9200, lon: -2.3200, timezone: 1 },
  { id: 'taourirt', name: 'تاوريرت', nameFr: 'Taourirt', region: 'الشرق', lat: 34.4100, lon: -2.8900, timezone: 1 },
  { id: 'ifrane', name: 'إفران', nameFr: 'Ifrane', region: 'فاس-مكناس', lat: 33.5334, lon: -5.1073, timezone: 1 },
  { id: 'chefchaouen', name: 'شفشاون', nameFr: 'Chefchaouen', region: 'طنجة-تطوان-الحسيمة', lat: 35.1688, lon: -5.2636, timezone: 1 },
  { id: 'tiznit', name: 'تيزنيت', nameFr: 'Tiznit', region: 'سوس-ماسة', lat: 29.6975, lon: -9.7321, timezone: 1 },
  { id: 'taroudant', name: 'تارودانت', nameFr: 'Taroudant', region: 'سوس-ماسة', lat: 30.4705, lon: -8.8785, timezone: 1 },
  { id: 'benguerir', name: 'بن جرير', nameFr: 'Benguerir', region: 'مراكش-آسفي', lat: 32.2333, lon: -7.9500, timezone: 1 },
  { id: 'youssoufia', name: 'اليوسفية', nameFr: 'Youssoufia', region: 'مراكش-آسفي', lat: 32.2500, lon: -8.5333, timezone: 1 },
  { id: 'kalaat_sraghna', name: 'قلعة السراغنة', nameFr: 'Kalaat Sraghna', region: 'مراكش-آسفي', lat: 32.0500, lon: -7.4000, timezone: 1 },
  { id: 'azilal', name: 'أزيلال', nameFr: 'Azilal', region: 'بني ملال-خنيفرة', lat: 31.9667, lon: -6.5667, timezone: 1 },
  { id: 'midelt', name: 'ميدلت', nameFr: 'Midelt', region: 'درعة-تافيلالت', lat: 32.6833, lon: -4.7333, timezone: 1 },
  { id: 'zagora', name: 'زاكورة', nameFr: 'Zagora', region: 'درعة-تافيلالت', lat: 30.3333, lon: -5.8333, timezone: 1 },
  { id: 'tan_tan', name: 'طانطان', nameFr: 'Tan-Tan', region: 'كلميم-واد نون', lat: 28.4338, lon: -11.1008, timezone: 1 },
  { id: 'inzegan', name: 'إنزكان', nameFr: 'Inzegane', region: 'سوس-ماسة', lat: 30.3567, lon: -9.5300, timezone: 1 },
  { id: 'azrou', name: 'أزرو', nameFr: 'Azrou', region: 'فاس-مكناس', lat: 33.4336, lon: -5.2219, timezone: 1 },
  { id: 'larache', name: 'العرائش', nameFr: 'Larache', region: 'طنجة-تطوان-الحسيمة', lat: 35.1932, lon: -6.1558, timezone: 1 },
  { id: 'ksar_el_kebir', name: 'القصر الكبير', nameFr: 'Ksar El Kébir', region: 'طنجة-تطوان-الحسيمة', lat: 35.0000, lon: -5.9000, timezone: 1 },
];

export const REGIONS = [...new Set(MOROCCAN_CITIES.map(c => c.region))];