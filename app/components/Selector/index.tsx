import * as api from '@/app/redux/services/api';

interface CitySelectorProps {
  value?: api.City
  onChange: (v: api.City | undefined) => void,
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
        onChange(undefined)
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
  onChange: (v: api.District | undefined) => void
  optional?: boolean
}

export const DistrictSelector = ({city, value, onChange, optional}: DistrictSelectorProps) => {
  const { data, isLoading } = api.useGetDistrictsQuery(city ? city.city : 'Санкт-Петербург');

  if (data && !value && city && !optional) {
    onChange(data[0])
  }
  
  if (!city && value) onChange(undefined);

  return (
    <select className="input" value={value ? value.id : -1} onChange={(e) => {
      if (e.target.value == "-1") {
        onChange(undefined)
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
  onChange: (v: api.PetType | undefined) => void
  optional?: boolean
}

export const PetTypeSelector = ({value, onChange, optional}: PetTypeSelectorProps) => {
  const { data, isLoading } = api.useGetPetTypesQuery();

  if (data && !value && !optional) {
    onChange(data[0])
  }
  
  return (
    <select className="input" value={value ? (value.type || (value as any).typeName) : "null"} onChange={(e) => {
      if (e.target.value == "null") {
        onChange(undefined)
      } else if (data) {
        let v = data.find(v => v.type == e.target.value || (v as any).typeName == e.target.value);
        if (v) {
          onChange(v)
        }
      }
    }}>
      {optional && <option value={"null"}>Любой</option>}
      {data && data.map((v, i) => <option value={(v as any).typeName || v.type} key={i}>{v.type}</option>)}
    </select>
  )
}

interface BloodTypeSelectorProps {
  petType?: Partial<api.PetType>
  value?: api.BloodType
  onChange: (v: api.BloodType | undefined) => void
  optional?: boolean
}

// export const BloodTypeSelector = ({petType, value, onChange, optional}: BloodTypeSelectorProps) => {
//   const { data, isLoading } = api.useGetBloodTypesQuery(petType?.type || 'Кошка');

//   // if (data && !value && petType && !optional) {
//   //   if (data[0].typeName == petType.type) {
//   //     console.log("SUCK MY DICK", data[0])
//   //     onChange(data[0].id)
//   //   }
//   // }

//   console.log("suck my dick", value, petType)

//   // if (data && petType && !optional && (!value || value.type != petType.type)) {
//   //   if (data[1].type == petType.type) {
//   //     onChange(data[1].id)
//   //   }
//   // }

//   if (!petType && value) onChange(undefined);

//   if (data && petType && !optional && (!value) {
//     onChange(data[1].id)
//   }
  
//   return (
//     <select className="input" value={String(value)} onChange={(e) => onChange(e.target.value == "null" ? undefined: Number(e.target.value))}>
//       {(optional || !petType) && <option value={"null"}>Любая</option>}
//       {petType && data && data.map((v, i) => <option value={String(v.id)} key={i}>{v.bloodType == "default" ? "Не важна" : v.bloodType}</option>)}
//     </select>
//   )
// }


export const BloodTypeSelector = ({petType, value, onChange, optional}: BloodTypeSelectorProps) => {
  const { data, isLoading } = api.useGetBloodTypesQuery(petType && petType.type ? petType.type : 'Кошка');

  if (data && petType && !optional && (!value || (value as any).typeName != petType.type)) {
    if ((data[0] as any).typeName == petType.type) {
        console.log("FUCKING ", data[0]);
      onChange(data[0])
    }
  }
  
  if (!petType && value) onChange(undefined);
  
  return (
    <select className="input" value={value ? value.id : -1} onChange={(e) => {
      if (e.target.value == "null") {
        onChange(undefined)
      } else if (data) {
        let v = data.find(v => v.id == Number(e.target.value));
        if (v) {
          onChange(v)
        }
      }
    }}>
      {optional && <option value={"null"}>Любой</option>}
      {data && data.map((v, i) => <option value={v.id} key={i}>{v.bloodType == 'default' ? 'Не важна' : v.bloodType}</option>)}
    </select>
  )
}

interface BreedSelectorProps {
  petType?: Partial<api.PetType>
  value?: api.PetType
  onChange: (v: api.PetType | undefined) => void
}

export const BreedTypeSelector = ({petType, value, onChange}: BreedSelectorProps) => {
  const { data, isLoading } = api.useGetBreedTypesQuery(petType && petType.type ? petType.type : 'Кошка');

  if (data && petType && (!value || value.type != petType.type)) {
    if (data[1].type == petType.type) {
      onChange(data[1])
    }
  }
  
  if (!petType && value) onChange(undefined);
  
  return (
    <select className="input" value={value ? value.id : -1} onChange={(e) => {
      if (e.target.value == "-1") {
        onChange(undefined)
      } else if (data) {
        let v = data.find(v => v.id == Number(e.target.value));
        if (v) {
          onChange(v)
        }
      }
    }}>
      {data && data.slice(1).map((v, i) => <option value={v.id} key={i}>{v.breed}</option>)}
    </select>
  )
}
