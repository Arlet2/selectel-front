import * as api from '@/app/redux/services/api';

interface CitySelectorProps {
  value?: api.City
  onChange: (v: api.City) => void,
  optional?: boolean
}

export const CitySelector = ({value, onChange, optional}: CitySelectorProps) => {
  const { data, isLoading } = api.useGetCitiesQuery();

  if (data && !value && !optional) {
    onChange(data[0])
  }
  
  return (
    <select className="input" value={value ? value.id : -1} onChange={(e) => {
      if (e.target.value == "-1")
        onChange(null)
      else if (data) {
        let v = data.find(v => v.id == Number(e.target.value));
        if (v) {
          onChange(v)
        }
      }
    }}>
      {optional && <option value={-1}>Любой</option>}
      {data && data.map((v, i) => <option value={v.id} key={i}>{v.city}</option>)}
    </select>
  )
}

interface DistrictSelectorProps {
  city?: api.City
  value?: api.District
  onChange: (v: api.District) => void
  optional?: boolean
}

export const DistrictSelector = ({city, value, onChange, optional}: DistrictSelectorProps) => {
  const { data, isLoading } = api.useGetDistrictsQuery(city ? city.city : 'Санкт-Петербург');

  if (data && !value && city && !optional) {
    onChange(data[0])
  }
  
  if (!city && value) onChange(null);

  return (
    <select className="input" value={value ? value.id : -1} onChange={(e) => {
      if (e.target.value == "-1") {
        onChange(null)
      } else if (data) {
        let v = data.find(v => v.id == Number(e.target.value));
        if (v) {
          onChange(v)
        }
      }
    }}>
      {(optional || !city) && <option value={-1}>Любой</option>}
      {city && data && data.map((v, i) => <option value={v.id} key={i}>{v.district || "Не важен"}</option>)}
    </select>
  )
}

interface PetTypeSelectorProps {
  value?: Partial<api.PetType>
  onChange: (v: api.PetType) => void
  optional?: boolean
}

export const PetTypeSelector = ({value, onChange, optional}: PetTypeSelectorProps) => {
  const { data, isLoading } = api.useGetPetTypesQuery();

  if (data && !value && !optional) {
    onChange(data[0])
  }
  
  return (
    <select className="input" value={value ? value.id : -1} onChange={(e) => {
      if (e.target.value == "-1") {
        onChange(null)
      } else if (data) {
        let v = data.find(v => v.id == Number(e.target.value));
        if (v) {
          onChange(v)
        }
      }
    }}>
      {optional && <option value={-1}>Любой</option>}
      {data && data.map((v, i) => <option value={v.id} key={i}>{v.type}</option>)}
    </select>
  )
}

interface BloodTypeSelectorProps {
  petType?: Partial<api.PetType>
  value?: number
  onChange: (v: number) => void
  optional?: boolean
}

export const BloodTypeSelector = ({petType, value, onChange, optional}: BloodTypeSelectorProps) => {
  const { data, isLoading } = api.useGetBloodTypesQuery(petType?.type || 'Кошка');

  if (data && !value && petType && !optional) onChange(data[0])
  if (!petType && value) onChange(null);
  
  return (
    <select className="input" value={String(value)} onChange={(e) => onChange(e.target.value == "null" ? null : Number(e.target.value))}>
      {(optional || !petType) && <option value={"null"}>Любая</option>}
      {petType && data && data.map((v, i) => <option value={String(v.id)} key={i}>{v.bloodType == "default" ? "Не важна" : v.bloodType}</option>)}
    </select>
  )
}

interface BreedSelectorProps {
  petType?: Partial<api.PetType>
  value?: string
  onChange: (v: string) => void
}

export const BreedTypeSelector = ({value, onChange}: BreedSelectorProps) => {
  const { data, isLoading } = api.useGetBreedTypesQuery();

  if (data){
    console.log(data);
  }

  if (data && !value) {
    onChange(data[0].breed)
  }
  
  return (
    <select className="input" value={value} onChange={(e) => {
      if (data) {
        let v = data.find(v => v.id == Number(e.target.value));
        if (v) {
          onChange(v.breed)
        }
      }
    }}>
      {data && data.map((v, i) => <option value={v.id} key={i}>{v.breed}</option>)}
    </select>
  )
}
