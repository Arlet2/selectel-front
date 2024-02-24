import * as api from '@/app/redux/services/api';

interface CitySelectorProps {
  value: string
  onChange: (v: string) => void
}

export const CitySelector = ({value, onChange}: CitySelectorProps) => {
  const { data, isLoading } = api.useGetCitiesQuery();
  
  return (
    <select className="input" value={value} onChange={(e) => onChange(e.target.value)}>
      {data && data.map((v, i) => <option value={v} key={i}>{v}</option>)}
    </select>
  )
}

interface DistrictSelectorProps {
  city: string
  value: number
  onChange: (v: number) => void
}

export const DistrictSelector = ({city, value, onChange}: DistrictSelectorProps) => {
  const { data, isLoading } = api.useGetDistrictsQuery(city);
  
  return (
    <select className="input" value={String(value)} onChange={(e) => onChange(Number(e.target.value))}>
      {data && data.map((v, i) => <option value={String(v.id)} key={i}>{v.district}</option>)}
    </select>
  )
}

interface PetTypeSelectorProps {
  value: string
  onChange: (v: string) => void
}

export const PetTypeSelector = ({value, onChange}: PetTypeSelectorProps) => {
  const { data, isLoading } = api.useGetPetTypesQuery();
  
  return (
    <select className="input" value={value} onChange={(e) => onChange(e.target.value)}>
      {data && data.map((v, i) => <option value={v} key={i}>{v}</option>)}
    </select>
  )
}

interface BloodTypeSelectorProps {
  petType: string
  value: number
  onChange: (v: number) => void
}

export const BloodTypeSelector = ({petType, value, onChange}: BloodTypeSelectorProps) => {
  const { data, isLoading } = api.useGetBloodTypesQuery(petType);
  
  return (
    <select className="input" value={String(value)} onChange={(e) => onChange(Number(e.target.value))}>
      {data && data.map((v, i) => <option value={String(v.id)} key={i}>{v.bloodType == "default" ? "Не важна" : v.bloodType}</option>)}
    </select>
  )
}
