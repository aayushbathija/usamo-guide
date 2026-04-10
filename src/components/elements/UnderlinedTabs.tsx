import * as React from 'react';

export default function UnderlinedTabs({
  options,
  labelMap,
  value,
  onChange,
}: {
  options: string[];
  labelMap?: { [key: string]: string };
  value: string;
  onChange: (newValue: string) => void;
}) {
  return (
    <>
      <div className="sm:hidden">
        <label htmlFor="selected-tab" className="sr-only">
          Select a tab
        </label>
        <select
          id="selected-tab"
          name="selected-tab"
          className="mt-1 block w-full rounded-md border-[rgba(240,194,255,0.25)] bg-[rgba(18,15,36,0.80)] py-2 pr-10 pl-3 text-base text-[#F4EDEA] focus:border-[#70428A] focus:ring-[#70428A] focus:outline-hidden sm:text-sm"
          value={value}
          onChange={e => onChange(e.target.value)}
        >
          {options.map(option => (
            <option value={option} key={option}>
              {labelMap ? labelMap[option] : option}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-[rgba(240,194,255,0.20)]">
          <nav className="-mb-px flex space-x-8">
            {options.map(option => (
              <button
                key={option}
                onClick={() => onChange(option)}
                className={
                  (value === option
                    ? 'border-[#70428A] text-[#F0C2FF]'
                    : 'border-transparent text-[rgba(244,237,234,0.55)] hover:border-[rgba(240,194,255,0.30)] hover:text-[rgba(244,237,234,0.85)]') +
                  ' border-b-2 px-1 py-4 text-sm font-medium whitespace-nowrap focus:outline-hidden'
                }
              >
                {labelMap ? labelMap[option] : option}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
