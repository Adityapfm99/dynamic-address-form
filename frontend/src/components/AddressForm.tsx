import React, { useState, useEffect, useRef } from 'react';
import { getCountryMetadata, saveAddress } from '../api';
import '../App.css';
import Script from 'react-load-script';

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY || '';
const COUNTRIES = [
  { code: 'USA', name: 'United States' },
  { code: 'AUS', name: 'Australia' },
  { code: 'IDN', name: 'Indonesia' },
];

type CountryField = {
  name: string;
  label: string;
  required: boolean;
  type?: 'text' | 'dropdown';
  options?: string[];
  pattern?: string;
};

type CountryMetadata = {
  code: string;
  name: string;
  fields: CountryField[];
};

function AddressForm({ onSaved }: { onSaved: () => void }) {
  const [country, setCountry] = useState('USA');
  const [metadata, setMetadata] = useState<CountryMetadata | null>(null);
  const [manual, setManual] = useState(false);
  const [fields, setFields] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const autocompleteRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    getCountryMetadata(country).then(setMetadata);
    setFields({});
    setErrors({});
    setManual(false);
  }, [country]);

  useEffect(() => {
    if (googleLoaded && autocompleteRef.current) {
      // @ts-ignore
      const autocomplete = new window.google.maps.places.Autocomplete(autocompleteRef.current, {
        types: ['address'],
        componentRestrictions: { country: country.toLowerCase() },
      });
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place && place.formatted_address) {
          setFields(fields => ({ ...fields, addressLine1: place.formatted_address }));
        }
      });
    }
  }, [googleLoaded, country]);

  // Google Places Autocomplete handler
  const handlePlaceSelect = (e: any) => {
    const place = e.target.value;
    setFields({ ...fields, addressLine1: place });
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    metadata?.fields.forEach(f => {
      if (f.required && !fields[f.name]) {
        errs[f.name] = 'Required';
      } else if (f.pattern && fields[f.name]) {
        // Only validate format if pattern is defined
        if (!(new RegExp(f.pattern).test(fields[f.name].trim()))) {
          errs[f.name] = 'Invalid format';
        }
      }
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await saveAddress(country, fields);
    setFields({});
    setManual(false);
    onSaved();
  };

  if (!metadata) return null;

  return (
    <form className="address-form" onSubmit={handleSubmit}>
      <Script
        url={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`}
        onLoad={() => setGoogleLoaded(true)}
      />
      <label>
        Country:
        <select value={country} onChange={e => setCountry(e.target.value)}>
          {COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
        </select>
      </label>
      {!manual ? (
        <>
          <div>
            <input
              ref={autocompleteRef}
              id="autocomplete"
              placeholder="Start typing address..."
              value={fields.addressLine1 || ''}
              onChange={e => setFields({ ...fields, addressLine1: e.target.value })}
              autoComplete="off"
            />
          </div>
          <button type="button" onClick={() => setManual(true)}>Manually Edit</button>
        </>
      ) : (
        <>
          {metadata.fields.map(f => (
            <div key={f.name}>
              <label>
                {f.label}
                {f.type === 'dropdown' ? (
                  <select
                    value={fields[f.name] || ''}
                    onChange={e => setFields({ ...fields, [f.name]: e.target.value })}
                  >
                    <option value="">Select</option>
                    {f.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={fields[f.name] || ''}
                    onChange={e => setFields({ ...fields, [f.name]: e.target.value })}
                  />
                )}
              </label>
              {errors[f.name] && <span className="error">{errors[f.name]}</span>}
            </div>
          ))}
          <button type="submit">Save Address</button>
        </>
      )}
    </form>
  );
}

export default AddressForm;