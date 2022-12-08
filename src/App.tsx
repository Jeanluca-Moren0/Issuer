import { Input } from './components/Input'
import './index.css'

function App() {

  return (
    <div className="App">
      <aside className=' bg-emerald-600 ml-4  w-[500px] rounded-md h-[500px]  p-4 flex flex-col justify-center'>
        <Input label='Digite o usuário do Github' />
      </aside>
    </div>
  )
}

export default App
