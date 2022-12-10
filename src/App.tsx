import { Button } from './components/Button'
import { Input } from './components/Input'
import './index.css'

function App() {

  return (
    <div className="App">
      <aside className='border bg-gray-200 border-gray-700 ml-4  w-[500px] rounded-md h-[500px]  p-4 flex flex-col gap-4 '>
        <Input label='Digite o usuário do Github' />
        <Button title='Pesquisar repos' />
      </aside>
    </div>
  )
}

export default App
