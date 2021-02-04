import React, { useState, useEffect, useRef } from 'react'
import Button from './Button'

const LanguageDropdown = (props) => {
  const { translator } = props
  const container = useRef()

  const [dropdownState, setDropdownState] = useState(false)
  const handleButtonClick = (event) => {
    setDropdownState(!dropdownState)
  }
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (container.current && !container.current.contains(event.target)) {
        setDropdownState(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [container])

  return (
    <div className='dropdown-container' ref={container}>
      <Button
        type='button'
        className='btn btn-secondary'
        onClick={handleButtonClick}
      >
        {dropdownState ? (
          <i className='eos-icons'>keyboard_arrow_up</i>
        ) : (
          <i className='eos-icons'>keyboard_arrow_down</i>
        )}
        &nbsp; Language
      </Button>
      {dropdownState ? (
        <div className='dropdown'>
          <ul className='dropdown-list'>
            <li
              className='dropdown-element'
              onClick={() => {
                translator.changeLanguage('en')
                setDropdownState(false)
              }}
            >
              English
            </li>
            <li
              className='dropdown-element'
              onClick={() => {
                translator.changeLanguage('es')
                setDropdownState(false)
              }}
            >
              Spanish
            </li>
          </ul>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default LanguageDropdown
