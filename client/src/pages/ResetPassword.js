import React, { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'

import { Link, useLocation } from '@reach/router'

import { Helmet } from 'react-helmet'

import Button from '../components/Button'
import FormError from '../components/FormError'
import useAuth from '../hooks/useAuth'
import Context from '../modules/Context'
import AuthWrapper, {
  AuthLeftContainer,
  AuthRightContainer
} from '../components/AuthWrapper'

const ResetPassword = () => {

  const { state } = useContext(Context)

  const { resetPassword } = useAuth()

  const { register, handleSubmit, errors } = useForm()

  const location = useLocation()

  const [response, setResponse] = useState('')

  const onSubmit = async (data) => {
    try {
      const reply = await resetPassword({
        code: location.search.slice(6),
        password: data.password,
        passwordConfirmation: data.passwordConfirmation
      })
      setResponse(reply)
    } catch (e) {}
  }

  return (
    <>
      <Helmet>
        <title>Reset your password | Test Assistant</title>
        <meta name='robots' content='noindex' />
      </Helmet>
      <AuthWrapper>
        <AuthLeftContainer />
        <AuthRightContainer>
          <div>
            {response ? (
              <>
                <div className='header'>
                Forgot password?
                </div>
                <p>Your password has been reset.</p>
                <div className='flex flex-row flex-space-between'>
                  <Link className='link link-default' to='/login'>
                  Take me to the sign-in page
                  </Link>
                </div>
              </>
            ) : (
              <>
                {state.errorCode && <FormError status={state.errorCode} />}
                <form
                  className='form-default'
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className='header'>
                  Set your new password
                  </div>
                  <div className='form-element'>
                    <label htmlFor='password'>
                    New password
                    </label>
                    <input
                      className='input-default'
                      type='password'
                      name='password'
                      ref={register({ required: true })}
                    />

                    {errors.password && (
                      <FormError type={errors.password.type} />
                    )}
                  </div>
                  <div className='form-element'>
                    <label htmlFor='confirm-password'>
                    Confirm password
                    </label>
                    <input
                      className='input-default'
                      type='password'
                      name='passwordConfirmation'
                      ref={register({ required: true })}
                    />
                    {errors.passwordConfirmation && (
                      <FormError type={errors.passwordConfirmation.type} />
                    )}
                  </div>
                  <Button type='submit' className='btn btn-default'>
                    Submit
                  </Button>
                </form>
              </>
            )}
          </div>
        </AuthRightContainer>
      </AuthWrapper>
    </>
  )
}

export default ResetPassword
