import React, { useLayoutEffect, useState, useEffect, useContext } from 'react'
import { useForm } from 'react-hook-form'

import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import axios from 'axios'
import { apiURL } from '../config.json'
import { usePromiseTracker } from 'react-promise-tracker'
import { Helmet } from 'react-helmet'

import FormError from '../components/FormError'
import Navigation from '../components/Navigation'
import LoadingIndicator from '../modules/LoadingIndicator'
import Button from '../components/Button'
import Search from '../modules/TitleSearch'
import { navigate } from '@reach/router'
import Context from '../modules/Context'
import Login from './Login'

const NewStory = () => {
  const { state } = useContext(Context)

  const { register, handleSubmit, errors, setValue, watch } = useForm()

  const [descriptionError, setDescriptionError] = useState(false)

  const [storiesData, setStoriesData] = useState([])

  const [testReport, setTestReport] = useState(null)

  const { promiseInProgress } = usePromiseTracker()

  const [screenSize, setScreenSize] = useState(0)

  useLayoutEffect(() => {
    function updateScreenSize() {
      setScreenSize(window.innerWidth)
    }
    window.addEventListener('resize', updateScreenSize)
    updateScreenSize()
    return () => window.removeEventListener('resize', updateScreenSize)
  }, [])

  useEffect(() => {
    const fetchStoriesData = async () => {
      const response = await axios.post(
        `${apiURL}/graphql`,
        {
          query: `query {
            userStories(sort: "votes:desc,createdAt:desc") {
              id
              Title
              Description
              followers {
                username
              }
            }
          }`
        },
        {
          withCredentials: true
        }
      )
      setStoriesData(response.data.data.userStories)
    }
    fetchStoriesData()
  }, [])

  const handleFileUpload = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend= () => {
      setTestReport(reader.result);
      console.log(typeof reader.result)
    }

    reader.readAsText(file);

  }

  const onSubmit = async (data) => {
    if (data.description === undefined || data.description.length === 0) {
      setDescriptionError(true)
      return
    }
    await axios.post(
      `${apiURL}/graphql`,
      {
        query: `mutation {
          createUserStory(
            input: {
              data: {
                Title: "${data.title}"
                Description: "${data.description}"
                github: "${data.code}"
                testReport: ${JSON.stringify(testReport)}
              }
            }
          ) {
            userStory {
              createdAt
            }
          }
        }
        `
      },
      { withCredentials: true }
    )
    navigate('/')
  }
  useEffect(() => {
    register('description')
  })

  return state.auth ? (
    <>
      <Helmet>
        <title>New project | Test Assistant</title>
        <meta name='robots' content='noindex' />
      </Helmet>
      <Navigation />
      {promiseInProgress ? (
        <LoadingIndicator />
      ) : (
        <div className='body-content'>
          <div className='flex flex-row body-wrapper'>
            <div className='newstory'>
              <h3>New Project</h3>
              <form className='form-default' onSubmit={handleSubmit(onSubmit)}>
                <div className='form-element'>
                  <label htmlFor='title'>Title</label>
                  <input
                    className='input-default'
                    type='text'
                    name='title'
                    autoComplete='off'
                    ref={register({ required: true })}
                  />
                  {errors.title && <FormError type={errors.title.type} />}
                </div>
                <div className='form-element'>
                  <label htmlFor='code'>Source Code Link</label>
                  <input
                    className='input-default'
                    type='text'
                    name='code'
                    autoComplete='off'
                    ref={register({ required: true })}
                  />
                  {errors.title && <FormError type={errors.code.type} />}
                </div>
                {screenSize <= 1120 ? (
                  <Search
                    listToBeSearched={storiesData}
                    title={watch('title') || ''}
                  />
                ) : (
                  ''
                )}


                <div className='form-element'>
                  <label htmlFor='description'>Description</label>
                  <CKEditor
                    editor={ClassicEditor}
                    config={{
                      toolbar: [
                        'heading',
                        '|',
                        'bold',
                        'italic',
                        '|',
                        'link',
                        'bulletedList',
                        'numberedList'
                      ]
                    }}
                    onChange={(event, editor) => {
                      setValue('description', editor.getData())
                      setDescriptionError(false)
                    }}
                    ref={register}
                  />
                  {descriptionError && <FormError type='emptyDescription' />}
                </div>

                <div className="form-element">
                  <label>Test Report</label>
                  <input type={"file"} className={"input-default"} onChange={handleFileUpload}/>
                </div>

                <div className='flex flex-row flex-center'>
                  <Button type='submit' className='btn btn-default'>
                    Submit
                  </Button>
                </div>
              </form>
            </div>
            {screenSize > 1120 ? (
              <Search
                listToBeSearched={storiesData}
                title={watch('title') || ''}
              />
            ) : (
              ''
            )}
          </div>
        </div>
      )}
    </>
  ) : (
    <Login message='Please login to create a new story' />
  )
}

export default NewStory
