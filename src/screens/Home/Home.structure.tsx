import { Card, Label, TextInput, Button, Avatar, Rating, Spinner } from 'flowbite-react'
import { useQuery } from 'react-query'
import { ThousandPlusFormatter } from '../../utils/thousandPlusFormatter';
import { useState } from 'react';
import { ReposProps, FormValidatorProps } from './Home.types';
import { useForm, Resolver } from 'react-hook-form'
import { ArrowSquareOut, Code } from 'phosphor-react';


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
  const [userName, setUserName] = useState<string>('')

  const reposFetch = async (): Promise<ReposProps[]> => {

    const response = await fetch(`https://api.github.com/users/${userName}/repos`);
    return (await response.json())

  };

  const { data, error, isLoading, refetch } = useQuery({ queryKey: ['reposFetch'], queryFn: reposFetch, enabled: false })

  console.log('error', error)
  console.log('isLoading', isLoading)


  const { register, handleSubmit, formState: { errors } } = useForm<FormValidatorProps>({ resolver });

  const submitData = handleSubmit(() => refetch())


  return (
    <main className="App">

      <aside className='flex item-center justify-center border border-gray-300 rounded-md p-8 ml-6 w-[500px] h-[250px] '>

        <form className='flex flex-col gap-4 w-full' action='/' onSubmit={submitData} >
          <Label>Insert github's username*: </Label>
          <TextInput type="text" {...register('githubUser')} onChange={(e) => setUserName(e.target.value)} />
          {errors?.githubUser && <p className='text-sm text-red-500'>{errors.githubUser.message}</p>}
          <Button color="light" type={'submit'}>

            Search for repositories

          </Button>
        </form>
      </aside>
      <section className='ml-4 p-4 w-full h-full overflow-y-scroll'>

        {data ?
          <div className="flex flex-col gap-4 ">
            <h1 className='text-3xl text-black font-bold'> Founded {data.length} repositories on  {data[0].owner.login} account: </h1>

            {data?.map(repo => (

              <Card key={repo.id} horizontal={true}>

                <div className='p-4'>
                  <div className='flex flex-row justify-between'>
                    <div className='flex gap-2 items-center'>
                      <p className='text-xl font-bold text-black'>{repo.name}</p>
                      <a href={repo.html_url} target="_blank">
                        <ArrowSquareOut size={16} className='text-gray-500' />
                      </a>
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
                      <img src={repo.owner.avatar_url} alt={`${repo.owner.login} avatar`}  className="rounded-md w-8"/>
                      <p className='text-gray-500 text-sm'>Made with ❤ by {repo.owner.login}</p>
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