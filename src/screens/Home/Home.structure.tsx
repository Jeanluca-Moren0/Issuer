import { Card, Label, TextInput, Button, Avatar, Rating, Spinner } from 'flowbite-react'
import { ThousandPlusFormatter } from '../../utils/thousandPlusFormatter';
import { useRef } from 'react';
import { FormValidatorProps } from './Home.types';
import { useForm, Resolver } from 'react-hook-form'
import { ArrowSquareOut, Code } from 'phosphor-react';
import { useRepos } from '../../services/repos';
import { dateFormatter } from '../../utils/dateFormatter';


const resolver: Resolver<FormValidatorProps> = async (value) => {
  return {
    values: !value.githubUser ? {} : value,
    errors: !value.githubUser ? {
      githubUser: {
        type: "required",
        message: "This field is required"
      }
    } : {}

  }
}

export function Home() {
  const usernameRef = useRef<string>('')


  console.log(usernameRef.current)
  const { data: repos, error, isLoading, refetch } = useRepos(usernameRef.current, { enabled: false })


  const { register, handleSubmit, formState: { errors } } = useForm<FormValidatorProps>({ resolver });

  const submitRepos = handleSubmit((e) => {
    refetch()
  }
  )


  return (
    <main className="App">

      <aside className='flex item-center justify-center border border-gray-300 rounded-md p-8 ml-6 w-[500px] h-[250px] '>

        <form className='flex flex-col gap-4 w-full' action='/' onSubmit={submitRepos} >
          <Label>Insert github's username*: </Label>
          <TextInput type="text" {...register('githubUser')} onChange={(e) => usernameRef.current = e.target.value} />
          {errors?.githubUser && <p className='text-sm text-red-500'>{errors.githubUser.message}</p>}
          <Button color="light" type={'submit'} >

            Search for repositories

          </Button>
        </form>
      </aside>
      <section className='ml-4 p-4 w-full h-full overflow-y-scroll'>



        {repos ?
          <div className="flex flex-col gap-4 ">
            <h1 className='text-3xl text-black font-bold'> Founded {repos.length} repositories on  {repos[0].owner.login} account: </h1>

            {repos?.map(repo => (

              <Card key={repo.id} horizontal={true}>

                <div className='p-4'>
                  <div className='flex flex-row justify-between'>
                    <div className='flex gap-2 items-center'>
                      <a href={repo.html_url} target="_blank">
                        <ArrowSquareOut size={16} className='text-gray-500' />
                      </a>
                      <p className='text-xl font-bold text-black'>{repo.name}</p>
                      <p className='text-sm'>Last update: {dateFormatter(repo.updated_at)}</p>

                    </div>
                    <Rating>
                      <Rating.Star filled={true} />
                      <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                        {ThousandPlusFormatter(repo.stargazers_count.toString())} Stars on this repository
                      </p>
                    </Rating>
                  </div>


                  <p className='text-md text-gray-500'>{repo.description ? repo.description : 'This repository has no description'}</p>
                  <div className='flex w-full items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      <img src={repo.owner.avatar_url} alt={`${repo.owner.login} avatar`} className="rounded-full  w-8" />
                      <p className='text-gray-500 text-sm'>Made with <span className='text-red-600'>❤</span> by {repo.owner.login}</p>
                    </div>
                    <Button color="light">
                      <div className='p-2 flex items-center gap-2 '><Code size={16} className='text-gray-500' /> Open repository issues </div></Button>
                  </div>
                </div>

              </Card>


            ))}
          </div>
          : (

            <div className='flex h-full w-full items-center justify-center '>
              {isLoading ?
                (<div className='flex flex-row gap-4'>
                  <Spinner />
                  <p className='text-md text-gray-500'>Loading...</p>
                </div>) :
                <h1 className='text-3xl text-black font-bold'>No repository found yet, try searching a new one. 🔎</h1>
              }
            </div>

          )
        }
      </section>
    </main >
  )
}