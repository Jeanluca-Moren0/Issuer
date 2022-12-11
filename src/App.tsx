
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import './index.css'
import { Card, Label, TextInput, Button, Avatar, Rating, Spinner } from 'flowbite-react'
import { ThousandPlusFormatter } from './utils/thousandPlusFormatter';
import { useState } from 'react';

const queryClient = new QueryClient();

type ReposProps = {
  id: number;
  name: string;
  description?: string;
  updated_at?: string;
  stargazers_count: number;
  owner: {
    avatar_url: string;
    login: string;
    url: string;
  }
}

function Home() {
  const [userName, setUserName] = useState<string>('')

  const reposFetch = async (): Promise<ReposProps[]> => { const response = await fetch(`https://api.github.com/users/${userName && userName}/repos`); return (await response.json()) };

  const { data, error, isLoading, refetch } = useQuery({ queryKey: 'repos', queryFn: reposFetch, enabled: false })


  { isLoading && <Spinner aria-label="Default status example" /> }


  return (
    <main className="App">
      <aside className='flex item-center justify-center border border-gray-300 rounded-md p-8 ml-6 w-[500px] h-[250px] '>
        <form className='flex flex-col  gap-4 w-full' >
          <Label>Insert github's username: </Label>
          <TextInput type="text" onChange={(e) => setUserName(e.target.value)} />
          <Button color="light" onClick={() => refetch()}>
            Search for repositories
          </Button>
        </form>
      </aside>
      <section className='ml-4 p-4 w-full h-full overflow-y-scroll'>

        {data ?
          <div className="flex flex-col gap-4 ">
            <h1 className='text-3xl text-black font-bold'>Repositories founded on {data[0].owner.login} account: </h1>
            {data?.map(repo => (
              <Card key={repo.id}  >
                <div className='p-4'>
                  <div className='flex flex-row justify-between'>
                    <p className='text-xl font-bold text-black'>{repo.name}</p>
                    <Rating>
                      <Rating.Star filled={true} />
                      <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                        {ThousandPlusFormatter(repo.stargazers_count.toString())} Stars on this repository
                      </p>
                    </Rating>
                  </div>
                  <p className='text-md text-gray-500'>{repo.description ? repo.description : 'This repository has no description'}</p>
                </div>
              </Card>


            ))}
          </div>
          : (
            <div className='flex h-full w-full items-center justify-center '>
              <h1 className='text-3xl text-black font-bold'>No repository found yet, try searching a new one. 🔎</h1>
            </div>
          )
        }
      </section>
    </main >
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>

      <Home />
    </QueryClientProvider>
  )
}

export default App
