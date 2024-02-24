import * as api from '@/app/redux/services/api';

interface CitySelectorProps {
  value: api.City
  onChange: (v: api.City) => void
}

export const CitySelector = ({value, onChange}: CitySelectorProps) => {
  const { data, isLoading } = api.useGetCitiesQuery();
  
  return (
    <select className="input" value={value.id} onChange={(e) => {
      if (data) {
        let v = data.find(v => v.id == Number(e.target.value));
        if (v) {
          onChange(v)
        }
      }
    }}>
      {data && data.map((v, i) => <option value={v.id} key={i}>{v.city}</option>)}
    </select>
  )
}

interface DistrictSelectorProps {
  city: api.City
  value: api.District
  onChange: (v: api.District) => void
}

export const DistrictSelector = ({city, value, onChange}: DistrictSelectorProps) => {
  const { data, isLoading } = api.useGetDistrictsQuery(city.city);

  return (
    <select className="input" value={value.id} onChange={(e) => {
      if (data) {
        let v = data.find(v => v.id == Number(e.target.value));
        if (v) {
          onChange(v)
        }
      }
    }}>
      {data && data.map((v, i) => <option value={v.id} key={i}>{v.district || "Не важен"}</option>)}
    </select>
  )
}

interface PetTypeSelectorProps {
  value: api.PetType
  onChange: (v: api.PetType) => void
}

export const PetTypeSelector = ({value, onChange}: PetTypeSelectorProps) => {
  const { data, isLoading } = api.useGetPetTypesQuery();

  if (data && !value) {
    onChange(data[0])
  }
  
  return (
    <select className="input" value={value && value.id} onChange={(e) => {
      if (data) {
        let v = data.find(v => v.id == Number(e.target.value));
        if (v) {
          onChange(v)
        }
      }
    }}>
      {data && data.map((v, i) => <option value={v.id} key={i}>{v.type}</option>)}
    </select>
  )
}

interface BloodTypeSelectorProps {
  petType: api.PetType
  value: number
  onChange: (v: number) => void
}

export const BloodTypeSelector = ({petType, value, onChange}: BloodTypeSelectorProps) => {
  let pettype = petType || 'Кошка';
  const { data, isLoading } = api.useGetBloodTypesQuery(pettype.type);

  if (data && !value) {
    onChange(data[0].id)
  }
  
  return (
    <select className="input" value={String(value)} onChange={(e) => onChange(Number(e.target.value))}>
      {data && data.map((v, i) => <option value={String(v.id)} key={i}>{v.bloodType == "default" ? "Не важна" : v.bloodType}</option>)}
    </select>
  )
}
