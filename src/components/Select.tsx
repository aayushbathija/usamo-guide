import React from 'react';
import Select from 'react-select';
import { useDarkMode } from '../context/DarkModeContext';
export default function StyledSelect(props) {
  const darkMode = useDarkMode();
  const portalTarget =
    typeof document !== 'undefined' ? document.body : null;
  return (
    <Select
      menuPortalTarget={portalTarget}
      menuPosition="fixed"
      className={`tw-forms-disable text-left ${props.className}`}
      styles={
        !darkMode
          ? undefined
          : {
              control: provided => ({
                ...provided,
                backgroundColor: 'var(--select-bg)',
                borderColor: 'var(--select-border)',
                borderRadius: '1rem',
              }),
              menuList: provided => ({
                ...provided,
                borderColor: 'var(--select-border)',
                borderWidth: '1px',
                borderRadius: '1rem',
              }),
              menu: provided => ({
                ...provided,
                backgroundColor: 'var(--select-menu-bg)',
                borderRadius: '1rem',
                zIndex: 9999,
              }),
              menuPortal: provided => ({
                ...provided,
                zIndex: 9999,
              }),
              indicatorSeparator: provided => ({
                ...provided,
                backgroundColor: 'var(--select-border)',
              }),
              indicatorsContainer: provided => ({
                ...provided,
                color: 'var(--select-border)',
              }),
              singleValue: provided => ({
                ...provided,
                color: 'var(--select-text)',
              }),
              input: provided => ({
                ...provided,
                color: 'var(--select-text)',
              }),
              option: (provided, { isFocused, isSelected }) => ({
                ...provided,
                ...(isFocused
                  ? {
                      backgroundColor: 'var(--select-option-hover)',
                    }
                  : isSelected
                    ? { backgroundColor: 'var(--select-option-selected)' }
                    : {}),
              }),
            }
      }
      {...props}
    />
  );
}