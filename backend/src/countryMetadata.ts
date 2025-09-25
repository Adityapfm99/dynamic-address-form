export type CountryField = {
  name: string;
  label: string;
  required: boolean;
  type?: 'text' | 'dropdown';
  options?: string[];
  pattern?: string;
};

export type CountryMetadata = {
  code: string;
  name: string;
  fields: CountryField[];
};

export const countryMetadata: Record<string, CountryMetadata> = {
  USA: {
    code: 'USA',
    name: 'United States',
    fields: [
      { name: 'addressLine1', label: 'Address Line 1', required: true },
      { name: 'addressLine2', label: 'Address Line 2', required: false },
      { name: 'city', label: 'City', required: true },
      { name: 'state', label: 'State', required: true, type: 'dropdown', options: ['CA', 'NY', 'TX'] },
      { name: 'zip', label: 'ZIP Code', required: true, pattern: '^\\d{5}$' },
    ],
  },
  AUS: {
    code: 'AUS',
    name: 'Australia',
    fields: [
      { name: 'addressLine1', label: 'Address Line 1', required: true },
      { name: 'addressLine2', label: 'Address Line 2', required: false },
      { name: 'suburb', label: 'Suburb', required: true },
      { name: 'state', label: 'State', required: true, type: 'dropdown', options: ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'] },
      { name: 'postcode', label: 'Postcode', required: true, pattern: '^\\d{4}$' },
    ],
  },
  IDN: {
    code: 'IDN',
    name: 'Indonesia',
    fields: [
      { name: 'province', label: 'Province', required: true, type: 'dropdown', options: ['Jawa Barat', 'Bali', 'Sumatra Utara'] },
      { name: 'city', label: 'City / Regency', required: true },
      { name: 'district', label: 'District (Kecamatan)', required: true },
      { name: 'village', label: 'Village (Kelurahan/Desa)', required: false },
      { name: 'postalCode', label: 'Postal Code', required: true, pattern: '^\\d{5}$' },
      { name: 'streetAddress', label: 'Street Address', required: true },
    ],
  },
};