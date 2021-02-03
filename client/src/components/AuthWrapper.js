import React from 'react'
import eosLogoColoured from '../assets/images/logo-coloured.png'

export const AuthWrapper = ({ children }) => {
  return (
    <div className='authentication-wrapper'>
      <div className='authentication'>{children}</div>
    </div>
  )
}

export const AuthLeftContainer = () => {

  return (
    <div className='container-left'>
      <div className='container-left-content'>
        <div className='header header-uppercase'>
        Test Assistant
        </div>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
        <div className='footer'>
          <p>
          This site saves some information in cookies but only when strictly necessary
            <a className='link link-default' href='/policies'>
              Learn More
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export const AuthRightContainer = ({ children, logo }) => {

  return (
    <div className='container-right'>
      <div className='flex flex-row flex-space-between'>
        <div className='image image-logo eos-logo-resize'>
          <img src={logo ?? eosLogoColoured} alt='EOS Logo' />
        </div>
      </div>
      {children}
      <div className='footer'>
        <span>
          <i className='eos-icons'>copyright</i>
          <span> 2021 Test Assistant </span>
        </span>
        <a className='link link-default' href='/policies'>
          {' '}
          Cookies and Privacy policy
        </a>
      </div>

      <div className='cookies-mobile'>
        <p>
        This site saves some information in cookies but only when strictly necessary
          <a className='link link-default' href='/policies'>
            Learn More
          </a>
        </p>
      </div>
    </div>
  )
}

export default AuthWrapper
