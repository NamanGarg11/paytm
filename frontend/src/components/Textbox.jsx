import React from 'react'

const Textbox = ({name,type,onchange}) => {
  return (
<div>
<label htmlFor={name} className="block text-sm/6 font-medium text-gray-900">
  {name}
</label>
<div className="mt-2">
  <input
    onChange={onchange}
    id={name}
    type={type}
    required
    autoComplete=""
   className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
  />
</div>
</div>
  )
}

export default Textbox