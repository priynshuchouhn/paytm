/* eslint-disable react/prop-types */

function InputBox({label, type, placeholder}) {
  return (
    <div className="text-start mb-5">
      <label htmlFor="" className="text-base uppercase text-slate-600 mb-2">{label}</label>
      <input type={type} placeholder={placeholder} className="text-base p-2 border border-gray-300 placeholder:text-base rounded-lg w-full"/>
    </div>
  )
}

export default InputBox
